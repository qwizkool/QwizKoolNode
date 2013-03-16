/*!
 * Copyright(c) 2013 Vibrentt
 *
 * Module : Logger
 *
 */

/**
 * Module dependencies.
 */
var winston = require('winston'),
    config = require('../config/config');

/**
 * Qwizbook Rating model constructor.
 *
 * @api public
 * @return {Function} Constructor for Rating type.
 */
var logger = new (winston.Logger)({
    transports: [
      new (winston.transports.Console)({ level: config.log_level }),
      new (winston.transports.File)({ filename: config.log_file })
    ]
  });



/**
  * Exports.
  * Return the singleton instance
  */

module.exports = exports = logger;
