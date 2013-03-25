/**
 * Module dependencies.
 */
var User = require('../models/Users');
var Qwizbook = require('../models/Qwizbooks');
var QwizbookRating = require('../models/Ratings');
var ratingcount = 0;
module.exports = {
	createBook : function(req, res) {

		var sessionUser = req.user;
		var book = req.body;

		Qwizbook.createQwizbook(sessionUser, book, function(err, book) {
			// If error send the error response
			if (err) {
				res.send(400, err);
				console.log(err);
				return;
			}
			// No error send the unique ID for the newly created
			// book.
			res.send({
				id : book._id
			});
			//res.send({id:book.id});

		})
	},

	getbook : function(req, res) {

		var qbookId = req.route.params.id;

		qbookId = req.route.params.id;
		var sessionUser = req.user;
        var userEmail = sessionUser.email;
		Qwizbook.retrieveQwizbook(sessionUser, qbookId, function(err, book) {
			// If error send the error response
			if (err) {
				res.send(400, err);
				console.log(err);
				return;
			}


			else
			{

						var json ='';
						var istrue =false;

						var userEmail = sessionUser.email;
						QwizbookRating.getQwizbookRating(book,userEmail, function(err, qbook) {
						
							if (err) {
								console.log(err);
								res.send(400, err);
								return;
							} else {
								
								

								if(istrue)
								{
									json +=',';
								}
								else
								{
									istrue = true;
								}
								json += qbook;

									res.send(json);
									//res.send(book);
							}
						});
			}

		
		});

	},

	getbooks : function(req, res) {
		
		var t = 1;
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
				
				Qwizbook.retrieveQwizbooksOnSearch(sessionUser, searchstring, filterstring, function(err, books) {
					var book_length = books.length;
					var c = 1;
					if (err) {
						res.send(400, err);
						console.log(err);
						return;
					}
					// No error send the unique ID for the newly created book
					//console.log("Filter criteria" + JSON.stringify(books));
					if(book_length>0)
					{
						var json ='[';
					var istrue =false;
					for (i=0;i<book_length;i++) {
						qbook = books[i];
						
						var userEmail = sessionUser.email;
						QwizbookRating.getQwizbookRating(qbook,userEmail, function(err, book) {
						
							if (err) {
								console.log(err);
								res.send(400, err);
								return;
							} else {
								
								
								if(istrue)
								{
									json +=',';
								}
								else
								{
									istrue = true;
								}
								json += book;
								if(c==book_length)
								{
									json += ']';
									
									res.send(json);
								}
							}
						c++;
						});

					}
					}
					
					else
					{
						res.send({
						Error : "Cannot rate Qwizbook "
					}, null);
					}

				})
			} else {

				Qwizbook.retrieveQwizbooksOnFilter(sessionUser, filterstring, function(err, books) {
					// If error send the error response
					
					var book_length = books.length;
					var c = 1;
					if (err) {
						res.send(400, err);
						console.log(err);
						return;
					}
					// No error send the unique ID for the newly created book

					//console.log("Filter criteria" + JSON.stringify(books));
					if(book_length>0)
					{
						var json ='[';
					var istrue =false;
					for (i=0;i<book_length;i++) {
						qbook = books[i];
						//console.log("routes qwizbook Id" + qbook._id);
						//bookIdDateSortArr[i] = qbook._id;
					
						//console.log("qwizbook retreived" + qbook);
						var userEmail = sessionUser.email;
						//QwizbookRating.getQwizbookRating(qbook,userEmail, function(err, book) {
						QwizbookRating.getQwizbookRating(qbook,userEmail, function(err, book) {	
						
							if (err) {
								console.log(err);
								res.send(400, err);
								return;
							} else {
								
								
								if(istrue)
								{
									json +=',';
								}
								else
								{
									istrue = true;
								}
								json += book;
								if(c==book_length)
								{
									json += ']';
									
									res.send(json);
								}
								
								
							}
						c++;
						});
                    

					}
					}
					else
					{
						res.send({
						Error : "Cannot rate Qwizbook "
					}, null);
					}
					
				

				});
			}

		} else {

			Qwizbook.retrieveQwizbooks(sessionUser, function(err, books) {
				// If error send the error response
				var book_length = books.length;
					var c = 1;
					if (err) {
						res.send(400, err);
						console.log(err);
						return;
					}
					// No error send the unique ID for the newly created book

					//console.log("Filter criteria" + JSON.stringify(books));
					if(book_length>0)
					{
					var json ='[';
					var istrue =false;
					for (i=0;i<book_length;i++) {
						qbook = books[i];
						var userEmail = sessionUser.email;
						QwizbookRating.getQwizbookRating(qbook,userEmail, function(err, book) {
						
							if (err) {
								console.log(err);
								res.send(400, err);
								return;
							} else {
								
								
								if(istrue)
								{
									json +=',';
								}
								else
								{
									istrue = true;
								}
								json += book;
								if(c==book_length)
								{
									json += ']';
									res.send(json);
								}
							}
						c++;
						});

					}
					
					}
					else
					{
						res.send({
						Error : "Cannot rate Qwizbook "
					}, null);
					}

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
