const { UpdateItemCommand } = require('@aws-sdk/client-dynamodb');
const { dynamoDBClient } = require('../awsConfig');

const updateEntity = async(key, table, updateExpression, expressionAttributeValues) => {
  const response = await dynamoDBClient.send(
    new UpdateItemCommand({
      Key: key,
      TableName: table,
      UpdateExpression: updateExpression,
      ExpressionAttributeValues: expressionAttributeValues
    })
  );
  
  return response;
};

module.exports = updateEntity;
