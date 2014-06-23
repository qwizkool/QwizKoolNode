/*!
 * Copyright(c) 2013 Vibrentt 
 *
 * Module : db_connection 
 *
 */

/**
 * Module dependencies.
 */
var mongoose = require('mongoose')
  , config = require('../config/config');

/**
 * mongoose db object
 */
var db = {};

db.mongoose = mongoose;
db.Schema = mongoose.Schema;
db.conn = mongoose.createConnection(config.mongodb_url);

/**
  * Exports.
  */
module.exports  = exports = db;
