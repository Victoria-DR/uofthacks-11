const downloadImage = require('../utils/downloadImage');

const getEcho = async(req, res, next) => {
  const response = await downloadImage(process.env.AWS_S3_BUCKET_ECHOES, req.body.key);
  res.send(response);
};

module.exports = getEcho;
