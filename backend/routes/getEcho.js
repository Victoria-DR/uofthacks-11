const getEntity = require('../utils/getEntity');
const downloadImage = require('../utils/downloadImage');

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

  const response = {
    "echo": dynamoDBResponse.Item.echo.S,
    "date": dynamoDBResponse.Item.date.S,
    "location": dynamoDBResponse.Item.location.S,
    "caption": dynamoDBResponse.Item.caption.S,
    "image": s3Response.Body.transformToString(),
    "share": dynamoDBResponse.Item.share.S
  };
  res.send(response);
};

module.exports = getEcho;
