const express = require('express');
const cors = require('cors');
require('dotenv').config();

const signUp = require('./routes/signUp');

const addEcho = require('./routes/addEcho');
const addFriend = require('./routes/addFriend');

const getAllEchoes = require('./routes/getAllEchoes');
const getFriendEchoes = require('./routes/getFriendEchoes');
const getEcho = require('./routes/getEcho');

const getUserImage = require('./routes/getUserImage');

const shareEcho = require('./routes/shareEcho');

const app = express();
app.use(express.json({ limit: '1mb' }));
app.use(cors());

app.use("/v1/api", require("./routes/userRouter"));

app.post('/sign-up', signUp);

app.post('/add-echo', addEcho);
app.post('/add-friend', addFriend);

app.post('/get-all-echoes', getAllEchoes);
app.post('/get-friend-echoes', getFriendEchoes);
app.post('/get-echo', getEcho);

app.post('/get-user-image', getUserImage);

app.post('/share-echo', shareEcho);

app.listen(3001, () => {
  console.log('Server running on port 3001');
});

module.exports = app;
