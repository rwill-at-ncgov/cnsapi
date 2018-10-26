const express = require('express')
const path = require('path')
const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser')

const users = require('./routes/users')
const version = require('./routes/version')

const app = express()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(cookieParser())

app.use('/cnsapi/v1/users', users)
app.use('/cnsapi/v1/version', version)

module.exports = app
