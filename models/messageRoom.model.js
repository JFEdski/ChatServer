// User Schema for MongoDB
const mongoose = require("mongoose");

const messageRoomSchema = new mongoose.Schema({
  //* columnName: DataType
  title: {
    type: String,
    Number,
    required: true,
    unique: true,
  },
  description: {
    type: String,
    Number,
  },
  messages: {
    type: Array,
    required: false,
  },
  ownerId: {
    type: String,
    Number,
    required: true,
  },
});

module.exports = mongoose.model("messageRoom", messageRoomSchema);
