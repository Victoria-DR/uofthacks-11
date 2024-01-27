const { S3Client } = require("@aws-sdk/client-s3");
const { DynamoDBClient } = require("@aws-sdk/client-dynamodb");
const { RekognitionClient } = require("@aws-sdk/client-rekognition");

const s3Client = new S3Client({});
const dynamoDBClient = new DynamoDBClient({});
const rekognitionClient = new RekognitionClient({});

module.exports = { s3Client, dynamoDBClient, rekognitionClient };
