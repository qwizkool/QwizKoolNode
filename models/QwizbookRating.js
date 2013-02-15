/**
 * Created with JetBrains WebStorm.
 * User: bambalakkat
 * Date: 11/25/12
 * Time: 10:56 AM
 * To change this template use File | Settings | File Templates.
 */
//require('models/Qwizbook.js');
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var db = require('../lib/qwizbookrating_db');
//var Qwizbook = require('../models/Qwizbook');
var QwizbookSchema  = mongoose.model('Qwizbook', QwizbookSchema);
/*

 Qwizbook definition

 Qwizbook has sections[]. Each Sections has pages[]. Each Page has one Question.

 The transition from one section to another is managed by the qwizbook FSM and
 the rules/criteria  defined in the FSM.

 Inside each section, the transition happens from one page to another in a linear
 fashion.

 A Qwizbook can have reference module. A reference module is a collection of the following

 - Links to external videos[]
 - links to web pages[]
 - links to Images[]
 - links to wiki like pages[] created by user (internal to Qwizkool)

 A Qwizbook can have comments posted by the registered users.

 A collection of hints can be associated with the a page. every time a user refers to a hint. The points
 will be deducted accordingly. This will affect the criteria that decides the progress from one section to
 another.

 A qwizbook page can have comments posted by the registered users.

 Comments will be moderated by the Qwizbook owner. Comments will be active only after the owners approval.
 CAPTCHA based Spam prevention will be used for comments.

 A question is the basic unit. A question will have one or more correct answers.

 */

/*Schema definition*/

//var Qwizbook  = mongoose.model('Qwizbook', QwizbookSchema);
var QwizbookRatingSchema = new db.Schema({

//------- General Information/data

// A combination of title and owner email to create uniqueness
// This is with assumption that email is unique @ qwizkool.
    //id:{type:String, unique:true},
    userEmail:{type:String},
    //qwizbookId:{type:String},
    qwizbookId:{ type: Schema.Types.ObjectId, ref: 'qwizbook' },
    //_creator : { type: Schema.Types.ObjectId, ref: 'Person' },
    rating:{ type:String}
    
});

QwizbookRatingSchema.methods.getQwizbookRatingForResponse = function () {

    return {
    	userEmail:this.userEmail,
    	qwizbookId:this.qwizbookId,
    	rating:this.rating,
        id:this._id
    }
};


var QwizbookRatingData = db.conn.model('QwizbookRating', QwizbookRatingSchema);

// Exports
module.exports.addRating = addRating;
module.exports.updateRating = updateRating;
module.exports.retrieveQwizbook = retrieveQwizbook;
module.exports.retrieveQwizbooks = retrieveQwizbooks;
module.exports.retrieveQwizbooksOnSearch = retrieveQwizbooksOnSearch;
module.exports.retrieveQwizbooksOnFilter = retrieveQwizbooksOnFilter;
//module.exports.retrieveAverageRating = retrieveAverageRating;

function addRating(owner, data, callback) {

    // Check if the provided owner is same as the
    // session owner. A book can be created by only
    // the session owner

    if (owner.email != data.userEmail) {
        callback({
            Error:"Qwizbook Could not be created, Please Login "
        });
        return;
    }

    
    var instance = new QwizbookRatingData();

    instance.userEmail = data.userEmail;
	instance.qwizbookId = data.qbookId;
	instance.rating = data.ratingval;

    instance.save(function (err) {
        if (err) {
            // Check for duplicate key error
            if (err.code == 11000) {
                callback({
                    Error:"You have already rated"
                }, null)
                return;
            }

            // All other conditions Pass as is TODO: need to cleanup.
            callback({
                Error:"Cannot rate Qwizbook "
            }, null);
        } else {
            callback(null, instance);
        }
    });
};



