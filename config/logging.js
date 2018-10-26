/*
	Configure logging for app
*/

//const applog = require('winston');
// for v3
const { createLogger, format, transports } = require('winston');
const tsFormat = () => (new Date()).toString();
const logform = require('logform');
const { combine, timestamp, label, printf } = logform.format;

/*
const logger = new (applog.Logger)({
  transports: [
	
    new (applog.transports.Console)({ 
		timestamp: tsFormat,
		colorize: true,
	}),

	new (applog.transports.File)({
      filename: `cnsapi.log`,
      timestamp: tsFormat,
	  colorize: true,
    })
  ],
  level: "debug"
});
*/

// for v3
const logger = createLogger({
	format: format.combine(
		//timestamp(),
		label({ label: '[cnsapi]' }),
        timestamp({
            format: 'YYYY-MM-DD HH:mm:ss'
		}),
		printf(nfo => {
			return `[${nfo.label}] ${nfo.level}: ${nfo.message}`;
		}),
		format.json()
	),
	transports: [
	/*
	new transports.Console({
		timestamp: tsFormat,
		colorize: true
	}),
	*/
	new (transports.File)({
      filename: `cnsapi.log`,
      //timestamp: tsFormat,
	  //colorize: true,
    })
  ],
  level: "debug"
});

module.exports.log = logger
