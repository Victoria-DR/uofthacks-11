const express = require('express');
const cors = require('cors');
const { createUser, getUserByEmail } = require('../utils/userController');
require('dotenv').config();
const app = express();

app.post("/createuser", createUser);
app.get("/getuser", getUserByEmail);

module.exports = app;