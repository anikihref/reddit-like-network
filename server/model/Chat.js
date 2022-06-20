const { Schema, model } = require('mongoose');

const ChatSchema = {
  title: {
    type: String,
  },

  members: {
    type: [Schema.Types.ObjectId],
    ref: 'User',
  },
};

module.exports = model('Chat', ChatSchema);
