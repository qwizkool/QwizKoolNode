/*!
 * Copyright(c) 2013 Vibrentt 
 *
 * Module : CommentModel 
 *
 */

/**
 * Module dependencies.
 */
var db = require('../lib/db_connection'),
    commentSchema = require('./schema/CommentSchema');
    

/**
 * Comment model.
 */

// Create mongoose schema
var mCommentSchema = db.Schema(commentSchema);

// Get the mongoose model
var CommentModel = db.conn.model('QwizbookComments', mCommentSchema);


/**
  * Exports.
  */
module.exports  = exports = CommentModel;


