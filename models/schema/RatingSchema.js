/*!
 * Copyright(c) 2013 Vibrentt
 *
 * Module : RatingSchema
 *
 */

var db = require('../../lib/db_connection');


var ObjectId = db.Schema.Types.ObjectId;

var RatingSchema = {

    userEmail: {
        type: String
    },

    qwizbookId: {
        type: ObjectId
    },

    rating: {
        type: Number
    }

};

/**
 * Exports.
 */
module.exports = exports = RatingSchema;

