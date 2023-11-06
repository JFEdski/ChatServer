// Message Schema for MongoDB
const mongoose = require("mongoose");

const MessageSchema = new mongoose.Schema({
  //* columnName: DataType
  date: {
    type: String,
    required: true,
  },
  text: {
    type: String,
    required: true,
  },
  owner: {
    type: String,
    roomId: String,
    required: true,
  },
  room: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Message", MessageSchema);
