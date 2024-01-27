const { IndexFacesCommand, SearchUsersCommand } = require('@aws-sdk/client-rekognition');
const { v4: uuidv4 } = require('uuid');
const { rekognitionClient } = require('../awsConfig');
const addEntity = require('../utils/addEntity');
const updateEntity = require('../utils/updateEntity');
const uploadImage = require('../utils/uploadImage');

const addEcho = async(req, res, next) => {
  const echoId = uuidv4();
  const imageKey = uuidv4();
  const echo = {
    "echoId": {
      "S": echoId
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
      "S": imageKey
    },
    "share": {
      "S": ""
    }
  };

  const s3Response = await uploadImage(req.body.image, process.env.AWS_S3_BUCKET_ECHOES, imageKey);
  const dynamoDBResponse = await addEntity(echo, process.env.AWS_DYNAMODB_TABLE_ECHOES);

  // const temporaryCollectionId = Date.now().toString();
  // const rekognitionCreateCollectionResponse = await rekognitionClient.send(
  //   new CreateCollectionCommand({
  //     CollectionId: temporaryCollectionId
  //   })
  // );

  const rekognitionTargetIndexFacesResponse = await rekognitionClient.send(
    new IndexFacesCommand({
      CollectionId: req.body.userId,
      Image: {
        S3Object: {
          Bucket: process.env.AWS_S3_BUCKET_ECHOES,
          Name: imageKey
        }
      },
      ExternalImageId: echoId,
      DetectionAttributes: ["ALL"],
      QualityFilter: "AUTO"
    })
  );

  // const rekognitionDetectFacesResponse = await rekognitionClient.send(
  //   new DetectFacesCommand({
  //     Image: {
  //       S3Object: {
  //         Bucket: process.env.AWS_S3_BUCKET_ECHOES,
  //         Name: imageKey
  //       }
  //     },
  //     Attributes: ["ALL"]
  //   })
  // );

  // for (let i = 0; i < rekognitionDetectFacesResponse.FaceDetails.length; i++) {
  //   const rekognitionSearchFacesByImageResponse = await rekognitionClient.send(
  //     new SearchFacesByImageCommand({
  //       CollectionId: req.body.userId,
  //       Image: {
  //         S3Object: {
  //           Bucket: process.env.AWS_S3_BUCKET_ECHOES,
  //           Name: imageKey
  //         }
  //       },
  //       MaxFaces: 1,
  //       QualityFilter: "AUTO"
  //     })
  //   );
  // }

  for (let i = 0; i < rekognitionTargetIndexFacesResponse.FaceRecords.length; i++) {
    const rekognitionSearchUsersResponse = await rekognitionClient.send(
      new SearchUsersCommand({
        CollectionId: req.body.userId,
        FaceId: rekognitionTargetIndexFacesResponse.FaceRecords[i].Face.FaceId,
        MaxUsers: 1
      })
    );

    // const rekognitionSourceIndexFacesResponse = await rekognitionClient.send(
    //   new SearchFacesCommand({
    //     CollectionId: req.body.userId,
    //     FaceId: faceId,
    //     MaxFaces: 1
    //   })
    // );
    const friendId = rekognitionSearchUsersResponse.UserMatches[0].User.UserId;

    const updateUserEntityResponse = await updateEntity(
      {
        "userId": {
          "S": req.body.userId
        }
      },
      process.env.AWS_DYNAMODB_TABLE_USERS,
      "SET echoes = list_append(echoes, :value)",
      { ':value': { "L": [ { "S": echoId } ] } }
    );
    const updateFriendEntityResponse = await updateEntity(
      {
        "userId": {
          "S": friendId
        }
      },
      process.env.AWS_DYNAMODB_TABLE_USERS,
      "SET echoes = list_append(echoes, :value)",
      { ':value': { "L": [ { "S": echoId } ] } }
    );
  }

  res.send(s3Response.$metadata.httpStatusCode === 200 && dynamoDBResponse.$metadata.httpStatusCode === 200 && rekognitionTargetIndexFacesResponse.$metadata.httpStatusCode === 200);
};

module.exports = addEcho;
