/*!
* Copyright(c) 2013 Vibrentt
*
* Module : Qwizbook
*
* Qwizbook has sections[]. Each Sections has pages[]. Each Page has one Question.
* The transition from one section to another is managed by the qwizbook FSM and
* the rules/criteria defined in the FSM.
* Inside each section, the transition happens from one page to another in a linear
* fashion.
*
* A Qwizbook can have reference module. A reference module is a collection of the following
*
* - Links to external videos[]
* - links to web pages[]
* - links to Images[]
* - links to wiki like pages[] created by user (internal to Qwizkool)
*
* A Qwizbook can have comments posted by the registered users.
*
* A collection of hints can be associated with the a page. every time a user refers to a hint. The points
* will be deducted accordingly. This will affect the criteria that decides the progress from one section to
* another.
*
* A qwizbook page can have comments posted by the registered users.
*
* Comments will be moderated by the Qwizbook owner. Comments will be active only after the owners approval.
* CAPTCHA based Spam prevention will be used for comments.
*
* A question is the basic unit. A question will have one or more correct answers.
*/

/**
 * Module dependencies.
 */
var QwizbookModel = require('./QwizbookModel'), logger = require('../utils/logger'), _ = require('underscore');;

/**
 * Qwizbook model constructor.
 *
 * @api public
 * @return {Function} Constructor for Qwizbook type.
 */

function Qwizbook() {

}

/**
 * Create Qwizbook.
 *
 * @param {String} owner
 * @param {Number} data
 * @param {Number} callback
 * @api public
 * @return {Function} Constructor for Qwizbook type.
 */
Qwizbook.prototype.createQwizbook = function(owner, data, callback) {

	// Check if the provided owner is same as the
	// session owner. A book can be created by only
	// the session owner
	logger.info('Inside createQwizbook');

	if (!owner.email) {
		callback({
			Error : "Qwizbook Could not be created, Please Login "
		});
		return;
	}

	var instance = new QwizbookModel();
	instance.uniqueKey = data.title + ":" + owner.email;
	instance.title = data.title;
	instance.description = data.description;
	instance.ownerEmail = owner.email;
	instance.groupPermission = data.groupPermission;
	instance.reference = data.reference;
	instance.archive = data.archive;
	instance.published = data.published;
	instance.pages  = data.pages;
	instance.pageReference = data.pageReference;
	instance.save(function(err) {
		if (err) {
			console.log(err);
			// Check for duplicate key error
			if (err.code == 11000) {
				callback({
					Error : "Qwizbook already exist for the same user"
				}, null);
				return;
			}

			// All other conditions Pass as is TODO: need to cleanup.
			callback({
				Error : "Qwizbook Could not be created "
			}, null);
		} else {
			callback(null, instance);
		}
	});
};

/**
 * Retrieve Qwizbook.
 *
 * @param {String} owner
 * @param {Number} data
 * @param {Number} callback
 * @api public
 * @return {Function} Constructor for Qwizbook type.
 */
