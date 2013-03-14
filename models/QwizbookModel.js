/*!
 * Copyright(c) 2013 Vibrentt 
 *
 * Module : QwizbookModel 
 *
 */

/**
 * Module dependencies.
 */
var db = require('../lib/db_connection'),
    qwizbookSchema = require('./QwizbookSchema');

/**
 * Qwizbook model.
 */

// Create mongoose schema
var qwizbookSchema = db.Schema(qwizbookSchema);

qwizbookSchema.methods.getQwizbookForResponse = function () {

    return {
        title: this.title,
        description: this.description,
        id: this._id,
        userrating:this.userrating            
    };
};

// Get the mongoose model
var QwizbookModel = db.conn.model('Qwizbook', qwizbookSchema);


/**
  * Exports.
  */
module.exports  = exports = QwizbookModel;
