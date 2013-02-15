/*
 QwizBook represents one full quiz with associated navigation, hints, comments, images, video, audio etc.
 The QwizBook primarily maintains a list of QwizPage references, and the starte transitions between them.
 A QwizPage could be an intro page, a multiple choice question, summary etc.
 */

define(["app"], function(App) {

	// Create a new module
	var QwizBookRating = App.module();

	QwizBookRating.Model = Backbone.Model.extend({

      url : "/qwizbookrating/",
      
      
		//Root of the REST url for QwizBooks
		//urlRoot : "/qwizbookratings/",
		
		//urlRoot:function () {
			//urlRootBase = "/qwizbookratings/"+this.qwizbookId;
            //if (this.qwizbookId) {
             //   return urlRootBase +this.qwizbookId;
            //} 
            
            //},
      

		defaults : {
			id : null,
			userEmail : "qwizkool_user@qwizkool.com",
			qwizbookId: null,
			rating:0,
			isRatedqwizBook : false
			
		},

		initialize : function() {

			var qwizbook = localStorage.getItem("QwizbookData");
			console.log('dfdf' + qwizbook);

			//if (qwizbook) {

				qwizbookDetails = JSON.parse(localStorage.getItem("QwizbookData"));
				userInfo = JSON.parse(localStorage.getItem("qwizkoolUser"));
				
				console.log(userInfo);
				if (userInfo) {
                  //this.urlroot = this.url();
					this.set({
						userEmail : userInfo.email,
						qwizbookId : this.qbookId,
						rating : this.ratingval
						
					});

				}
			//}
		},

		addqwizbookrating : function(qbId,rating) {

			
			this.set('qbookId', qbId);
			this.set('isRatedqwizBook', false);
        	this.set('ratingval', rating);
           
            var jqxhr = this.save({}, {

                
				error : function(model, response) {
					model.set({
						isRatedqwizBook : false,
						action : 'none'
					});
					model.trigger('add-qwizbookrating-event');

					// alert("Model:Failed to register "+ model.get('name') + " ! " + response.statusText);
				},

				success : function(model, response) {
					//alert("Model:Hello " + model.get('name') + " ! " + "Welcome to QwizKool ! " + "You are user #" + model.get('uid') +".");

					model.set({
						action : 'none'
					});
					model.trigger('add-qwizbookrating-event');
					//alert(response.ratingval);
					//model.trigger('show-qwizbookrating-event', response.ratingval);
				}
			});
	
	
            
			
		},
		
		getQwizbookIdAndRating:function(qbId,rating)
		{
			this.qbookId = qbId;
			this.ratingval = rating;
			//this.urlroot = this.url();
		}
		
	});

   QwizBookRating.Collection = Backbone.Collection.extend({

        model : QwizBookRating.Model,
        url: "/qwizbookratings/"

    });
    	
	
	QwizBookRating.Router = Backbone.Router.extend({/* ... */ });

    // Required, return the module for AMD compliance
	return QwizBookRating;

}); 