Qwizbook.prototype.retrieveQwizbook = function(owner, id, callback) {

	QwizbookModel.findById(id, function(err, book) {

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

/**
 * Retrieve Qwizbooks.
 *
 * @param {String} owner
 * @param {Number} data
 * @param {Number} callback
 * @api public
 * @return {Function} Constructor for Qwizbook type.
 */
Qwizbook.prototype.retrieveQwizbooks = function(owner, callback) {

	// TODO: Complete the Retrieve Qwizbooks
	// Retrieve Qwizbooks, that are shared, public or
	// owned by the 'owner'
	QwizbookModel.find(function(err, books) {

		if (err) {
			// All other conditions Pass as is TODO: need to cleanup.
			callback({
				Error : "Retreive Qwizbooks failed."
			}, null);
		} else {
			callback(null, books);
		}

	});

};

Qwizbook.prototype.retrieveMyQwizbooks = function(owner,page,limit, callback) {

	// TODO: Complete the Retrieve Qwizbooks
	// Retrieve Qwizbooks, that are shared, public or
	// owned by the 'owner'
	var userEmail = owner.email;
	QwizbookModel.find({
		ownerEmail : userEmail,
		archive :false,
	}).sort({
		date : -1
	}).skip(page).limit(limit).execFind(function(err, books) {

		if (err) {
			// All other conditions Pass as is TODO: need to cleanup.
			callback({
				Error : "Retreive Qwizbooks failed."
			}, null);
		} else {
			callback(null, books);
		}

	});

};



Qwizbook.prototype.retrieveMyArchivebooks = function(owner, page, limit, callback) {

	// TODO: Complete the Retrieve Qwizbooks
	// Retrieve Qwizbooks, that are shared, public or
	// owned by the 'owner'
	var userEmail = owner.email;
	QwizbookModel.find({
		ownerEmail : userEmail,
		archive :true
	}).sort({
		date : -1
	}).skip(page).limit(limit).execFind(function(err, books) {

		if (err) {
			// All other conditions Pass as is TODO: need to cleanup.
			callback({
				Error : "Retreive Qwizbooks failed."
			}, null);
		} else {
			callback(null, books);
		}

	});

};


Qwizbook.prototype.retrieveMyUnarchiveSearchbooks = function(owner, searchparameter, callback) {

	// TODO: Complete the Retrieve Qwizbooks
	// Retrieve Qwizbooks, that are shared, public or
	// owned by the 'owner'

		var userEmail = owner.email;
		if(searchparameter != '')
		{
			QwizbookModel.find({
			ownerEmail : userEmail,
			archive :false,
			$or : [{
				title : {
					$regex : searchparameter,
					$options : 'i'
				}
			}, {
				description : {
					$regex : searchparameter,
					$options : 'i'
				}
			}]
			}).sort({
			date : -1
			}).skip(page).limit(limit).execFind(function(err, books) {

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
		
		else{
			
			QwizbookModel.find({
			ownerEmail : userEmail,
			archive :false
			}).sort({
			date : -1
			}).skip(page).limit(limit).execFind(function(err, books) {

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

/**
 * Retrieve Qwizbook on search.
 *
 * @param {String} owner
 * @param {Number} data
 * @param {Number} callback
 * @api public
 * @return {Function} Constructor for Qwizbook type.
 */
Qwizbook.prototype.retrieveQwizbooksOnSearch = function(owner, searchdata, filterdata,page,limit, callback) {

	// TODO: Complete the Retrieve Qwizbooks
	// Retrieve Qwizbooks, that are shared, public or
	// owned by the 'owner'
	
	if (filterdata == "Recently Updated") {
		//console.log(searchdata);
		QwizbookModel.find({
			archive :false,
			published:true,
			$or : [{
				title : {
					$regex : searchdata,
					$options : 'i'
				}
			}, {
				description : {
					$regex : searchdata,
					$options : 'i'
				}
			}]
		}).sort({
			date : -1
		}).skip(page).limit(limit).execFind(function(err, books) {

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
		//console.log(searchdata);
		QwizbookModel.find({
			archive :false,
			published:true,
			$or : [{
				title : {
					$regex : searchdata,
					$options : 'i'
				}
			}, {
				description : {
					$regex : searchdata,
					$options : 'i'
				}
			}]
		}).skip(page).limit(limit).execFind(function(err, books) {

			if (err) {
				// Check for duplicate key error

				// All other conditions Pass as is TODO: need to cleanup.
				callback({
					Error : "Retreive Qwizbooks failed."
				}, null);
			} else {
				//console.log(books);
				callback(null, books);
			}

		});

	}

};

/**
 * Retrieve Qwizbook.
 *
 * @param {String} owner
 * @param {Number} data
 * @param {Number} callback
 * @api public
 * @return {Function} Constructor for Qwizbook type.
 */
Qwizbook.prototype.retrieveQwizbooksOnFilter = function(owner, filterdata,page,limit, callback) {

	// TODO: Complete the Retrieve Qwizbooks
	// Retrieve Qwizbooks, that are shared, public or
	// owned by the 'owner'
	var qwizbookArray = [];

	if (filterdata == "Recently Updated") {

		QwizbookModel.find({
			archive :false,
			published:true
		}).sort({
			date : -1
		}).skip(page).limit(limit).execFind(function(err, books) {

			if (err) {
				// Check for duplicate key error

				// All other conditions Pass as is TODO: need to cleanup.
				callback({
					Error : "Retreive Qwizbooks failed."
				}, null);
			} else {
				callback(null, books);
				//console.log("Qwizbook sorted" + books);
			}

		});

	}
	if (filterdata == "Most Popular") {
		QwizbookModel.find({
		archive :false,
		published:true
	}).skip(page).limit(limit).execFind(function(err, books)
	{

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

/**
 * Update Qwizbook.
 *
 * @param {String} owner
 * @param {Number} data
 * @param {Number} callback
 * @api public
 * @return {Function} Constructor for Qwizbook type.
 */
Qwizbook.prototype.updateQwizbook = function(book, callback) {
	
	var qId = book._id;
	var Qbook = book;
	var new_title = book.title;
	var new_description = book.description;
	var new_publish = book.published;
	QwizbookModel.update({_id:qId}, {$set: { title: new_title , description : new_description ,archive :false,published:new_publish }}, {upsert: true}, 
		function(err,book)
	 	{
	 		if (err) {
				// Check for duplicate key error

				// All other conditions Pass as is TODO: need to cleanup.
				callback({
					Error : "update Qwizbooks failed."
				}, null);
			} else {
				callback(null, Qbook);
			}
	 	});

};

/**
 * Delete Qwizbook.
 *
 * @param {String} owner
 * @param {Number} data
 * @param {Number} callback
 * @api public
 * @return {Function} Constructor for Qwizbook type.
 */
Qwizbook.prototype.deleteQwizbook = function(qId, callback) {

	//QwizbookModel.remove({"_id" : id}, 
	QwizbookModel.update({_id:qId}, {$set: { archive: true}}, {upsert: true}, 
	function(err, deleteQbook) {

		if (err) {
			callback({
				Error : "Cannot delete qwizbook"
			}, null);
		} else {

			callback(null, deleteQbook);
			console.log(deleteQbook);
		}
	});
};

Qwizbook.prototype.retrieveQwizbookSearchResults = function(owner, searchparameter, callback) {

	// TODO: Complete the Retrieve Qwizbooks
	// Retrieve Qwizbooks, that are shared, public or
	// owned by the 'owner'

		var userEmail = owner.email;
		if(searchparameter != '')
		{
			QwizbookModel.find({
			ownerEmail : userEmail,
			archive :true,
			$or : [{
				title : {
					$regex : searchparameter,
					$options : 'i'
				}
			}, {
				description : {
					$regex : searchparameter,
					$options : 'i'
				}
			}]
			}).sort({
			date : -1
			}).skip(page).limit(limit).execFind(function(err, books) {

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
		
		else{
			
			QwizbookModel.find({
			ownerEmail : userEmail,
			archive :true
			}).sort({
			date : -1
			}).skip(page).limit(limit).execFind(function(err, books) {

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

/**
 * Add a Qwizbook page.
 *
 * @param {String} bookId
 * @param {Number} data
 * @param {Number} callback
 * @api public
 */

Qwizbook.prototype.createQwizbookPage = function(bookId, data, callback){
	QwizbookModel.findById(bookId, function(err, book) {
		if (err) {
			callback({
				Error : "Failed Qwizbook Retreive ."
			}, null);
		} else {
			var pages = book.pages;
			pages.push(data);
			book.save(function(err){
				callback(null, pages[pages.length - 1]);
			});
		}
	});
}

/**
 * Add Qwizbook page references.
 *
 * @param {Array} bookId
 * @param {Number} data  array of page references
 * @param {Number} callback
 * @api public
 */

Qwizbook.prototype.createPageReference = function(bookId, data, callback){

	QwizbookModel.findByIdAndUpdate(bookId, {$pushAll:{pageReference:data}}, function(err, book){
		if (err) {
			callback({
				Error : "Failed Qwizbook Retreive ."
			}, null);
		}
		else{
			var refLength = book.pageReference.length;
			callback(null, book.pageReference.slice(refLength - data.length));
		}
	})
}


/**
 * Add Qwizbook page references.
 *
 * @param {String} bookId
 * @param {Array} data  array of page references
 * @param {Number} callback
 * @api public
 */

 // @TODO delete update should do better

Qwizbook.prototype.createOrUpdatePageReferences = function(bookId, pageId, data, callback){

	var toUpdate = [];
	var toInsert = [],
		updateIds =[];
	for(key in data){
		data[key].pageId = pageId;
		if(data[key]._id){
			updateIds.push(data[key]._id);
			toUpdate.push(data[key]);
		}
		else{
			toInsert.push(data[key]);
		}
	}
	console.log(pageId)
	console.log(bookId)
	QwizbookModel.update({ "_id" : bookId}, { $pull : {"pageReference" : {"pageId" : pageId}}})


	// QwizbookModel.findByIdAndUpdate(bookId, {$pushAll:{pageReference:data}}, function(err, book){
	// 	if (err) {
	// 		callback({
	// 			Error : "Failed Qwizbook Retreive ."
	// 		}, null);
	// 	}
	// 	else{
	// 		var refLength = book.pageReference.length;
	// 		callback(null, book.pageReference.slice(refLength - data.length));
	// 	}
	// })

	// QwizbookModel.findByIdAndUpdate(bookId, {$pushAll:{pageReference:toInsert}}, function(err, book){
	// 	if (err) {
	// 		callback({
	// 			Error : "Failed Qwizbook Retreive ."
	// 		}, null);
	// 	}
	// 	else{
	// 		for(key in toUpdate){
	// 			QwizbookModel.update({
	// 				'pageReference._id' : toUpdate._id
	// 			},{
	// 				$set:{'pageReference.$':toUpdate[key]}
	// 			})
	// 		}
	// 		callback(null, data);
	// 	}
	// })
}

/**
 * Update a qwizbook page
 *
 * @param {String} bookId
 * @param {String} pageId
 * @param {Object} Page
 * @api public
 */

Qwizbook.prototype.updateQwizbookPage = function(bookId, pageId, page, callback){
	QwizbookModel.update({
		'pages._id':pageId
	},{
		$set:{'pages.$':page}
	}, function(err, data){
		callback(null, page);
	})
}


/**
 * Retrieve all qwizbook pages from a qwizbook
 *
 * @param {String} bookId
 * @param {Number} page number
 * @param {Number} limit
 * @api public
 */
Qwizbook.prototype.retrieveQwizbookPages = function(bookId, page, limit, callback){
	QwizbookModel.find({
		_id:bookId
	})
	.$where(function(){
		return this;
	})
	.select("pages")
	.execFind(function(err, book){
		if (err) {
			console.log(err)
			callback({
				Error : "Retreive Qwizbook pages failed."
			}, null);
		} else {
			callback(null, book[0].pages);
		}
	});
}

/**
 * Delete qwizbook page from a qwizbook
 *
 * @param {String} bookId
 * @param {String} pageId
 * @api public
 */
Qwizbook.prototype.deleteQwizbookPage = function(bookId,pageId, callback){
	QwizbookModel.findById(bookId, function(err, book){
		if (err) {
			callback({
				Error : "Failed Qwizbook Retreive ."
			}, null);
		}
		else{
			book.pages.remove({_id:pageId});
			book.save();
			callback(null, book.pages);
		}
	});
}


/**
 * Retrieve all qwizbook page references from a qwizbook
 *
 * @param {String} bookId
 * @param {String} pageId
 * @api public
 */

Qwizbook.prototype.getAllPageReferenes = function(bookId, pageId, callback){
	QwizbookModel.find({
		'_id':bookId
	})
	.select("pages pageReference")
	.execFind(function(err, book){
		if (err) {
			console.log(err)
			callback({
				Error : "Retreive Qwizbook pages failed."
			}, null);
		} else {
			var refs = [];
			if(book[0]){
				var pageRefIds = _.find(book[0].pages, function(item){
					return item._id==pageId
				}).referenceIds;
				for(i=0; i< pageRefIds.length; i++){
					_.each(book[0].pageReference, function(reference){
						if(reference._id.toString()==pageRefIds[i].toString()){
							refs.push(reference);
						}
					});
				}
			}
			callback(null, refs);
		}
	});

}


/**
 * Exports.
 * Return the singleton instance
 */

module.exports = exports = new Qwizbook();
