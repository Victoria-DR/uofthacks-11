const uploadImage = require('../utils/uploadImage');
const addEntity = require('../utils/addEntity');

const addEcho = async(req, res, next) => {
  const echo = {
    "echo": {
      "S": req.body.echo
    },
    "date": {
      "S": req.body.date
    },
    "location": {
      "S": req.body.location
    },
    "caption": {
      "S": req.body.caption
    },
    "s3ImageKey": {
      "S": req.body.imageKey
    },
    "share": {
      "S": ""
    }
  };

  const s3Response = await uploadImage(req.body.image, process.env.AWS_S3_BUCKET_ECHOES, req.body.imageKey);
  const dynamoDBResponse = await addEntity(echo, process.env.AWS_DYNAMODB_TABLE_ECHOES);

  res.send("success");
};

module.exports = addEcho;
