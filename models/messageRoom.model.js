// User Schema for MongoDB
const mongoose = require('mongoose')

const messageRoomSchema = new mongoose.Schema({
  //* columnName: DataType
  title: {
    type: String, Number,
    required: true, 
    unique: true
  },
  description: {
    type: String,
  },
  messages: {
    type: Array,
    required: true
  },
  ownerId: _id
})

module.exports = mongoose.model('messageRoom', messageRoomSchema);