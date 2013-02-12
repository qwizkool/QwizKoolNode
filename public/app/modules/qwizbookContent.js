define([
    "app",
    "modules/qwizbook",
    "modules/qwizbookBreadcrumbs",
    "modules/qwizbookDetails",
    "modules/qwizbookComments",
    "modules/commentDetails",
    "text!templates/qwizbookContent.html"
    
], function (App,QwizBook,Breadcrumb,QwizbookDetails,QwizbookComments,CommentDetails,Template) {

    // Create a new module
    var QwizbookContent = App.module();


    QwizbookContent.View = Backbone.View.extend({
		initialize : function() {
		this.breadcrumb = new Breadcrumb.View();
		this.qwizbookId = this.options.qwizbookId;
		//this.qwizbookDetails = new QwizbookDetails.View({qwizbookId:this.qwizbookId});
		this.comments = new QwizbookComments.View();
		this.commentDetail = new CommentDetails.View();
		
		/*this.model = new QwizBook.Model({id:this.qwizbookId});
		var jqxhr = this.model.fetch({

				error : function(model, response) {
					console.log("Failed to get QwizBook!");
				},

				success : function(model, response) {
				}
			});*/
			
		},
        template:Template,

        render:function (done) {
        	 this.el.innerHTML = this.template;
        	 $(this.el).find("#home-content-header").append(this.breadcrumb.render().el);
        	// $(this.el).find("#home-content-container").append(this.model.render().el);
        	 $(this.el).find("#review-content-header").append(this.comments.render().el);
        	 $(this.el).find("#review-content-container").append(this.commentDetail.render().el);
        	 return this;
			
        }
    });

    // Required, return the module for AMD compliance
    return QwizbookContent;

});
