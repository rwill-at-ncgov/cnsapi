const express = require('express')
const router = express.Router()
const log = require('../config/logging');
var ObjectID = require('mongodb').ObjectID

var Alarms = require('../db/alarms').AlarmsDAO;
var SOIAlerts = require('../soi/soialerts').SOIAlerts;


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
	var soialerts = new SOIAlerts();
	
	log.log.debug("saw request addAlarm");
	
	newAlarm2Add = req.body;
	
	newAlarmObject = newAlarm2Add;
	
	// if this alarm is from soi, we need to call soi rest to get alert details
	if ( newAlarmObject.source == "SOI SAM WV1TCAUAP03" &&  newAlarmObject.alarmAction == "ACTIVE" ) {
		log.log.debug(`received new active soi alarm id ${newAlarmObject.alarmId}`);
		
		soialerts.getAlertDetail(newAlarmObject.alarmId, function(alertDetail) {
			log.log.debug(`soi alert detail: ${JSON.stringify(alertDetail)}`);
			newAlarmObject.eventMsg = alertDetail.alertDefinition.userAttributes.userAttribute10
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
	} else {
		// other than a new active soi alert - so just add it
		//Call db to add a new site
		alarms.addAlarm(newAlarmObject, function(doc) {
			log.log.debug(`Alarm added: ${JSON.stringify(doc)}`);
			res.json({
				status: "OK",
				addResp: doc
				}
			);
		});
	}
	
});

module.exports = router
