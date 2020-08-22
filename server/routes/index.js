const express = require('express')
const router = express.Router()

const AccountRoutes = require('./AccountRoutes')
const UserRoutes = require('./UserRoutes')
const PostRoutes = require('./PostRoutes')
const VideoRoutes = require('./VideoRoutes')

router.use('/user', UserRoutes)
router.use('/account', AccountRoutes)
router.use('/post', PostRoutes)
router.use('/video', VideoRoutes)

module.exports = router
