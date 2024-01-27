const downloadImage = require('../utils/downloadImage');
const getEntity = require('../utils/getEntity');

const getEcho = async(req, res, next) => {
  const dynamoDBResponse = await getEntity(
    {
      "echo": {
        "S": req.body.echo
      }
    },
    process.env.AWS_DYNAMODB_TABLE_ECHOES
  );
  const s3Response = await downloadImage(process.env.AWS_S3_BUCKET_ECHOES, dynamoDBResponse.Item.s3ImageKey.S);
  const image = await s3Response.Body.transformToString();

  const response = {
    "echo": dynamoDBResponse.Item.echo.S,
    "date": dynamoDBResponse.Item.date.S,
    "location": dynamoDBResponse.Item.location.S,
    "caption": dynamoDBResponse.Item.caption.S,
    "image": image,
    "share": dynamoDBResponse.Item.share.S
  };
  res.send(response);
};

module.exports = getEcho;
