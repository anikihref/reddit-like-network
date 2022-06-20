const { Schema, model } = require('mongoose');

const MessageSchema = {
  content: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: new Date()
  },
  author: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
  chat: {
    type: Schema.Types.ObjectId,
    ref: 'Chat'
  }
};

module.exports = model('Message', MessageSchema);
