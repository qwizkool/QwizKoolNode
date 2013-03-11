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
		var email = sessionUser.email;
		var rating = qwizbookrating.ratingval;
		var qId = qwizbookrating.qbookId;
		var avgRating = '1';
		var count ='1';
		QwizbookRating.addRating(sessionUser, qwizbookrating, function(err, qwizbookratings) {
			// If error send the error response
			if (err) {
				res.send(400, err);
				console.log(err);
				return;
			}
			
			
			// No error send the unique ID for the newly created
			// book.
			
			if(qwizbookratings!= 1)
			{
			res.send({
				
				avgRating : qwizbookratings.averageRating,
				rating : qwizbookratings.rating,
				qId : qwizbookratings.qwizbookId,
				count : qwizbookratings.userratingcount
				
			});
			}
			//res.send({id:book.id});

		});
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
				rating : qwizbookrating.rating,
			});
			//res.send({id:book.id});

		})
	},

	ListCommentRating : function(req, res) {
		var qwizbookId = req.route.params.qwizbookId;
		var sessionUser = req.user.email;
		QwizbookRating.commentUserRating(sessionUser, qwizbookId, function(err, qwizbookratings) {
			if (err) {
				res.send(400, err);
				console.log(err);
				return;
			} else {
				res.send(JSON.stringify(qwizbookratings));
			}
		});
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
			res.send(JSON.stringify(book));

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
