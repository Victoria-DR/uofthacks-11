const AWS = require('aws-sdk');

AWS.config.update({ region: 'your-dynamodb-region' });

const dynamodb = new AWS.DynamoDB();
const dynamodbDocClient = new AWS.DynamoDB.DocumentClient();

const params = {
    TableName: 'Users',
    KeySchema: [
        { AttributeName: 'email', KeyType: 'HASH' }  
    ],
    AttributeDefinitions: [
        { AttributeName: 'email', AttributeType: 'S' },
        { AttributeName: 'fullname', AttributeType: 'S' },
        { AttributeName: 'profilepic', AttributeType: 'S' },
        
        { AttributeName: 'echoes', AttributeType: 'L', ItemType: 'M' }
    ],
    ProvisionedThroughput: {
        ReadCapacityUnits: 5,
        WriteCapacityUnits: 5
    }
};

dynamodb.createTable(params, (err, data) => {
  if (err) {
    console.error('Unable to create table. Error JSON:', JSON.stringify(err, null, 2));
  } else {
    console.log('Created table. Table description JSON:', JSON.stringify(data, null, 2));
  }
});