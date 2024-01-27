const downloadImage = require('../utils/downloadImage');

const getUser = async(req, res, next) => {
  const response = await downloadImage(process.env.AWS_S3_BUCKET_USERS, req.body.key);
  res.send(response);
};

module.exports = getUser;
