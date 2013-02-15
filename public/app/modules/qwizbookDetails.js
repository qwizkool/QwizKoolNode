define(["app", "modules/qwizbook", "modules/qwizbookrating", "text!templates/qwizbookDetails.html"], function(App, QwizBook, QwizBookRating, Template) {

	// Create a new module
	var QwizbookDetails = App.module();

	QwizbookDetails.View = Backbone.View.extend({
		initialize : function() {
			this.qwizbookId = this.options.qwizbookId;
			this.model = new QwizBook.Model({
				id : this.qwizbookId
			});
			
			this.qwizbookratingmodel = new QwizBookRating.Model();
			var jqxhr = this.model.fetch({

				error : function(model, response) {
					console.log("Failed to get QwizBook!");
				},

				success : function(model, response) {
				}
			});
            
             
			//this.collection = new QwizBook.Collection();
			//this.model = this.collection.get(this.qwizbookId);
			//this.model.getqwizbook(this.qwizbookId);
		},
		template : "app/templates/qwizbookDetails.html",

		render : function(done) {

			var view = this;
			var qbook_template;
			// Fetch the template, render it to the View element and call done.
			App.fetchTemplate(this.template, function(tmpl) {

				qbook_template = _.template(tmpl(view.model.toJSON()));
				view.el.innerHTML = qbook_template();
				
			   $(view.el).find("#home-content-container").append(view.el.innerHTML);
					
					if (_.isFunction(done)) {
					done(view.el);
				}
				//return view;
				// If a done function is passed, call it with the element

			});
			return view;

		},

		events : {
			"click #rating-1" : "setRating1",
			"click #rating-2" : "setRating2",
			"click #rating-3" : "setRating3",
			"click #rating-4" : "setRating4",
			"click #rating-5" : "setRating5"
		},

		setRating1 : function() {
			
			//triggering usermaincontent.js event to get the input value and change the URL
			this.trigger('addrating', {ratingval : $('#rating-1').val(), ratingmodel: this.qwizbookratingmodel});

		},

		setRating2 : function() {
			this.trigger('addrating', {ratingval : $('#rating-2').val(), ratingmodel: this.qwizbookratingmodel});
		},

		setRating3 : function() {
			this.trigger('addrating', {ratingval : $('#rating-3').val(), ratingmodel: this.qwizbookratingmodel});

		},

		setRating4 : function() {
			this.trigger('addrating', {ratingval : $('#rating-4').val(), ratingmodel: this.qwizbookratingmodel});

		},

		setRating5 : function() {
			this.trigger('addrating', {ratingval : $('#rating-5').val(), ratingmodel: this.qwizbookratingmodel});

		}
	});

	// Required, return the module for AMD compliance
	return QwizbookDetails;

}); 