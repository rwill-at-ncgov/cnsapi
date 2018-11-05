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