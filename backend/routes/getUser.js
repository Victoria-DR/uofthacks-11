const getEntity = require('../utils/getEntity');
const downloadImage = require('../utils/downloadImage');

const getUser = async(req, res, next) => {
  const dynamoDBResponse = await getEntity(
    {
      "user": {
        "S": req.body.user
      }
    },
    process.env.AWS_DYNAMODB_TABLE_USERS
  );
  const s3Response = await downloadImage(process.env.AWS_S3_BUCKET_USERS, dynamoDBResponse.Item.s3ImageKey.S);

  const response = {
    "user": dynamoDBResponse.Item.user.S,
    "name": dynamoDBResponse.Item.name.S,
    "image": s3Response.Body.transformToString(),
    "echoes": dynamoDBResponse.Item.echoes.L,
    "friends": dynamoDBResponse.Item.friends.L
  };
  res.send(response);
};

module.exports = getUser;
