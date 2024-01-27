const { PutObjectCommand } = require('@aws-sdk/client-s3');
const { s3Client } = require('../awsConfig');
const base64ToBuffer = require('./base64ToBuffer');

const uploadImage = async(image, bucket, key) => {
  const response = await s3Client.send(
    new PutObjectCommand({
      Bucket: bucket,
      Key: key,
      ContentEncoding: 'base64',
      ContentType: 'image/jpg',
      Body: base64ToBuffer(image)
    })
  );
  
  return response;
};

module.exports = uploadImage;
