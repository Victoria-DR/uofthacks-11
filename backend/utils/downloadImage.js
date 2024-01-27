const { GetObjectCommand } = require('@aws-sdk/client-s3');
const { s3Client } = require('../awsConfig');

const downloadImage = async(bucket, key) => {
  const response = await s3Client.send(
    new GetObjectCommand({
      Bucket: bucket,
      Key: key
    })
  );
  
  return response;
};

module.exports = downloadImage;
