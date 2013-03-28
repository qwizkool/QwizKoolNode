/*
 QwizBook represents one full quiz with associated navigation, hints, comments, images, video, audio etc.
 The QwizBook primarily maintains a list of QwizPage references, and the starte transitions between them.
 A QwizPage could be an intro page, a multiple choice question, summary etc.
 */

define(["app"], function(App) {

	// Create a new module
	var QwizBookRating = App.module();

	QwizBookRating.Model = Backbone.Model.extend({

		urlRoot : "/qwizbookrating/",

		defaults : {
			id : null,
			userEmail : "qwizkool_user@qwizkool.com",
			qwizbookId : null,
			rating : 0,
			isRatedqwizBook : false

		},

		initialize : function() {



		},

		addRating : function(qbId, rating) {

			this.set('qbookId', qbId);
			this.set('isRatedqwizBook', false);
			this.set('ratingval', rating);
			var jqxhr = this.save({}, {

				error : function(model, response) {
					model.set({
						isRatedqwizBook : false
					});
					model.trigger('qwizbookrating-add-event');
				},

				success : function(model, response) {
					model.trigger('qwizbookrating-add-event', response);
				}
			});

		}
	});

	QwizBookRating.Collection = Backbone.Collection.extend({

		model : QwizBookRating.Model,
		url : function() {
			var urlRoot = "/qwizbookrating/";

			return urlRoot;

		}
	});


	// Required, return the module for AMD compliance
	return QwizBookRating;

});

