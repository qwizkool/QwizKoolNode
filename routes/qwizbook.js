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
		var email = sessionUser.email;
		var title = book.qbookTitle;
		var description = book.qbookDescription;

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
				id : book._id,
				title : book.title,
				description : book.description
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
			} else {

				var json = '';
				var istrue = false;

				var userEmail = sessionUser.email;
				QwizbookRating.getQwizbookRating(book, userEmail, function(err, qbook) {

					if (err) {
						console.log(err);
						res.send(400, err);
						return;
					} else {

						if (istrue) {
							json += ',';
						} else {
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
					if (book_length > 0) {
						var json = '[';
						var istrue = false;
						for ( i = 0; i < book_length; i++) {
							qbook = books[i];

							var userEmail = sessionUser.email;
							QwizbookRating.getQwizbookRating(qbook, userEmail, function(err, book) {

								if (err) {
									console.log(err);
									res.send(400, err);
									return;
								} else {

									if (istrue) {
										json += ',';
									} else {
										istrue = true;
									}
									json += book;
									if (c == book_length) {
										json += ']';

										res.send(json);
									}
								}
								c++;
							});

						}
					} else {
						res.send({
							Error : "Cannot rate Qwizbook "
						}, []);
					}

				})
			} else {
				/*
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
				 */

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

					if (book_length > 0) {
						
				        var istrue = false;
						for (var i = 0; i < book_length; i++) {

							qbook = books[i];
                            
                            var bookwithRatingCountKey=i;
							var userEmail = sessionUser.email;
							var qid = qbook._id;

							QwizbookRating.getQwizbookRatingCount(qbook, bookwithRatingCountKey, function(err, count, bookwithRatingCount, bookwithRatingCountKey) {

								if (err) {

								} else {
                                   
                                    
                                    bookwithRatingCount.userratingcount = count;
									
									QwizbookRating.getQwizbookUserRating(userEmail, bookwithRatingCount, bookwithRatingCountKey, function(err, user_rating, bookwithUserRating, bookwithUserRatingpos) {

										if (err) {

										} else {

											if (user_rating.length === 0) {
												bookwithUserRating.userRating = 0;

											} else {
												bookwithUserRating.userRating = user_rating[0].rating;

											}

											QwizbookRating.getQwizbookAverageRating(bookwithUserRating, bookwithUserRatingpos, function(err, avgRating, bookwithavgRating, bookwithavgRatingpos) {
												if (err) {

												} else {

													if (avgRating != null) {
														bookwithavgRating.averageRating = avgRating.value;

													} else {
														bookwithavgRating.averageRating = 0;

													}
                                                    
                                                    
                                                    books[bookwithavgRatingpos] = bookwithavgRating;
                                                    
                                                    if (c == book_length) {

														res.send(JSON.stringify(books));
													}
													
													c++;

												}
											});

										}

									});

								}

							});
							
                    	} //end of for loop
					}// endo of if condition for book length
					else {
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
				if (book_length > 0) {
					var json = '[';
					var istrue = false;
					for ( i = 0; i < book_length; i++) {
						qbook = books[i];
						var userEmail = sessionUser.email;
						QwizbookRating.getQwizbookRating(qbook, userEmail, function(err, book) {

							if (err) {
								console.log(err);
								res.send(400, err);
								return;
							} else {

								if (istrue) {
									json += ',';
								} else {
									istrue = true;
								}
								json += book;
								if (c == book_length) {
									json += ']';
									res.send(json);
								}
							}
							c++;
						});

					}

				} else {
					res.send({
						Error : "Cannot rate Qwizbook "
					}, null);
				}

			})
		}

	},

	updateBook : function(req, res) {
		var qbookId = req.route.params.id;
		
		var book = req.body;
		Qwizbook.updateQwizbook(book, function(err, book){
			
			
			if(err)
			{
				res.send({Error:"Cannot update Qwizbook"},null);
			}
			else
			{
				//res.send(qwizbook);
				console.log(book);
				res.send({
  "STATUS": "Successfully deleted Qwizbook"
});
			}
			
		});
		
	},

	deleteBook : function(req, res) {
		
		var qbookId = req.route.params.id;
		
		
		Qwizbook.deleteQwizbook(qbookId, function(err, status){
			
			
			if(err)
			{
				res.send({Error:"Cannot delete Qwizbook"},null);
			}
			else
			{
				//res.send(qwizbook);
				res.send({STATUS:"Successfully deleted Qwizbook"});
			}
			
		});
		
		
	},

	deleteBooks : function(req, res) {
		console.log(req.user);
	},
	
	getmybooks:function(req,res){
		var sessionUser = req.user;
		var parameter = req.query;
		var qbookParameter = new Array();
			for (var i in parameter) {

				qbookParameter[i] = parameter[i];
			}

			var archiveParameter = qbookParameter['archived'];
			var searchString = qbookParameter['search_str'];
		if(archiveParameter)
		{
			Qwizbook.retrieveMyArchivebooks(sessionUser, function(err, books){
			
			
			if(err)
			{
				res.send(400, err);
				console.log(err);
				return;
			}
			else
			{
				res.send(books);
			}
			
		});
		
		
		}
		
		else if(searchString)
		{
			
			Qwizbook.retrieveQwizbookSearchResults(sessionUser,searchString, function(err, books){
			
			
			if(err)
			{
				res.send(400, err);
				console.log(err);
				return;
			}
			else
			{
				res.send(books);
			}
			
		});
		}
		
		else
		{
			Qwizbook.retrieveMyQwizbooks(sessionUser, function(err, books){
			
			
			if(err)
			{
				res.send(400, err);
				console.log(err);
				return;
			}
			else
			{
				res.send(books);
			}
			
		});
		}
		
	}
};

	
