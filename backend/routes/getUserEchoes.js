const bufferToBase64 = require('../utils/bufferToBase64');
const downloadImage = require('../utils/downloadImage');
const getEntity = require('../utils/getEntity');

const getUserEchoes = async(req, res, next) => {
  const dynamoDBResponse = await getEntity(
    {
      "userId": {
        "S": req.body.userId
      }
    },
    process.env.AWS_DYNAMODB_TABLE_USERS
  );
  const echoes = dynamoDBResponse.Item.echoes.L;

  const response = [];
  for (let i = 0; i < echoes.length; i++) {
    const echo = await echoHelper(echoes[i].S);
    response.push(echo);
  }
  res.send(response);
};

const echoHelper = async(echoId) => {
  const dynamoDBResponse = await getEntity(
    {
      "echoId": {
        "S": echoId
      }
    },
    process.env.AWS_DYNAMODB_TABLE_ECHOES
  );
  const s3Response = await downloadImage(process.env.AWS_S3_BUCKET_ECHOES, dynamoDBResponse.Item.s3ImageKey.S);
  const echoImage = await s3Response.Body.transformToString();

  return {
    "echoId": dynamoDBResponse.Item.echo.S,
    "date": dynamoDBResponse.Item.date.S,
    "location": dynamoDBResponse.Item.location.S,
    "caption": dynamoDBResponse.Item.caption.S,
    "image": bufferToBase64(echoImage),
    "share": dynamoDBResponse.Item.share.S
  };
};

module.exports = getUserEchoes;
