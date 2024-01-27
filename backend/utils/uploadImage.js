const { PutObjectCommand } = require('@aws-sdk/client-s3');
const { s3Client } = require('../awsConfig');

const uploadImage = async(image, bucket, key) => {
  const response = await s3Client.send(
    new PutObjectCommand({
      Bucket: bucket,
      Key: key,
      Body: image
    })
  );
  
  return response;
};

module.exports = uploadImage;
