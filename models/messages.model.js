// Message Schema for MongoDB
const mongoose = require('mongoose')

const MessageSchema = new mongoose.Schema({
  //* columnName: DataType
  date: {
    type: String, 
    required: true, 
  },
  text: {
    type: String,
    required: true 
  },
  ownerId: _id,
  roomId: room
})

module.exports = mongoose.model('Message', MessageSchema);
