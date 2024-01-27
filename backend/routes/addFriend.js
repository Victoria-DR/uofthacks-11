const uploadImage = require('../utils/uploadImage');

const addFriend = async(req, res, next) => {
  const response = await uploadImage(req.body.image, process.env.AWS_S3_BUCKET_USERS, req.body.key);
  res.send(response);
};

module.exports = addFriend;
