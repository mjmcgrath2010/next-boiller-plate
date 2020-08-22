const mongoose = require('mongoose')
const schema = mongoose.Schema
const bcrypt = require('bcrypt')
const SALT_WORK_FACTOR = 10
const jwt = require('jsonwebtoken')

const UserSchema = new schema({
  name: {
    first: {
      type: String,
      required: true,
    },
    last: {
      type: String,
      required: true,
    },
  },
  email: {
    type: String,
    unique: true,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  account: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'account',
  },
  admin: {
    type: Boolean,
    default: false,
  },
  resetPasswordToken: {
    type: String,
  },
  google_access_token: {
    type: String,
  },
  google_refresh_token: {
    type: String,
  },
  resetPasswordExpires: {
    type: Date,
  },
})

UserSchema.pre('save', next => {
  const user = this

  // only hash the password if it has been modified (or is new)
  if (!user.isModified('password')) {
    return next()
  }

  // generate a salt
  return bcrypt.genSalt(SALT_WORK_FACTOR, (err, salt) => {
    if (err) {
      return next(err)
    }

    // hash the password using our new salt
    return bcrypt.hash(user.password, salt, (error, hash) => {
      if (error) {
        return next(error)
      }

      // override the cleartext password with the hashed one
      user.password = hash
      return next()
    })
  })
})

UserSchema.methods = {
  validPassword(password) {
    return bcrypt.compareSync(password, this.password)
  },
}

module.exports = mongoose.model('user', UserSchema)