function updateRating(owner, data, callback) {

    // Check if the provided owner is same as the
    // session owner. A book can be created by only
    // the session owner
    var qbookId = data.qbookId;
    var useremail = owner.email;
    
    if (owner.email != data.userEmail) {
        callback({
            Error:"Qwizbook Could not be created, Please Login "
        });
        return;
    }
   


    QwizbookRatingData.find({$and:[{qwizbookId:qbookId, userEmail:useremail}]}).execFind(function(err, rating) {

		if (err) {
			// Check for duplicate key error

			// All other conditions Pass as is TODO: need to cleanup.
			callback({
				Error : "failed Qwizbook Retreive ."
				
			}, null);
			console.log('no rating found');
		} else {
			callback(null, rating);
			var query = { qwizbookId: qbookId,  userEmail:useremail};
            QwizbookRatingData.update(query, { rating: data.ratingval }, err, callback)
			console.log('got rating');
		}

	});
};





function retrieveQwizbook(owner, id, callback) {
	//var qId = db.mongoose.Types.ObjectId('510636c6586b5e5d0f00000a');
	//var qId = db.mongoose.mongo.BSONPure.ObjectID.fromString("510636c6586b5e5d0f00000a");
	//console.log(qId);
	QwizbookRatingData.findById(id, function(err, book) {

		if (err) {
			// Check for duplicate key error

			// All other conditions Pass as is TODO: need to cleanup.
			callback({
				Error : "failed Qwizbook Retreive ."
			}, null);
		} else {
			callback(null, book);
		}

	});

};

function retrieveQwizbooks(owner, callback) {

	//var instance = new QwizbookData();

	//if (!owner) {
	//callback({Error:"Login to view qwizbooks"});
	//return;
	//}

	QwizbookRatingData.find(function(err, books) {

		if (err) {
			// Check for duplicate key error

			// All other conditions Pass as is TODO: need to cleanup.
			callback({
				Error : "Retreive Qwizbooks failed."
			}, null);
		} else {
			callback(null, books);
		}

	});

};


function retrieveQwizbooksOnSearch(owner, searchdata, filterdata, callback) {

	var instance = new QwizbookData();

	//if (!owner) {
	//callback({Error:"Login to view qwizbooks"});
	//return;
	//}
	//console.log("Search Search");
	if (filterdata == "Recently Updated") {

		QwizbookRatingData.find({
			$or : [{
				title : {
					$regex : '135',
					$options : 'i'
				}
			}, {
				description : {
					$regex : '135',
					$options : 'i'
				}
			}]
		}).sort({
			date : -1
		}).populate('qwizbookId').execFind(function(err, books) {

			if (err) {
				// Check for duplicate key error
				// All other conditions Pass as is TODO: need to cleanup.
				console.log("No" + books)
				callback({

					Error : "Retreive Qwizbooks failed."
				}, null);
			} else {
				console.log("Hello" + books)
				callback(null, books);
			}

		});
	}
	if (filterdata == "Most Popular") {
		QwizbookRatingData.find({
			$or : [{
				title : {
					$regex : 'searchdata',
					$options : 'i'
				}
			}, {
				description : {
					$regex : 'searchdata',
					$options : 'i'
				}
			}]
		}).populate('qwizbookId').execFind(function(err, books) {

			if (err) {
				// Check for duplicate key error

				// All other conditions Pass as is TODO: need to cleanup.
				callback({
					Error : "Retreive Qwizbooks failed."
				}, null);
			} else {
				console.log(books);
				callback(null, books);
			}

		});

	}

};

function retrieveQwizbooksOnFilter(owner, filterdata, callback) {

	//var instance = new QwizbookData();

	//if (!owner) {
	//callback({Error:"Login to view qwizbooks"});
	//return;
	//}
	console.log("Filter Filter");
	if (filterdata == "Recently Updated") {
		QwizbookRatingData.find().sort({
			date : -1
		}).populate('qwizbookId').execFind(function(err, books) {

			if (err) {
				// Check for duplicate key error

				// All other conditions Pass as is TODO: need to cleanup.
				callback({
					Error : "Retreive Qwizbooks failed."
				}, null);
			} else {
				callback(null, books);
			}

		});
	}
	if (filterdata == "Most Popular") {
		QwizbookRatingData.find().populate('qwizbookId').execFind(function(err, books) {

			if (err) {
				// Check for duplicate key error

				// All other conditions Pass as is TODO: need to cleanup.
				callback({
					Error : "Retreive Qwizbooks failed."
				}, null);
			} else {
				callback(null, books);
			}

		});

	}

};





