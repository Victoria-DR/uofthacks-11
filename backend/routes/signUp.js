const uploadImage = require('../utils/uploadImage');
const addEntity = require('../utils/addEntity');

const signUp = async(req, res, next) => {
  const user = {
    "user": {
      "S": req.body.email
    },
    "name": {
      "S": req.body.name
    },
    "s3ImageKey": {
      "S": req.body.imageKey
    },
    "echoes": {
      "L": []
    },
    "friends": {
      "L": []
    }
  };

  const s3Response = await uploadImage(req.body.image, process.env.AWS_S3_BUCKET_USERS, req.body.imageKey);
  const dynamoDBResponse = await addEntity(user, process.env.AWS_DYNAMODB_TABLE_USERS);

  res.send("success");
};

module.exports = signUp;
