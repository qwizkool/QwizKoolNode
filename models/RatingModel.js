/*!
 * Copyright(c) 2013 Vibrentt 
 *
 * Module : RatingModel 
 *
 */

/**
 * Module dependencies.
 */
var db = require('../lib/db_connection'),
    ratingSchema = require('./schema/RatingSchema');

/**
 * Qwizbook rating model.
 */
 

// Create mongoose schema
var mRatingSchema = db.Schema(ratingSchema);

mRatingSchema.methods.getQwizbookRatingForResponse = function () {

    return {
        userEmail:this.userEmail,
        qwizbookId:this.qwizbookId,
        rating:this.rating,
        id:this._id
    }
};

// Get the mongoose model
var RatingModel = db.conn.model('QwizbookRating', mRatingSchema);


/**
  * Exports.
  */
module.exports  = exports = RatingModel;


