const { UpdateItemCommand } = require('@aws-sdk/client-dynamodb');
const { dynamoDBClient } = require('../awsConfig');

const updateEntity = async(key, table, updateExpression) => {
  const response = await dynamoDBClient.send(
    new UpdateItemCommand({
      Key: key,
      TableName: table,
      UpdateExpression: updateExpression
    })
  );
  
  return response;
};

module.exports = updateEntity;
