const { GetItemCommand } = require('@aws-sdk/client-dynamodb');
const { dynamoDBClient } = require('../awsConfig');

const getEntity = async(key, table) => {
  const response = await dynamoDBClient.send(
    new GetItemCommand({
      Key: key,
      TableName: table
    })
  );
  
  return response;
};

module.exports = getEntity;
