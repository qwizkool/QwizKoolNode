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

module.exports = {

	createBook : function(req, res) {

		var sessionUser = req.user;
		var book = req.body;

		//console.log(req.body);
		//console.log(book);

		Qwizbook.createQwizbook(sessionUser, book, function(err, book) {
			// If error send the error response
			if (err) {
				res.send(400, err);
				console.log(err);
				return;
			}
			// No error send the unique ID for the newly created
			// book.
			console.log("QwizBook Added:");
			console.log(JSON.stringify(book));
			res.send({
				id : book._id
			});
			//res.send({id:book.id});

		})
	},

	getbook : function(req, res) {

		console.log(req.user);
	},

	getbooks : function(req, res) {

		var sessionUser = req.user;
        
        
		if (req.query) {
			//var book = req.body;
			//console.log("Hello World");

			//console.log("Request Details" + req.query);
			var p = req.query;
			var searchfilterArr = new Array();
			for (var i in p) {
			
				searchfilterArr[i] = p[i];
				console.log("Request Request Det" + p[i]);
			}
			
			var searchstring = searchfilterArr['search_str'];
			var filterstring = searchfilterArr['sort_by'];
			
			if(searchstring)
			{
				console.log("search entered !!!!!");
				Qwizbook.retrieveQwizbooksOnSearch(sessionUser, searchstring, filterstring, function(err, books) {
				// If error send the error response
				if (err) {
					res.send(400, err);
					console.log(err);
					return;
				}
				// No error send the unique ID for the newly created book
				//console.log("Retreive QwizBooks");
				//console.log(JSON.stringify(books));
				res.send(JSON.stringify(books));
				//res.send({id : book._id});
				//res.send({id:book.id});

			})
				
				
			}
			else {
				console.log("filter entered !!!!!");
				
				Qwizbook.retrieveQwizbooksOnFilter(sessionUser, filterstring, function(err, books) {
				// If error send the error response
				if (err) {
					res.send(400, err);
					console.log(err);
					return;
				}
				// No error send the unique ID for the newly created book
				//console.log("Retreive QwizBooks");
				console.log(JSON.stringify(books));
				res.send(JSON.stringify(books));
				//res.send({id : book._id});
				//res.send({id:book.id});

			})
			
			}

			//console.log(book);
			//console.log(sessionUser);
			//console.log("345");
			//console.log(book);

		} else {

			Qwizbook.retrieveQwizbooks(sessionUser, function(err, books) {
				// If error send the error response
				if (err) {
					res.send(400, err);
					console.log(err);
					return;
				}
				// No error send the unique ID for the newly created book
				//console.log("Retreive QwizBooks");
				//console.log(JSON.stringify(books));
				res.send(JSON.stringify(books));
				//res.send({id : book._id});
				//res.send({id:book.id});

			})
		}

		//console.log(book.getQwizbookForResponse());
		//console.log(req.user);
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
