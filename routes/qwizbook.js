/**
 * Module dependencies.
 */
var User = require('../models/User');
var Qwizbook = require('../models/Qwizbook');
var QwizbookRating = require('../models/QwizbookRating');
var ratingcount =0;
module.exports = {

    createBook:function (req, res) {

        var sessionUser = req.user;
        var book = req.body;

        Qwizbook.createQwizbook(sessionUser, book, function (err, book) {
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
                id:book._id
            });
            //res.send({id:book.id});

        })
    },

    getbook:function (req, res) {

        var qbookId = req.route.params.id;

        qbookId = req.route.params.id;
        var sessionUser = req.user;
        Qwizbook.retrieveQwizbook(sessionUser, qbookId, function (err, book) {
            // If error send the error response
            if (err) {
                res.send(400, err);
                console.log(err);
                return;
            }

            QwizbookRating.getQwizbookAverageRating(qbookId, function (err, bookrating) {
                // If error send the error response
                if (err) {
                    res.send(400, err);
                    console.log(err);
                    return;
                }
                // No error send the unique ID for the newly created book
                var qwizbook = ' {';
                qwizbook += '" description":' + JSON.stringify(book.description);
                qwizbook += ', "title":' + JSON.stringify(book.title);

                qwizbook += ', "_id":' + JSON.stringify(book._id);
                if (bookrating == '') {
                    qwizbook += ', "value":' + JSON.stringify(0);
                }
                else {
                    qwizbook += ', "value":' + JSON.stringify(bookrating[0].value);
                }

                qwizbook += '} ';
                res.send(qwizbook);

            })


        });

    },

    getbooks:function (req, res) {
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
                //console.log("search entered !!!!!");
                Qwizbook.retrieveQwizbooksOnSearch(sessionUser, searchstring, filterstring, function (err, books) {
                    // If error send the error response
                    if (err) {
                        res.send(400, err);
                        console.log(err);
                        return;
                    }
                    //console.log("searched criteria" + JSON.stringify(books));
                    for (var i in books) {
                        //console.log("Qwizbook Array" + books[i]);
                        qbookId = books[i]._id;
                        QwizbookRating.getQwizbookAverageRating(qbookId, function (err, bookavgrating) {
                            if (err) {
                                console.log(err);
                                res.send(400, err);
                                return;
                            }
                          
						   books[i]['userrating'] = bookavgrating;
						   books[i].test = 'test';
                        })
                        
                        
                         QwizbookRating.userRatingCount(qbookId, function (err, countRating) {
                            if (err) {
                                console.log(err);
                                res.send(400, err);
                                return;
                            }
                          
                        })
                        
                        

                    }
                    res.send(JSON.stringify(books));

                })
            } else {

                Qwizbook.retrieveQwizbooksOnFilter(sessionUser, filterstring, function (err, books) {
                    // If error send the error response
                    if (err) {
                        res.send(400, err);
                        console.log(err);
                        return;
                    }
                    // No error send the unique ID for the newly created book

                    //console.log("Filter criteria" + JSON.stringify(books));
                    console.log("books filtered num " + books.length);

						var json ='[';
						var istrue = false;
                    for (var i in books) {
                        qbookId = books[i]._id;
                        
                        if(istrue)
                        {
                        	
							 json +=', ';
                        }
                        else
                        {
                        	istrue = true;
                        }
                        
                        	json +='{ ';
                        	
                        QwizbookRating.getQwizbookAverageRating(qbookId, function (err, bookavgrating) {
                            if (err) {
                                console.log(err);
                                res.send(400, err);
                                return;
                            }
                          
						   else
						   {
						   }

                        });
                        QwizbookRating.userRatingCount(qbookId, function (err, countRating) {
                            if (err) {
                                console.log(err);
                                res.send(400, err);
                                return;
                            }
                            else
                            {
                            	 ratingcount = countRating;
                            }
                        });
                        	json +='"ownerEmail":'+JSON.stringify(books[i].ownerEmail);
                        	json +=',"description":'+JSON.stringify(books[i].description);
                        	json +=',"title":'+JSON.stringify(books[i].title);
                        	json +=',"uniqueKey":'+JSON.stringify(books[i].uniqueKey);
                        	json +=',"_id":'+JSON.stringify(books[i]._id);
                        	json +=',"sections":'+JSON.stringify(books[i].sections);
                        	json +=',"reference":'+JSON.stringify(books[i].reference);
                        	json +=',"comments":'+JSON.stringify(books[i].comments);
                        	json +=',"sharedWith":'+JSON.stringify(books[i].sharedWith);
                        	json +=',"date":'+JSON.stringify(books[i].date);
                        	json +=',"ratingCount":'+JSON.stringify(1);
                       		json +='}';

                    }
					json += ']';
                    res.send(json);

                });
            }

        } else {

            Qwizbook.retrieveQwizbooks(sessionUser, function (err, books) {
                // If error send the error response
                if (err) {
                    res.send(400, err);
                    console.log(err);
                    return;
                }
                
                
                
                
                
                
                
                res.send(JSON.stringify(books));

            })
        }

    },

	
    updateBook:function (req, res) {
        console.log(req.user);
    },

    deleteBook:function (req, res) {
        console.log(req.user);
    },

    deleteBooks:function (req, res) {
        console.log(req.user);
    }
};