const { CreateCollectionCommand } = require('@aws-sdk/client-rekognition');
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

  res.send(s3Response.$metadata.httpStatusCode === 200 && dynamoDBResponse.$metadata.httpStatusCode === 200 && rekognitionResponse.$metadata.httpStatusCode === 200);
};

module.exports = createUser;
