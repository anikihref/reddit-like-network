const MessageSchema = require('../model/Message');
const mongoose = require('mongoose');

class MessageController {
  async getMessages(req, res) {
    const id = req.params.id
    try {
      const messages = await MessageSchema.find({chat: mongoose.Types.ObjectId(id)})
      
      const lastMessages = messages.filter((message, index) => {
        return index > messages.length - 50
      })

      res.json(lastMessages)
    } catch (error) {
      console.log(error.message)
    }
  }
  
}

module.exports = new MessageController();
