/*!
 * Copyright(c) 2013 Vibrentt
 *
 * Module : RatingSchema
 *
 */

var UserSchema = {
    username: {
        type: String,
        unique: true
    },
    email: {
        type: String,
        unique: true
    },
    //   salt: { type: String, required: true },
    hash: {
        type: String,
        required: true
    }
};

/**
 * Exports.
 */
module.exports = exports = UserSchema;

