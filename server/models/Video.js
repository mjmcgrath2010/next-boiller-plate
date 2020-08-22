const mongoose = require('mongoose')
const schema = mongoose.Schema

const VideoSchema = new schema({
	title: {
		type: String,
		required: true,
	},
	user: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'user',
	},
})

VideoSchema.methods = {}

module.exports = mongoose.model('video', VideoSchema)
