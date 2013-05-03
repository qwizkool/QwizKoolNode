/*!
 * Copyright(c) 2013 Vibrentt 
 *
 * Module : PageModel 
 * Qwizbook Page model
 */

/**
 * Module dependencies.
 */
var db = require('../lib/db_connection'),
    pageSchema = require('./schema/QwizbookPageSchema');


// Create mongoose schema
var mPageSchema = db.Schema(pageSchema);
mPageSchema.index({qwizbookId:1, pageNum:1},{unique:true});



// Get the mongoose model
var QwizbookPageModel = db.conn.model('QwizbookPage', mPageSchema);

/**
  * Exports.
  */
module.exports  = exports = QwizbookPageModel;