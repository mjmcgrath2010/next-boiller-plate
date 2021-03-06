const next = require('next')

const express = require('express')
const mongoose = require('mongoose')
const passport = require('passport')
const bodyParser = require('body-parser')

const APIRoutes = require('./routes/index')

const dev = process.env.NODE_ENV !== 'production'
const nextApp = next({ dev })
const handle = nextApp.getRequestHandler()

const PORT = process.env.PORT || 3005

const db = mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log(process.env.MONGODB_URI)
    console.log('connected')
  })
  .catch(e => {
    try {
      db.connect(process.env.MONGODB_URI, {
        useNewUrlParser: true,
        useFindAndModify: false,
        useUnifiedTopology: true,
      })
    } catch (e) {
      console.error('DB IS DOWN')
    }
  })

nextApp.prepare().then(() => {
  // express code here
  const app = express()

  // middleware
  app.use(bodyParser.json())
  app.use(bodyParser.urlencoded({ extended: true }))
  app.use(express.static('public'))
  app.use(passport.initialize())
  app.use(passport.session())

  app.use('/api', APIRoutes)
  app.get('*', (req, res) => {
    return handle(req, res) // for all the react stuff
  })

  app.listen(PORT, err => {
    if (err) {
      throw err
    }
  })
})
