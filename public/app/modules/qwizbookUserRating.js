define([
    "app",
    "modules/comments",
    "modules/qwizbookrating",
    "text!templates/qwizbookUserRating.html"
], function (App,Comments,QwizBookRating,Template) {

    // Create a new module
    var Comment = App.module();

    // Footer extendings
    Comment.Model = Backbone.Model.extend({ /* ... */ });
    Comment.Collection = Backbone.Collection.extend({ /* ... */ });
    Comment.Router = Backbone.Router.extend({ /* ... */ });

    Comment.View = Backbone.View.extend({

        template:Template,
      	initialize:function () {
      	this.qId = this.options.qwizbookId;
      	this.model = new QwizBookRating.Model({qwizbookId:this.qId});
      	 var jqxhr = this.model.fetch({

                error : function(model, response) {
                  console.log("Failed to get QwizBook!");
                },

                success : function(model, response) {
                	var rating = response[0].rating;
					var html ='';
					var i=1;
					html += '<h5>Click to rate:</h5> <ul  class="rater rating-w-fonts">';
                       
					for(i=1;i<=rating;i++)
					{
						html += '<li id="rating-'+i+'" class="rated" name="rating-'+i+'" value="1">R</li>';
					}
					if(i<5)
					{
						for(j=i;j<=5;j++)
						{
							html += '<li id="rating-'+j+'" name="rating-'+j+'" value="1">R</li>';
						}
					}
					html +='</ul>';
					this.userRating = html;
					}
					
					}); 
             
      	
    	},

        render:function (done) {

            this.el.innerHTML = this.template;
            
            return this;
        }
    });

    // Required, return the module for AMD compliance
    return Comment;

});