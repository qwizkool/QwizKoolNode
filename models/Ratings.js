/*!
* Copyright(c) 2013 Vibrentt
*
* Module : QwizbookRating
*
*/

/**
 * Module dependencies.
 */
var RatingModel = require('./RatingModel'), db = require('../lib/db_connection'), logger = require('../utils/logger');

/**
 * Qwizbook Rating model constructor.
 *
 * @api public
 * @return {Function} Constructor for Rating type.
 */

function Ratings() {

}

Ratings.prototype.addRating = function(owner, data, callback) {

	// Check if the provided owner is same as the
	// session owner. A book can be created by only
	// the session owner

	if (owner.email != data.userEmail) {

		return;
	}

	// Create new rating model instance
	var instance = new RatingModel();

	instance.userEmail = data.userEmail;
	instance.rating = data.ratingval;
	instance.qwizbookId = data.qbookId;
	instance.getQwizbookRatingCount = '1';
	instance.averageRating = '1';

	// See if the rating already exists
	var conditions = {
		$and : [{
			qwizbookId : data.qbookId,
			userEmail : data.userEmail
		}]
	};

	RatingModel.findOne(conditions, function(err, book) {

		if (err) {
			return callback(err);
		}

		// If rating does not exist already, add it
		if (!book) {
			instance.save(function(err) {

				// Saving error even though same rating does not exist- this is un-expected
				if (err) {
					// Check for duplicate key error
					if (err.code == 11000) {
						callback({
							Error : "You have already rated"
						}, null);
						return;
					}

					// All other conditions Pass as is TODO: need to cleanup.
					callback({
						Error : "Cannot rate Qwizbook "
					}, null);
				} else {

					// Saved successfully

					getQwizbookRatingCount(data.qbookId, function(err, count) {
						if (err) {

						} else {
							instance.getQwizbookRatingCount = count;
							
							getbookAverageRating(data.qbookId, function(err, avgRating) {
								if (err) {

								} else {
									
									if(avgRating.length!=0)
									{
										instance.averageRating = avgRating[0].value;
									}
									else
									{
										instance.averageRating =0;
									}
									callback(null, instance);
								}

							});
							
						}
					});
				}
			});
		} else {
			// Rating already exists - update it
			var query = {
				qwizbookId : data.qbookId,
				userEmail : data.userEmail
			};

			RatingModel.update(query, {
				rating : data.ratingval
			}, {
				multi : false
			}, function(err, numberAffected, raw) {
				if (err) {
					callback({
						Error : "Cannot rate Qwizbook "
					}, null);
				} else {

					logger.info('The number of updated documents was %d', numberAffected);
					logger.verbose('The raw response from Mongo was ', raw);

					getQwizbookRatingCount(data.qbookId, function(err, count) {
						if (err) {

						} else {

							instance.getQwizbookRatingCount = count;
							getbookAverageRating(data.qbookId, function(err, avgRating) {
								if (err) {

								} else {
									
									if(avgRating.length!=0)
									{
										instance.averageRating = avgRating[0].value;
									}
									else
									{
										instance.averageRating =0;
									}
									callback(null, instance);

								}
							});
							
						}
					});

				}
			});
		}

	});

};

Ratings.prototype.updateRating = function(owner, data, callback) {

	// Check if the provided owner is same as the
	// session owner. A book can be created by only
	// the session owner
	var qbookId = data.qbookId;
	var useremail = owner.email;

	if (owner.email != data.userEmail) {
		callback({
			Error : "Qwizbook Could not be created, Please Login "
		});
		return;
	}

	RatingModel.find({
		$and : [{
			qwizbookId : qbookId,
			userEmail : useremail
		}]
	}).execFind(function(err, rating) {

		if (err) {
			// Check for duplicate key error

			// All other conditions Pass as is TODO: need to cleanup.
			callback({
				Error : "failed Qwizbook Retreive ."

			}, null);
			//console.log('no rating found');
		} else {
			callback(null, rating);
			var query = {
				qwizbookId : qbookId,
				userEmail : useremail
			};
			RatingModel.update(query, {
				rating : data.ratingval
			}, err, update);

		}

	});
};

