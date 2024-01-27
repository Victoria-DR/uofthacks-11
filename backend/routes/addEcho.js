const uploadImage = require('../utils/uploadImage');
const addEntity = require('../utils/addEntity');
const updateEntity = require('../utils/updateEntity');
const { rekognitionClient } = require('../awsConfig');
const { CreateCollectionCommand, IndexFacesCommand, SearchFacesCommand } = require('@aws-sdk/client-rekognition');

const addEcho = async(req, res, next) => {
  const echo = {
    "echo": {
      "S": req.body.echo
    },
    "date": {
      "S": req.body.date
    },
    "location": {
      "S": req.body.location
    },
    "caption": {
      "S": req.body.caption
    },
    "s3ImageKey": {
      "S": req.body.imageKey
    },
    "share": {
      "S": ""
    }
  };

  const s3Response = await uploadImage(req.body.image, process.env.AWS_S3_BUCKET_ECHOES, req.body.imageKey);
  const dynamoDBResponse = await addEntity(echo, process.env.AWS_DYNAMODB_TABLE_ECHOES);

  const temporaryCollectionId = Date.now().toString();
  const rekognitionCreateCollectionResponse = await rekognitionClient.send(
    new CreateCollectionCommand({
      CollectionId: temporaryCollectionId
    })
  );
  const rekognitionIndexFacesResponse = await rekognitionClient.send(
    new IndexFacesCommand({
      CollectionId: temporaryCollectionId,
      Image: {
        S3Object: {
          Bucket: process.env.AWS_S3_BUCKET_ECHOES,
          Name: req.body.imageKey
        }
      },
      ExternalImageId: req.body.echo,
      DetectionAttributes: ["ALL"],
      QualityFilter: "AUTO"
    })
  );
  for (let i = 0; i < rekognitionIndexFacesResponse.FaceRecords.length; i++) {
    const faceRecord = rekognitionIndexFacesResponse.FaceRecords[i];
    const faceId = faceRecord.Face.FaceId;

    const rekognitionIndexFacesResponse = await rekognitionClient.send(
      new SearchFacesCommand({
        CollectionId: req.body.user,
        FaceId: faceId,
        MaxFaces: 1
      })
    );
    const match = rekognitionIndexFacesResponse.FaceMatches[0].ExternalImageId;

    const updateEntityResponse = await updateEntity(
      {
        "user": {
          "S": match
        }
      },
      process.env.AWS_DYNAMODB_TABLE_USERS,
      `SET echoes = list_append(echoes, :echo)`,
      { ':echo': req.body.imageKey }
    );
  }

  res.send("success");
};

module.exports = addEcho;
