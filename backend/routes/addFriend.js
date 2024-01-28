const { AssociateFacesCommand, CreateUserCommand, IndexFacesCommand } = require('@aws-sdk/client-rekognition');
const { v4: uuidv4 } = require('uuid');
const { rekognitionClient } = require('../awsConfig');
const addEntity = require('../utils/addEntity');
const updateEntity = require('../utils/updateEntity');
const uploadImage = require('../utils/uploadImage');

const addFriend = async(req, res, next) => {
  const friendId = uuidv4();
  const friendImageKey = uuidv4();
  const friend = {
    "userId": {
      "S": friendId
    },
    "hasAccount": {
      "BOOL": false
    },
    "email": {
      "S": ""
    },
    "name": {
      "S": req.body.friendName
    },
    "s3ImageKey": {
      "S": friendImageKey
    },
    "echoes": {
      "L": []
    },
    "friends": {
      "L": []
    }
  };

  const s3ResponseAddFriend = await uploadImage(req.body.friendImage, process.env.AWS_S3_BUCKET_USERS, friendImageKey);
  const dynamoDBResponseAddFriend = await addEntity(friend, process.env.AWS_DYNAMODB_TABLE_USERS);

  const dynamoDBResponseUpdateUser = await updateEntity(
    {
      "userId": {
        "S": req.body.userId
      }
    },
    process.env.AWS_DYNAMODB_TABLE_USERS,
    "SET friends = list_append(friends, :value)",
    { ":value": { "L": [ { "S": friendId } ] } }
  );

  const rekognitionCreateUserResponse = await rekognitionClient.send(
    new CreateUserCommand({
      CollectionId: req.body.userId,
      UserId: friendId
    })
  );

  const rekognitionIndexFacesResponse = await rekognitionClient.send(
    new IndexFacesCommand({
      CollectionId: req.body.userId,
      Image: {
        S3Object: {
          Bucket: process.env.AWS_S3_BUCKET_USERS,
          Name: friendImageKey
        }
      },
      ExternalImageId: req.body.friendId,
      DetectionAttributes: ["ALL"],
      MaxFaces: 1,
      QualityFilter: "AUTO"
    })
  );

  const rekognitionAssociateFacesResponse = await rekognitionClient.send(
    new AssociateFacesCommand({
      CollectionId: req.body.userId,
      UserId: friendId,
      FaceIds: [ rekognitionIndexFacesResponse.FaceRecords[0].Face.FaceId ]
    })
  );

  res.send(s3ResponseAddFriend.$metadata.httpStatusCode === 200 && dynamoDBResponseAddFriend.$metadata.httpStatusCode === 200 && dynamoDBResponseUpdateUser.$metadata.httpStatusCode === 200 && rekognitionCreateUserResponse.$metadata.httpStatusCode === 200 && rekognitionIndexFacesResponse.$metadata.httpStatusCode === 200 && rekognitionAssociateFacesResponse.$metadata.httpStatusCode === 200);
};

module.exports = addFriend;
