/*!
 * Copyright(c) 2013 Vibrentt
 *
 * Module : Comments
 *
 */

/**
 * Module dependencies.
 */
var CommentModel = require('./CommentModel'),
    db = require('../lib/db_connection');

/**
 * Comment model constructor.
 *
 * @api public
 * @return {Function} Constructor for Comment type.
 */

function Comments() {

}



Comments.prototype.addComments = function (qwizbookComment, sessionUser, callback) {

	var instance = new CommentModel();
	instance.comment = qwizbookComment.comment;
	instance.description = qwizbookComment.description;
	instance.date = qwizbookComment.date;
	instance.qwizbookId = qwizbookComment.qwizbookId;
	instance.username = sessionUser.username;
	//instance.date 			= Date.now;

	instance.save(function(err) {
		if (err) {

			// All other conditions Pass as is TODO: need to cleanup.
			callback({
				Error : "Qwizbookcomments Could not be created "
			}, null);
		} else {
			callback(null, instance);
		}
	});
}


Comments.prototype.retrieveQwizbookcomments = function(user, qbookId, callback) {
	
		CommentModel.find({qwizbookId : qbookId}).sort({date:-1}).execFind(function(err, comments) {


		if (err) {
			// All other conditions Pass as is TODO: need to cleanup.
			callback({
				Error : "Retreive QwizbookComments failed."
			}, null);
		} else {
			callback(null, comments);
		}

	});
}



/**
 * Exports.
 * Return the singleton instance
 */

module.exports = exports = new Comments();



