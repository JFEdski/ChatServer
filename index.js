require("dotenv").config();

const express = require("express");
const app = express();

const mongoose = require("mongoose");

app.use(express.json());
app.use(require("cors")());

const { PORT, MONGO } = process.env;
mongoose.connect(`${MONGO}/ChatServer`);

const db = mongoose.connection;

const users = require("./controllers/user.controller");
const rooms = require("./controllers/room.controller");
const messages = require("./controllers/message.controller");
const validateSession = require("./middleware/validatesession");

app.use("/user", users);
app.use(validateSession);
app.use("/room", rooms);
app.use("/message", messages);
db.once("open", () => console.log(`Connected to:${MONGO}`));

app.get("/test", (req, res) => {
  res
    .status(200)
    .json({ message: "Server is accessible", port: process.env.PORT });
  //* process.env will acess the ".env" file, and we can dot notation to get whatever specific value we want from that file
});

app.listen(PORT, () => console.log(`App is listening on port ${PORT}`));
