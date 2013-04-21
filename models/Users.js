/*!
 * Copyright(c) 2013 Vibrentt
 *
 * Module : Users
 *
 */

/**
 * Module dependencies.
 */
var UserModel = require('./UserModel'),
    db = require('../lib/db_connection'),
    nodemailer = require("nodemailer"),
    config = require('../config/config');

/**
 * User model constructor.
 *
 * @api public
 * @return {Function} Constructor for User type.
 */

function Users() {

}



// Add user to database
Users.prototype.addUser = function(username, password, email, activationCode, callback) {

    var instance = new UserModel();

    instance.username = username;
    instance.password = password;
    instance.email = email;
    instance.activationCode = activationCode;

    instance.save(function (err) {
        if (err) {

            // Check for duplicate key error
            if (err.code == 11000) {
                callback({Error:"user_already_exists"})
                return;
            }

            // All other conditions Pass as is TODO: need to cleanup.
            callback({Error:"registration_failed"});
        }
        else {
            callback(null, instance);
        }
    });
}


Users.prototype.authenticate = function (email, password, callback) {
    UserModel.findOne({ email:email }, function (err, user) {
        if (err) {
            return callback(err);
        }
        if (!user) {
            return callback(null, false);
        }

        user.verifyPassword(password, function (err, passwordCorrect) {
            if (err) {
                return callback(err);
            }
            if (!passwordCorrect) {
                return callback(null, false);
            }
            return callback(null, user);
        });

    });
};


/**
*
* Activate user account
* @param string token token sent to the user email
* possible cases to be handled
*  - Invalid token
*  - Already activated
*/
Users.prototype.activate = function(token, callback){
    UserModel.findOne({activationCode: token}, function(err, user){
        if(err){
            console.log("error occured")
            return callback(err)
        }
        // check if its a valid token
        if(!user || (user && (user._id.getTimestamp().getTime() + config.token_expiration) < Date.now())){
            return callback(null, false)
        }
        if(user.activationStatus == true){
            return callback(false, user)
        }
        user.activationStatus = true;
        user.save();
        callback(null, user);
    });
}



Users.prototype.findById = function (id, callback) {
    UserModel.findById(id, function (err, user) {
        if (err) {
            return callback(err);
        }
        if (!user) {
            return callback(null, false);
        }

        return callback(null, user);

    });
};



/**
 * Exports.
 * Return the singleton instance
 */

module.exports = exports = new Users();

