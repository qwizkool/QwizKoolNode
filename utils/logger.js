/*!
 * Copyright(c) 2013 Vibrentt
 *
 * Module : Logger
 *
 */

/**
 * Module dependencies.
 * winston is a multi-transport async logging library for node.js
 * winston uses npm log levels by default :
 *  verbose,
 *  info,
 *  warn,
 *  error.
 */
 
var winston = require('winston'),
    path = require('path'),
    config = require('../config/config');

/**
 * Logger instance created from winston
 *
 */
var logger = new (winston.Logger)({
    transports: [
      new (winston.transports.Console)({ level: config.log_level }),
      new (winston.transports.File)({ filename: config.log_file })
    ]
  });


logger.getServerLogs = function (req, res) {

    res.sendfile(path.join(__dirname + '/../server.log'));
};

logger.getAppLogs = function (req, res) {

    res.sendfile(path.join(__dirname + '/../app.log'));
};



/**
  * Exports.
  * Return the singleton instance
  * Usage:
  * logger.verbose("This is a verbose log. Log entire messages, data buffers etc at this level");
  * logger.error("This is an error log. Log failures, errors and exceptions using this level");
  */

module.exports = exports = logger;
