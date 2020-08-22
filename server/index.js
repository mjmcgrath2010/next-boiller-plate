require('dotenv').config()

const { createServer } = require('http')
const { parse } = require('url')
const next = require('next')

const express = require('express')
const mongoose = require('mongoose')
const passport = require('passport')
const bodyParser = require('body-parser')

const dev = process.env.NODE_ENV !== 'production'
const nextApp = next({ dev })
const handle = nextApp.getRequestHandler()

const PORT = process.env.PORT || 3005


nextApp.prepare().then(() => {
	// express code here
	const app = express()
	app.use(bodyParser.json())
	app.use(bodyParser.urlencoded({ extended: true }))
	app.use(express.static('public'))

	app.use(passport.initialize())
	app.use(passport.session())
	app.get('*', (req, res) => {
		return handle(req, res) // for all the react stuff
	})

	app.listen(PORT, err => {
		if (err) {
			throw err
		}
	})
})
