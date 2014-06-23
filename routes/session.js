/*!
 * Copyright(c) 2013 Vibrentt
 *
 * Module : Session
 * This module handle all the session route requests.
 *
 */


/**
 * Module dependencies.
 */
var logger = require('../utils/logger');

/**
 * Session module constructor.
 *
 * @api public
 * @return {Function} Constructor for Qwizbook type.
 */

function Session() {

}


Session.prototype.login = function (req, res) {
    logger.info(JSON.stringify(req.user));

    var session = req.user.getUserForSession();
    session.isAuthenticated = true;
    session.password="";

    res.send(JSON.stringify(session));
};

Session.prototype.logout = function (req, res) {
    logger.info(JSON.stringify(req.user));
    req.logout();
    res.send({STATUS:"Logout Success"})
};

Session.prototype.getUser = function (req, res) {
    logger.info(JSON.stringify(req.user));

    var session = req.user.getUserForSession();
    session.isAuthenticated = true;
    session.password="";

    res.send(JSON.stringify(session));
};


module.exports = exports = new Session();