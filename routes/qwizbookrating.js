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
		console.log("rating val" + qwizbookrating.qbookId);

		QwizbookRating.addRating(sessionUser,qwizbookrating , function(err, qwizbookrating) {
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
	
    
    updateBookRating: function(req, res) {
    	var sessionUser = req.user;
		var qwizbookrating = req.body;
		console.log(qwizbookrating);
		var email = sessionUser.email;
		var rating = qwizbookrating.ratingval;
		var qId = qwizbookrating.qbookId;
		console.log("rating val" + qwizbookrating.ratingval);

		QwizbookRating.updateRating(sessionUser,qwizbookrating , function(err, qwizbookrating) {
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
    
    
	getbook : function(req, res) {
		var qbookId = req.route.params.id;

		qbookId = req.route.params.id;
		var sessionUser = req.user;
		Qwizbook.retrieveQwizbook(sessionUser, qbookId, function(err, book) {
			// If error send the error response
			if (err) {
				res.send(400, err);
				console.log(err);
				return;
			}
			// No error send the unique ID for the newly created book
			//console.log("Retreive QwizBooks");
			//console.log(JSON.stringify(books));
			//console.log(JSON.stringify(book));
			res.send(JSON.stringify(book));
			//res.send({id : book._id});
			//res.send({id:book.id});

		})
	},

	getbooks : function(req, res) {

		var sessionUser = req.user;

		if (req.query) {

			var p = req.query;
			var searchfilterArr = new Array();
			for (var i in p) {

				searchfilterArr[i] = p[i];
				//console.log("Request Request Det" + p[i]);
			}

			var searchstring = searchfilterArr['search_str'];
			var filterstring = searchfilterArr['sort_by'];

			if (searchstring) {
				//console.log("search entered !!!!!");
				Qwizbook.retrieveQwizbooksOnSearch(sessionUser, searchstring, filterstring, function(err, books) {
					// If error send the error response
					if (err) {
						res.send(400, err);
						console.log(err);
						return;
					}
					// No error send the unique ID for the newly created book

					console.log("searched criteria" + JSON.stringify(books));
					console.log("searched criteria num " + books.length);
					res.send(JSON.stringify(books));

				})
			} else {

				Qwizbook.retrieveQwizbooksOnFilter(sessionUser, filterstring, function(err, books) {
					// If error send the error response
					if (err) {
						res.send(400, err);
						console.log(err);
						return;
					}
					// No error send the unique ID for the newly created book

					console.log("Filter criteria" + JSON.stringify(books));
					console.log("searched criteria num " + books.length);
					res.send(JSON.stringify(books));

				})
			}

		} else {

			Qwizbook.retrieveQwizbooks(sessionUser, function(err, books) {
				// If error send the error response
				if (err) {
					res.send(400, err);
					console.log(err);
					return;
				}
				// No error send the unique ID for the newly created book

				res.send(JSON.stringify(books));

			})
		}

	},

	updateBook : function(req, res) {
		console.log(req.user);
	},

	deleteBook : function(req, res) {
		console.log(req.user);
	},

	deleteBooks : function(req, res) {
		console.log(req.user);
	}
};
