const Post = require('../models/Post')

exports.params = (req, res, next, id) => {
	Post.findById(id, (err, post) => {
		if (err) {
			next(err)
		} else if (post) {
			req.post = post
			req.id = id
			next()
		} else {
			next(new Error('failed to load post'))
		}
	})
}

exports.get = (req, res, next) => {
	Post.find({}, (err, posts) => {
		if (err) {
			return next(err)
		} else if (posts) {
			return res.json(posts)
		} else {
			return next(new Error('failed to load posts'))
		}
	})
}

exports.create = (req, res, next) => {
	const post = new Post(req.body)

	post
		.save()
		.then(post => {
			res.json(post)
		})
		.catch(err => next(err))
}

exports.getOne = (req, res) => {
	return res.json(req.post)
}

exports.update = (req, res, next) => {
	Post.findByIdAndUpdate(req.id, req.body, { new: true, useFindAndModify: false }, (err, post) => {
		if (err) {
			next(err)
		} else if (post) {
			res.json(post)
		} else {
			next(new Error('failed to update post'))
		}
	})
}
