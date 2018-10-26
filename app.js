const express = require('express')
const path = require('path')
const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser')

var expressWinston = require('express-winston');
var winston = require('winston'); // for access log transports

const log = require('./config/logging')
//log.log.level = 'debug'; Set this in ../config/logging now 
log.log.info('cnsapi starting');
console.log('cnsapi starting');
log.log.debug('Debugging enabled');

const serverConfig = require('./config/local_serverConfig');

const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');

const users = require('./routes/users')
const version = require('./routes/version')

const app = express()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(cookieParser())

app.use('/cnsapi/v1/users', users)
app.use('/cnsapi/v1/version', version)

// =======================================================================

// Connection URL
const mdbConnectUrl = serverConfig.mdbUri;
// Database Name
const dbName = serverConfig.dbName;
const dbclient = new MongoClient(mdbConnectUrl, { useNewUrlParser: true });

// Use connect method to connect to the Server
dbclient.connect(function(err) {
	assert.equal(null, err);
	log.log.info(`connected to mongodb ${dbName} ok`);
	
	const db = dbclient.db(dbName);

  dbclient.close();
  log.log.info("mongodb client connection closed");
});

// ==========================================================================

module.exports = app
