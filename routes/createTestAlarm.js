const express = require('express')
const router = express.Router()
//const log = require('./config/logging')
var ObjectID = require('mongodb').ObjectID

/* create a test alarm in mongo */
router.get('/', function(req, res, next) {
	
	const db = req.app.locals.db;
	
	const testAlarm = {
		"deviceName": "ncc484",
		"ipAddress": "10.4.200.77",
		"alarmSummary": "simulated test alarm not from network",
		"soiAction": "",
		"soiPolicy": "",
		"origin": "local",
		"cmdbData": {},
		"emoncnsRecvDt": "",
		"occurredDt": "",
		"alarmType": "test"
	};
	
	db.collection('emonCnsAlarms').insertOne( testAlarm ).then(function(r) {
		res.json({status: "OK",
			insertedId: r.insertedId.toString()
		});
	}).catch(function(err) {
			log.log.error("mdb insert error: " + err.stack);
			res.status(500);
			res.render('error', {
				message: err.message,
				error: err.stack
			});
	});
})

module.exports = router
