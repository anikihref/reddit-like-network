const mongoose = require('mongoose')

const PostSchema = new mongoose.Schema({ 
  title: {
    type: String,
    required: true
  },
  content: String,
  likes: {
    type: Number,
    default: 0
  },
  createdAt: {
    type: Date,
    default: () => Date.now(),
    immutable: true 
  },
  updatedAt: {
    type: Date,
    default: () => Date.now()
  },
  author: {
    type: String,
    required: true
  },
  likedBy: {
    type: [mongoose.SchemaTypes.ObjectId],
    ref: 'User'
  },
  img: String,
  importance: Number
})

PostSchema.pre('save', function(next) {
  this.updatedAt = Date.now()

  next()
})

module.exports = mongoose.model('Posts', PostSchema)