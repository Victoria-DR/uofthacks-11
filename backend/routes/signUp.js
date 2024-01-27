const uploadImage = require('../utils/uploadImage');
const addEntity = require('../utils/addEntity');

const signUp = async(req, res, next) => {
  const user = {
    email: req.body.email,
    name: req.body.name,
    s3ImageKey: req.body.imageKey,
    echoes: [],
    friends: []
  };

  const s3Response = await uploadImage(req.body.image, process.env.AWS_S3_BUCKET_USERS, req.body.imageKey);
  const dynamoDBResponse = await addEntity(user, process.env.AWS_DYNAMODB_TABLE_USERS);

  res.send(s3Response.statusCode === 200 && dynamoDBResponse.statusCode === 200);
};

module.exports = signUp;
