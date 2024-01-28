const { ScanCommand } = require("@aws-sdk/client-dynamodb");
const { dynamoDBClient } = require('../awsConfig');

const getUserId = async(req, res, next) => {
  const response = await dynamoDBClient.send(
    new ScanCommand({
      TableName: process.env.AWS_DYNAMODB_TABLE_USERS,
      KeyConditionExpression: "begins_with(userId, :temp)",
      FilterExpression: "email = :email",
      ExpressionAttributeValues: {
        ":email": {
          "S": req.body.email
        }
      },
      ProjectionExpression: "userId"
    })
  );
  res.send({
    "userId": response.Items[0].userId.S
  });
};

module.exports = getUserId;
