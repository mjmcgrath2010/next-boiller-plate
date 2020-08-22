const User = require('../models/User')

exports.params = (req, res, next, id) => {
  User.findById(id, (err, user) => {
    if (err) {
      next(err)
    } else if (user) {
      req.user = user
      req.id = id
      next()
    } else {
      next(new Error('failed to load user'))
    }
  })
}

exports.get = (req, res, next) => {
  User.find({}, (err, users) => {
    if (err) {
      return next(err)
    } else if (users) {
      return res.json(users)
    } else {
      return next(new Error('failed to load users'))
    }
  })
}

exports.create = (req, res, next) => {
  const user = new User(req.body)

  user
    .save()
    .then(user => {
      res.json(user)
    })
    .catch(err => next(err))
}

exports.getOne = (req, res) => {
  return res.json(req.user)
}

exports.update = (req, res, next) => {
  User.findByIdAndUpdate(req.id, req.body, { new: true, useFindAndModify: false }, (err, user) => {
    if (err) {
      next(err)
    } else if (user) {
      res.json(user)
    } else {
      next(new Error('failed to update user'))
    }
  })
}
