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
    qwizbookSchema = require('./schema/QwizbookSchema');

/**
 * Qwizbook model.
 */

// Create mongoose schema
var mQwizbookSchema = db.Schema(qwizbookSchema);
mQwizbookSchema.index({ownerEmail:1,title:1},{unique:true})

mQwizbookSchema.methods.getQwizbookForResponse = function () {

    return {
        title: this.title,
        description: this.description,
        id: this._id,
        userrating:this.userrating            
    };
};

// Get the mongoose model
var QwizbookModel = db.conn.model('Qwizbook', mQwizbookSchema);


/**
  * Exports.
  */
module.exports  = exports = QwizbookModel;
