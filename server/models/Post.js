const mongoose = require('mongoose')
const schema = mongoose.Schema

const PostSchema = new schema({
  title: {
    type: String,
    required: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
  },
})

PostSchema.methods = {}

module.exports = mongoose.model('post', PostSchema)
