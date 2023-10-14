require('dotenv').config();

const express = require('express');
const app = express();

const mongoose = require('mongoose');

app.use(express.json());
app.use(require('cors')());

const users = require('./controllers/user.controller');
const rooms = require('./controllers/room.controller');
const validateSession = require('./middleware/validateSession');

app.use('/user', users);
app.use(validateSession);
app.use('/room', rooms);