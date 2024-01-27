const downloadImage = require('../utils/downloadImage');
const getEntity = require('../utils/getEntity');

const getUser = async(req, res, next) => {
  const dynamoDBResponse = await getEntity(
    {
      "userId": {
        "S": req.body.userId
      }
    },
    process.env.AWS_DYNAMODB_TABLE_USERS
  );
  const s3Response = await downloadImage(process.env.AWS_S3_BUCKET_USERS, dynamoDBResponse.Item.s3ImageKey.S);
  const userImage = await s3Response.Body.transformToString();

  const response = {
    "userId": dynamoDBResponse.Item.userId.S,
    "hasAccount": dynamoDBResponse.Item.hasAccount.BOOL,
    "email": dynamoDBResponse.Item.email.S,
    "name": dynamoDBResponse.Item.name.S,
    "image": userImage,
    "echoes": dynamoDBResponse.Item.echoes.L,
    "friends": dynamoDBResponse.Item.friends.L
  };
  res.send(response);
};

module.exports = getUser;
