/*!
 * Copyright(c) 2013 Vibrentt
 *
 * Module : UserSchema
 *
 */

var UserSchema = {
    username: {
        type: String
    },
    email: {
        type: String,
        unique: true
    },
    //   salt: { type: String, required: true },
    hash: {
        type: String,
        required: true
    },
    activationCode: {
        type: String,
        required: true
    },
    activationStatus: {
        type: Boolean,
        default: false
    }
};

/**
 * Exports.
 */
module.exports = exports = UserSchema;

