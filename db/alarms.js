/*
  Copyright (c) 2018 NC DIT

  Rick Williams <rick.williams@nc.gov>
  
  For mongodb collection emonCnsAlarms
  
*/

var MongoClient = require('mongodb').MongoClient,
	ObjectID = require('mongodb').ObjectID,
    assert = require('assert');

// Data access object functions

function AlarmsDAO(database) {
    "use strict";

    this.db = database;
	
	this.addAlarm = function(alarmInsertObject, callback) {
		// add a new alarm
		var mColl = this.db.collection('emonCnsAlarms');
		
		// add some fields we always want
		var rightNow = new Date();
		// see if this changes time to current localtime
		//console.log("rightNow getHours =", rightNow.getHours());
		//console.log("rightNow getUTCHours =", rightNow.getUTCHours());
		//console.log("rightNow timezone offset =", rightNow.getTimezoneOffset());
		alarmInsertObject.emonAlarmCreated = rightNow;
		alarmInsertObject.emonAlarmCreatedETStr = rightNow.toLocaleString();
		
		
		mColl.insertOne( alarmInsertObject, { forceServerObjectId: true } ).then(function(r) {
			//console.log("inserted: ", r);
			callback( r.ops );
		}).catch(function(err) {
			console.log(err.stack);
			callback(null)
		});
	}

}

module.exports.AlarmsDAO = AlarmsDAO;