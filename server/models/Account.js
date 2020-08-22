const mongoose = require('mongoose')
const schema = mongoose.Schema

const AccountSchema = new schema({
  name: {
    type: String,
    required: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
  },
})

AccountSchema.methods = {}

module.exports = mongoose.model('account', AccountSchema)
