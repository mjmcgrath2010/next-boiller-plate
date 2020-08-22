const Account = require('../models/Account')

exports.params = (req, res, next, id) => {
  Account.findById(id, (err, account) => {
    if (err) {
      next(err)
    } else if (account) {
      req.account = account
      req.id = id
      next()
    } else {
      next(new Error('failed to load Account'))
    }
  })
}

exports.get = (req, res, next) => {
  Account.find({}, (err, accounts) => {
    if (err) {
      return next(err)
    } else if (accounts) {
      return res.json(accounts)
    } else {
      return next(new Error('failed to load Accounts'))
    }
  })
}

exports.create = (req, res, next) => {
  const account = new Account(req.body)

  account
    .save()
    .then(update => {
      res.json(update)
    })
    .catch(err => next(err))
}

exports.getOne = (req, res) => {
  return res.json(req.account)
}

exports.update = (req, res, next) => {
  Account.findByIdAndUpdate(req.id, req.body, { new: true, useFindAndModify: false }, (err, account) => {
    if (err) {
      next(err)
    } else if (account) {
      res.json(account)
    } else {
      next(new Error('failed to update Account'))
    }
  })
}