Ratings.prototype.getQwizbookRating = function(qbook, userEmail, callback) {

	var qid 	= qbook._id;
	var date 	= qbook.date;
	/*
	 Get the specified collection name from the db to confirm that the
	 collection exists.
	 */
	db.conn.db.collectionNames("qwizbookratings", function(err, collectionNames) {

		/*'names' contains an array of objects that contain the collection names
		 if array length is 1 then the collection does  exist.*/
		if (collectionNames.length === 1) {

			getQwizbookRatingCount(qid, function(err, count) {
				if (err) {
					callback({
						Error : "failed to get Qwizbook Average Rating."
					}, null);
				} else {

					getQwizbookUserRating(userEmail, qid, function(err, user_rating) {
						if (err) {

						} else {

							getQwizbookAverageRating(qid, function(err, avgRating) {
								if (err) {

								} else {
									if(avgRating!=null)
									{
										qbook.averageRating =avgRating.value;
									}
									else
									{
										qbook.averageRating =0;
									}

									if (user_rating.length === 0) {
										qbook.userRating = 0;

									} else {
										qbook.userRating = user_rating[0].rating;

									}
									qbook.userratingcount = count;
									callback(null, JSON.stringify(qbook));
								}

							});

						}
					});
				}
			});

		} else {
			qbook.getQwizbookRatingCount = 0;
			qbook.userRating = 0;
			qbook.averageRating = 0;
			callback(null, JSON.stringify(qbook));
		}

	});

};

function getQwizbookAverageRating(qid, callback) {
console.log(qid);
	var mapFunction1 = function() {
		emit(this.qwizbookId, this.rating);
		// All other conditions Pass as is TODO: need to cleanup.

	};

	var reduceFunction1 = function(QbId, valuesRatings) {

		return (Array.sum(valuesRatings) / valuesRatings.length);
	};

	var o = {};

	o.map = mapFunction1;
	o.reduce = reduceFunction1;
	o.query = {
		qwizbookId : qid
		//date:new Date().getTime()
	};
	o.out = {
		merge : "averageRating"
	};
	
	RatingModel.mapReduce(o, function(err, avgrating) {
		if (err) {
			// Check for duplicate key error
			console.log(err);
			// All other conditions Pass as is TODO: need to cleanup.
			callback({
				Error : "failed to get Qwizbook Average Rating."
			}, null);
		} else {

			// avgrating.find({'_id': qid}) .execFind(function(error, averagerating) {
			//avgrating.find(function(error, averagerating) {
			  avgrating.findById(qid, function(error, averagerating){
				if (error) {
					console.log(error);
					callback({
						Error : "failed to get Qwizbook Average Rating."
					}, null);
				} else {
					callback(null, averagerating);
					
				}

			});

		}

	});
}

/**
 * Get the number of ratings with the specified qwizbook id.
 *
 * @api public
 * @return
 */

function getQwizbookRatingCount(qid, callback) {

	RatingModel.count({
		qwizbookId : qid
	}, function(err, _count) {
		if (err) {
			console.log(err);
			callback({
				Error : "Failed to get Qwizbook Rating Count."
			}, null);
		} else {
			callback(null, _count);
		}
	});
}

/**
 * Get the rating of a quizbook by specific user
 *
 * @api public
 * @return
 */

function getQwizbookUserRating(user, qwizbookId, callback) {

	RatingModel.find({
		$and : [{
			qwizbookId : qwizbookId,
			userEmail : user
		}]
	}).execFind(function(err, rating) {

		if (err) {
			// All other conditions Pass as is TODO: need to cleanup.
			callback({
				Error : "Retreive Rating failed."
			}, null);
		} else {
			callback(null, rating);
		}

	});

}

function getbookAverageRating(qid, callback) {
	var mapFunction1 = function() {
		emit(this.qwizbookId, this.rating);
		// All other conditions Pass as is TODO: need to cleanup.

	};

	var reduceFunction1 = function(QbId, valuesRatings) {

		return (Array.sum(valuesRatings) / valuesRatings.length);
	};

	var o = {};

	o.map = mapFunction1;
	o.reduce = reduceFunction1;
	o.query = {
		qwizbookId : qid
		//date:new Date().getTime()
	};
	o.out = {
		replace : "averageRating"
	};
	
	RatingModel.mapReduce(o, function(err, avgrating) {
		if (err) {
			// Check for duplicate key error
			console.log(err);
			// All other conditions Pass as is TODO: need to cleanup.
			callback({
				Error : "failed to get Qwizbook Average Rating."
			}, null);
		} else {

			// avgrating.find({'_id': qid}) .execFind(function(error, averagerating) {
			avgrating.find(function(error, averagerating) {
			  //avgrating.findById(qid, function(error, averagerating){
				if (error) {
					console.log(error);
					callback({
						Error : "failed to get Qwizbook Average Rating."
					}, null);
				} else {
					callback(null, averagerating);
					
				}

			});

		}

	});
}

/**
 * Exports.
 * Return the singleton instance
 */

module.exports = exports = new Ratings();

