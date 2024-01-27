const { PutItemCommand } = require('@aws-sdk/client-dynamodb');
const { dynamoDBClient } = require('../awsConfig');

const addEntity = async(item, table) => {
  const response = await dynamoDBClient.send(
    new PutItemCommand({
      Item: item,
      TableName: table
    })
  );
  
  return response;
};

module.exports = addEntity;
