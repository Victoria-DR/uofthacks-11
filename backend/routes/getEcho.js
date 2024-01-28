const bufferToBase64 = require('../utils/bufferToBase64');
const downloadImage = require('../utils/downloadImage');
const getEntity = require('../utils/getEntity');

const getEcho = async(req, res, next) => {
  const dynamoDBResponse = await getEntity(
    {
      "echoId": {
        "S": req.body.echoId
      }
    },
    process.env.AWS_DYNAMODB_TABLE_ECHOES
  );
  const s3Response = await downloadImage(process.env.AWS_S3_BUCKET_ECHOES, dynamoDBResponse.Item.s3ImageKey.S);
  const echoImage = await s3Response.Body.transformToString();

  const response = {
    "echoId": dynamoDBResponse.Item.echoId.S,
    "date": dynamoDBResponse.Item.date.S,
    "location": dynamoDBResponse.Item.location.S,
    "caption": dynamoDBResponse.Item.caption.S,
    "image": `${process.env.AWS_S3_BUCKET_ECHOES_LINK}${dynamoDBResponse.Item.s3ImageKey.S}`,
    "share": dynamoDBResponse.Item.share.S
  };
  res.send(response);
};

module.exports = getEcho;
