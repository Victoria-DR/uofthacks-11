const express = require('express');
const cors = require('cors');
require('dotenv').config();

const addEcho = require('./routes/addEcho');
const addFriend = require('./routes/addFriend');
const getAllEchoes = require('./routes/getAllEchoes');
const getFriendEchoes = require('./routes/getFriendEchoes');
const getEcho = require('./routes/getEcho');
const shareEcho = require('./routes/shareEcho');

const app = express();
app.use(express.json());
app.use(cors());

app.post('/add-echo', addEcho);
app.post('/add-friend', addFriend);
app.post('/get-all-echoes', getAllEchoes);
app.post('/get-friend-echoes', getFriendEchoes);
app.post('/get-echo', getEcho);
app.post('/share-echo', shareEcho);

app.listen(3001, () => {
  console.log('Server running on port 3001');
});

module.exports = app;
