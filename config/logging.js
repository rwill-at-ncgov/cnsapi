/*
	Configure logging for app
*/

//const applog = require('winston');
// for v3
const { createLogger, format, transports } = require('winston');
const logform = require('logform');
const { combine, timestamp, label, printf } = logform.format;

// for v3
const logger = createLogger({
	format: format.combine(
		//timestamp(),
		label({ label: '[cnsapi]' }),
        timestamp({
            format: 'YYYY-MM-DD HH:mm:ss'
		}),
		printf(nfo => {
			return `${nfo.label} ${nfo.timestamp} - ${nfo.level}: ${nfo.message}`;
		}),
		format.colorize()
		//format.json()
	),
	transports: [
	/*
	new transports.Console({
		timestamp: tsFormat,
		colorize: true
	}),
	*/
	new (transports.File)({
      filename: `cnsapi.log`
    })
  ],
  level: "debug"
});

module.exports.log = logger
