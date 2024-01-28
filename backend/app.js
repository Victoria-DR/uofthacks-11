const express = require('express');
const cors = require('cors');
require('dotenv').config();

const createUser = require('./routes/createUser');

const addEcho = require('./routes/addEcho');
const addFriend = require('./routes/addFriend');

const getUserEchoes = require('./routes/getUserEchoes');
const getEcho = require('./routes/getEcho');

const getUser = require('./routes/getUser');
const getUserId = require('./routes/getUserId');

const shareEcho = require('./routes/shareEcho');

const app = express();
app.use(express.json({ limit: '10mb' }));
app.use(cors());

app.post('/create-user', createUser);

app.post('/add-echo', addEcho);
app.post('/add-friend', addFriend);

app.post('/get-user-echoes', getUserEchoes);
app.post('/get-echo', getEcho);

app.post('/get-user', getUser);
app.post('/get-user-id', getUserId);

app.post('/share-echo', shareEcho);

app.listen(3001, () => {
  console.log('Server running on port 3001');
});

module.exports = app;
