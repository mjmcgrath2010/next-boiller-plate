const Video = require('../models/Video')

exports.params = (req, res, next, id) => {
  Video.findById(id, (err, video) => {
    if (err) {
      next(err)
    } else if (video) {
      req.video = video
      req.id = id
      next()
    } else {
      next(new Error('failed to load video'))
    }
  })
}

exports.get = (req, res, next) => {
  Video.find({}, (err, videos) => {
    if (err) {
      return next(err)
    } else if (videos) {
      return res.json(videos)
    } else {
      return next(new Error('failed to load videos'))
    }
  })
}

exports.create = (req, res, next) => {
  const video = new Video(req.body)

  video
    .save()
    .then(video => {
      res.json(video)
    })
    .catch(err => next(err))
}

exports.getOne = (req, res) => {
  return res.json(req.video)
}

exports.update = (req, res, next) => {
  Video.findByIdAndUpdate(req.id, req.body, { new: true, useFindAndModify: false }, (err, video) => {
    if (err) {
      next(err)
    } else if (video) {
      res.json(video)
    } else {
      next(new Error('failed to update video'))
    }
  })
}
