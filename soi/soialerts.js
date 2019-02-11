/*
  Copyright (c) 2019 NC DIT

  Rick Williams <rick.williams@nc.gov>
  
  For getting soi alert details
  
*/

var request = require('request');
var xmlparser = require('xml2json');

const serverConfig = require('../config/local_serverConfig');
const authenticationHeader = "Basic " + new Buffer(serverConfig.soiUserName + ":" + serverConfig.soiPw).toString("base64");


// Data access object functions

function SOIAlerts() {
    "use strict";
	
	this.getAlertDetail = function(soiAlertId, callback) {
		
		//console.log(`getAlertDetail called with soi alert id ${soiAlertId}`);
		//console.log(`soi id: ${serverConfig.soiUserName}`);
		const url = serverConfig.soiRestUrl + "alert/" + soiAlertId;
		var headers = {
			Authorization: authenticationHeader,
			Accept: "application/vnd.ca.soi.api.v2+xml"
		}
		
		// delay before calling to give soi a chance to update itself
		setTimeout(getSoiAlertInfo, 5000);
		
		function getSoiAlertInfo() {
			request( { url: url, headers: headers }, function(error, response, body) {
				//console.log(body);
				var soiAlertJson = xmlparser.toJson(body);
				//console.log(soiAlertJson);
				var soiAlert = JSON.parse(soiAlertJson);
				callback(soiAlert);
			});
		}
		
	}

}

module.exports.SOIAlerts = SOIAlerts;