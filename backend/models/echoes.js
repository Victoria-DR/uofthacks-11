const AWS = require('aws-sdk');

AWS.config.update({ region: 'your-dynamodb-region' });

const dynamodb = new AWS.DynamoDB();
const dynamodbDocClient = new AWS.DynamoDB.DocumentClient();

const params = {
  TableName: 'Echoes',
  KeySchema: [
    { AttributeName: 'location', KeyType: 'HASH' },  
    { AttributeName: 'createdAt', KeyType: 'RANGE' }  
  ],
  AttributeDefinitions: [
    { AttributeName: 'location', AttributeType: 'S' },  
    { AttributeName: 'createdAt', AttributeType: 'N' }  
  ],
  ProvisionedThroughput: {
    ReadCapacityUnits: 5, 
    WriteCapacityUnits: 5 
  },
  AttributeDefinitions: [
    { AttributeName: 'caption', AttributeType: 'S' },
    { AttributeName: 'echoImage', AttributeType: 'S' },
  ]
};

dynamodb.createTable(params, (err, data) => {
  if (err) {
    console.error('Unable to create table. Error JSON:', JSON.stringify(err, null, 2));
  } else {
    console.log('Created table. Table description JSON:', JSON.stringify(data, null, 2));
  }
});
