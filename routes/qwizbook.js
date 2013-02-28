/**
 * Module dependencies.
 */
var User = require('../models/User');
var Qwizbook = require('../models/Qwizbook');
var QwizbookRating = require('../models/QwizbookRating');

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
                console.log(bookrating);
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
                    console.log("books searched num " + books.length);
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


                    for (var i in books) {
                        //console.log("Qwizbook Array" + books[i]);
                        qbookId = books[i]._id;
                        QwizbookRating.getQwizbookAverageRating(qbookId, function (err, bookavgrating) {
                            if (err) {
                                console.log(err);
                                res.send(400, err);
                                return;
                            }
                       })

                    }


                    res.send(JSON.stringify(books));

                })
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