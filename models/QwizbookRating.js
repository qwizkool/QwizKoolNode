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
		var QwizbookSchema = mongoose.model('Qwizbook', QwizbookSchema);
		var ObjectId = mongoose.Schema.Types.ObjectId;
		/*
		
		Qwizbook definition
		
		Qwizbook has sections[]. Each Sections has pages[]. Each Page has one Question.
		
		The transition from one section to another is managed by the qwizbook FSM and
		the rules/criteria defined in the FSM.
		
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
		
		//var Qwizbook = mongoose.model('Qwizbook', QwizbookSchema);
		var QwizbookRatingSchema = new db.Schema({
		
			//------- General Information/data
		
			// A combination of title and owner email to create uniqueness
			// This is with assumption that email is unique @ qwizkool.
			//id:{type:String, unique:true},
			userEmail : {
				type : String
			},
			//qwizbookId:{type:String},
			qwizbookId : {
				type : ObjectId
			},
			//_creator : { type: Schema.Types.ObjectId, ref: 'Person' },
			rating : {
				type : Number
			}
		
		});

		
		QwizbookRatingSchema.methods.getQwizbookRatingForResponse = function() {
		
			return {
				userEmail : this.userEmail,
				qwizbookId : this.qwizbookId,
				rating : this.rating,
				id : this._id
			}
		};
		
		var QwizbookRatingData = db.conn.model('QwizbookRating', QwizbookRatingSchema);
		
		// Exports
		module.exports.addRating = addRating;
		module.exports.updateRating = updateRating;
		
		module.exports.retrieveQwizbookRating = retrieveQwizbookRating;
		module.exports.getQwizbookAverageRating = getQwizbookAverageRating;
		
		module.exports.commentUserRating = commentUserRating;
		
		//module.exports.retrieveAverageRating = retrieveAverageRating;
		
		function addRating(owner, data, callback) {
		
			// Check if the provided owner is same as the
			// session owner. A book can be created by only
			// the session owner
		
			if (owner.email != data.userEmail) {

		return;
	}

	
	
	
	
	
	
	
	
	/*QwizbookRatingData.find({
		$and : [{
			qwizbookId : data.qbookId,
			userEmail : data.userEmail
		}]
	}).execFind(function(err, rating) {

		if (err) {
			// Check for duplicate key error

			// All other conditions Pass as is TODO: need to cleanup.
			callback({
				Error : "failed Qwizbook Retreive ."

			}, null);
		} else {
			
			
			callback(null, rating);
			var query = {
				qwizbookId : data.qbookId,
				userEmail : data.userEmail
			};
			QwizbookRatingData.update(query, {
				rating : data.ratingval
			}, err, callback)
			//console.log('got rating');
		}

	});
	*/
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	

	
		
			var instance = new QwizbookRatingData();
		
			instance.userEmail = data.userEmail;
			instance.rating = data.ratingval;
			instance.qwizbookId = data.qbookId;
		
			instance.save(function(err) {
				if (err) {
					// Check for duplicate key error
					if (err.code == 11000) {
						callback({
							Error : "You have already rated"
						}, null)
						return;
					}
		
					// All other conditions Pass as is TODO: need to cleanup.
					callback({
						Error : "Cannot rate Qwizbook "
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
					Error : "Qwizbook Could not be created, Please Login "
				});
				return;
			}
		
			QwizbookRatingData.find({
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
					QwizbookRatingData.update(query, {
						rating : data.ratingval
					}, err, callback)
					//console.log('got rating');
				}
		
			});
		};
		
		function retrieveQwizbookRating(qid, callback) {
			
			
			var mapFunction1 = function() {
				emit(this.qwizbookId, this.rating);
			// All other conditions Pass as is TODO: need to cleanup.
			
		} 
		
		var reduceFunction1 = function(QbId, valuesRatings) {
				return (Array.sum(valuesRatings) / valuesRatings.length);
			};
		
			var o = {};
			o.map = mapFunction1;
			o.reduce = reduceFunction1;
			o.query = {qwizbookId : qid};
			o.out = {
				replace : "averageRating"
			};
			
			
			
			QwizbookRatingData.mapReduce(o, function(err, avgrating) {
				//console.log(o);
				if (err) {
					// Check for duplicate key error
					console.log('error');
					// All other conditions Pass as is TODO: need to cleanup.
					callback({
						Error : "failed to get Qwizbook Average Rating."
					}, null);
				} else {
		
					//avgrating.findById(qbId, function(err, averagerating){
					//avgrating.find({'_id': 'qbId'}, function(err, averagerating){
					avgrating.find(function(error, averagerating) {
		
						if (error) {
							console.log('error');
							callback({
								Error : "failed to get Qwizbook Average Rating."
							}, null);
						} else {
		
							callback(null, averagerating);
		
							//console.log("AVG RATING" + JSON.stringify(averagerating) + 'hhjhj');
						}
		
					});
		
				}
		
			});
	
};


		
			
			
			
		
	
		
		function getQwizbookAverageRating(qid, callback) {
			//console.log(this.qwizbookId);
			var mapFunction1 = function() {
				emit(this.qwizbookId, this.rating);
			};
		
			var reduceFunction1 = function(QbId, valuesRatings) {
				return (Array.sum(valuesRatings) / valuesRatings.length);
			};
		
			var o = {};
			o.map = mapFunction1;
			o.reduce = reduceFunction1;
			o.query = {qwizbookId : qid};
			o.out = {
				replace : "averageRating"
			};
			//console.log(o);
			QwizbookRatingData.mapReduce(o, function(err, avgrating) {
				if (err) {
					// Check for duplicate key error
					console.log('error');
					// All other conditions Pass as is TODO: need to cleanup.
					callback({
						Error : "failed to get Qwizbook Average Rating."
					}, null);
				} else {
		
					//avgrating.findById(qbId, function(err, averagerating){
					//avgrating.find({'_id': 'qbId'}, function(err, averagerating){
					avgrating.find(function(error, averagerating) {
		
						if (error) {
							console.log('error');
							callback({
								Error : "failed to get Qwizbook Average Rating."
							}, null);
						} else {
		
							callback(null, averagerating);
		
							//console.log("AVG RATING" + JSON.stringify(averagerating) + 'hhjhj');
						}
		
					});
		
				}
		
			});
		};
		
		function commentUserRating(user, qwizbookId, callback) {
			QwizbookRatingData.find({
				$and : [{
					qwizbookId : qwizbookId,
					userEmail : user
				}]
			}).execFind(function(err, comments) {
		
				if (err) {
					// All other conditions Pass as is TODO: need to cleanup.
					callback({
						Error : "Retreive QwizbookComments failed."
					}, null);
				} else {
					callback(null, comments);
				}
		
			});
		
		};
		
