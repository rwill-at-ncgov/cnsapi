/*
	Configure logging for app
*/

const applog = require('winston');
const tsFormat = () => (new Date()).toString();
const logger = new (applog.Logger)({
  transports: [
	/*
    new (applog.transports.Console)({ 
		timestamp: tsFormat,
		colorize: true,
	}),
	*/
	new (applog.transports.File)({
      filename: `cnsapi.log`,
      timestamp: tsFormat,
	  colorize: true,
    })
  ],
  level: "debug"
});

module.exports.log = logger
