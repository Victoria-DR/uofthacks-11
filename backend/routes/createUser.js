const { AssociateFacesCommand, CreateCollectionCommand, CreateUserCommand, IndexFacesCommand } = require('@aws-sdk/client-rekognition');
const { v4: uuidv4 } = require('uuid');
const { rekognitionClient } = require('../awsConfig');
const addEntity = require('../utils/addEntity');
const uploadImage = require('../utils/uploadImage');

const createUser = async(req, res, next) => {
  const userId = uuidv4();
  const imageKey = uuidv4();
  const user = {
    "userId": {
      "S": userId
    },
    "hasAccount": {
      "BOOL": true
    },
    "email": {
      "S": req.body.email
    },
    "name": {
      "S": req.body.name
    },
    "s3ImageKey": {
      "S": imageKey
    },
    "echoes": {
      "L": []
    },
    "friends": {
      "L": []
    }
  };

  const s3Response = await uploadImage(req.body.image, process.env.AWS_S3_BUCKET_USERS, imageKey);
  const dynamoDBResponse = await addEntity(user, process.env.AWS_DYNAMODB_TABLE_USERS);
  const rekognitionResponse = await rekognitionClient.send(
    new CreateCollectionCommand({
      CollectionId: userId
    })
  );

  const rekognitionCreateUserResponse = await rekognitionClient.send(
    new CreateUserCommand({
      CollectionId: userId,
      UserId: userId
    })
  );

  const rekognitionIndexFacesResponse = await rekognitionClient.send(
    new IndexFacesCommand({
      CollectionId: userId,
      Image: {
        S3Object: {
          Bucket: process.env.AWS_S3_BUCKET_USERS,
          Name: imageKey
        }
      },
      ExternalImageId: userId,
      DetectionAttributes: ["ALL"],
      MaxFaces: 1,
      QualityFilter: "AUTO"
    })
  );

  const rekognitionAssociateFacesResponse = await rekognitionClient.send(
    new AssociateFacesCommand({
      CollectionId: userId,
      UserId: userId,
      FaceIds: [ rekognitionIndexFacesResponse.FaceRecords[0].Face.FaceId ]
    })
  );

  res.send(userId);
};

module.exports = createUser;
