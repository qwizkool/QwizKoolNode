/*!
 * Copyright(c) 2013 Vibrentt 
 *
 * Module : UserModel 
 *
 */

/**
 * Module dependencies.
 */
var db = require('../lib/db_connection'),
    userSchema = require('./schema/UserSchema'),
    bcrypt = require('bcrypt');
    

var SALT_WORK_FACTOR = 10;

/**
 * User model.
 */

// Create mongoose schema
var mUserSchema = db.Schema(userSchema);

mUserSchema.virtual('password')
    .get(function () {
        return this._password;
    })
    .set(function (password) {

        this._password = password;

        //The salt is incorporated into the hash (as plaintext).
        var salt = bcrypt.genSaltSync(SALT_WORK_FACTOR);
        this.hash = bcrypt.hashSync(password, salt);
    });

mUserSchema.method('verifyPassword', function (password, callback) {

    //The salt is incorporated into the hash (as plaintext). The compare function simply pulls the salt out of the hash
    //and then uses it to hash the password and perform the comparison.
    bcrypt.compare(password, this.hash, callback);
});

mUserSchema.methods.getUserForResponse = function () {

    return { username:this.username, email:this.email, id:this._id  }
};

// Get the mongoose model
var UserModel = db.conn.model('User', mUserSchema);


/**
  * Exports.
  */
module.exports  = exports = UserModel;


