const express = require('express')
const router = express.Router()
const log = require('../config/logging');
var ObjectID = require('mongodb').ObjectID

var Alarms = require('../db/alarms').AlarmsDAO;


/* create an alarm in mongo */
router.get('/', function(req, res, next) {
	
	const db = req.app.locals.db;
	var alarms = new Alarms(db);
	
	log.log.debug("saw request addAlarm");
	
	const testAlarm = {
		"deviceName": "ncc484",
		"ipAddress": "10.4.200.77",
		"alarmSummary": "simulated test alarm not from network",
		"soiAction": "",
		"soiPolicy": "",
		"origin": "cnsapi/v1/addalarm",
		"cmdbData": {},
		"emoncnsRecvDt": "",
		"occurredDt": "",
		"alarmType": "addAlarmTest"
	};
	
	newAlarmObject = testAlarm;
	
	//Call db to add a new site
	alarms.addAlarm(newAlarmObject, function(doc) {
		log.log.debug(`Alarm added: ${JSON.stringify(doc)}`);
		res.json({
			status: "OK",
			addResp: doc
			}
		);
	});
	
});

/* handle post to create an alarm in mongo */
router.post('/', function(req, res, next) {
	
	const db = req.app.locals.db;
	var alarms = new Alarms(db);
	
	log.log.debug("saw request addAlarm");
	
	newAlarm2Add = req.body;
	
	newAlarmObject = newAlarm2Add;
	
	//Call db to add a new site
	alarms.addAlarm(newAlarmObject, function(doc) {
		log.log.debug(`Alarm added: ${JSON.stringify(doc)}`);
		res.json({
			status: "OK",
			addResp: doc
			}
		);
	});
	
});

module.exports = router
