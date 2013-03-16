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
    db = require('../lib/db_connection');

/**
 * User model constructor.
 *
 * @api public
 * @return {Function} Constructor for User type.
 */

function Users() {

}



// Add user to database
Users.prototype.addUser = function(username, password, email, callback) {

    var instance = new UserModel();

    instance.username = username;
    instance.password = password;
    instance.email = email;

    instance.save(function (err) {
        if (err) {

            // Check for duplicate key error
            if (err.code == 11000) {
                callback({Error:"User already exist with the same email ID/user name"})
                return;
            }

            // All other conditions Pass as is TODO: need to cleanup.
            callback({Error:"User Could not be created "});
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
