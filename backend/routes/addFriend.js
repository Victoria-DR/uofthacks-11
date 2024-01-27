const { rekognitionClient } = require('../awsConfig');
const updateEntity = require('../utils/updateEntity');
const getEntity = require('../utils/getEntity');
const downloadImage = require('../utils/downloadImage');
const { IndexFacesCommand } = require('@aws-sdk/client-rekognition');

const addFriend = async(req, res, next) => {
  const response = await updateEntity(
    {
      "user": {
        "S": req.body.user
      }
    },
    process.env.AWS_DYNAMODB_TABLE_USERS,
    `SET friends = list_append(friends, :friend)`,
    { ':friend': req.body.friend }
  );

  const dynamoDBResponse = await getEntity(
    {
      "user": {
        "S": req.body.friend
      }
    },
    process.env.AWS_DYNAMODB_TABLE_USERS
  );

  const rekognitionResponse = await rekognitionClient.send(
    new IndexFacesCommand({
      CollectionId: req.body.user,
      Image: {
        S3Object: {
          Bucket: process.env.AWS_S3_BUCKET_USERS,
          Name: dynamoDBResponse.Item.s3ImageKey.S
        }
      },
      ExternalImageId: req.body.friend,
      DetectionAttributes: ["ALL"],
      MaxFaces: 1,
      QualityFilter: "AUTO"
    })
  );

  res.send(response);
};

module.exports = addFriend;
