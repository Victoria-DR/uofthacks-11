const express = require('express');
const cors = require('cors');
require('dotenv').config();

const addMemory = require('./routes/addMemory');
const addFriend = require('./routes/addFriend');
const getAllMemories = require('./routes/getAllMemories');
const getFriendMemories = require('./routes/getFriendMemories');
const getMemory = require('./routes/getMemory');
const shareMemory = require('./routes/shareMemory');

const app = express();
app.use(express.json());
app.use(cors());

app.post('/add-memory', addMemory);
app.post('/add-friend', addFriend);
app.post('/get-all-memories', getAllMemories);
app.post('/get-friend-memories', getFriendMemories);
app.post('/get-memory', getMemory);
app.post('/share-memory', shareMemory);

app.listen(3001, () => {
  console.log('Server running on port 3001');
});

module.exports = app;
