const downloadImage = require('../utils/downloadImage');

const getUserImage = async(req, res, next) => {
  const response = await downloadImage(process.env.AWS_S3_BUCKET_, req.body.key);
  res.send(response);
};

module.exports = getUserImage;
