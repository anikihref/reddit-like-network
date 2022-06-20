const ChatSchema = require('../model/Chat');
const mongoose = require('mongoose');

class ChatController {

  async createChat(req, res) {
    const chat = await ChatSchema.create({
      members: req.body.members,
      title: ''
    });

    

    res.status(200).json(chat);
  }

  async getChatsWithMember(req, res) {
    const chats = await ChatSchema.find({
      members: { $in: mongoose.Types.ObjectId(req.params.id) },
    });

    if (!chats) {
      return res.json([]);
    }

    return res.status(200).json(chats);
  }


  async getChat(req, res) {
    const chat = await ChatSchema.findById(req.params.id)

    return res.status(200).json(chat)
  }
}

module.exports = new ChatController();
