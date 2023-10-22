require('dotenv').config();

const express = require('express');
const app = express();

const mongoose = require('mongoose');

app.use(express.json());
app.use(require('cors')());

const users = require('./controllers/user.controller');
const rooms = require('./controllers/room.controller');
const messages = require('./controllers/message.controller')
const validateSession = require('./middleware/validatesession');

app.use('/user', users);
app.use(validateSession);
app.use('/room', rooms);
app.use('/message', messages)

app.listen(PORT, () => console.log(`App is listening on port ${PORT}`));