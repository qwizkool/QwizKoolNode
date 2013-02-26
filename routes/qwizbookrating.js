/**
 * Created with JetBrains WebStorm.
 * User: bambalakkat
 * Date: 11/25/12
 * Time: 12:47 PM
 * To change this template use File | Settings | File Templates.
 */

/**
 * Module dependencies.
 */
var User = require('../models/User');
var Qwizbook = require('../models/Qwizbook');
var QwizbookRating = require('../models/QwizbookRating');

module.exports = {

	addBookRating : function(req, res) {

		var sessionUser = req.user;
		var qwizbookrating = req.body;
		console.log(qwizbookrating);
		var email = sessionUser.email;
		var rating = qwizbookrating.ratingval;
		var qId = qwizbookrating.qbookId;
		console.log("create rating val" + qwizbookrating.qbookId);

		QwizbookRating.addRating(sessionUser, qwizbookrating, function(err, qwizbookrating) {
			// If error send the error response
			if (err) {
				res.send(400, err);
				console.log(err);
				return;
			}
			// No error send the unique ID for the newly created
			// book.
			console.log("QwizBook Rated");
			console.log("Book Details" + JSON.stringify(qwizbookrating));

			res.send({
				id : qwizbookrating._id,
			});
			//res.send({id:book.id});

		})
	},

	updateBookRating : function(req, res) {
		var sessionUser = req.user;
		var qwizbookrating = req.body;
		console.log(qwizbookrating);
		var email = sessionUser.email;
		var rating = qwizbookrating.ratingval;
		var qId = qwizbookrating.qbookId;
		console.log("update rating val" + qwizbookrating.ratingval);

		QwizbookRating.updateRating(sessionUser, qwizbookrating, function(err, qwizbookrating) {
			// If error send the error response
			if (err) {
				res.send(400, err);
				console.log(err);
				return;
			}
			// No error send the unique ID for the newly created
			// book.
			console.log("QwizBook Rated");
			console.log("Book Details" + JSON.stringify(qwizbookrating));

			res.send({
				id : qwizbookrating._id,
			});
			//res.send({id:book.id});

		})
	},

}; 