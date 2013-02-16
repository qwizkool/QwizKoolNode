define([
    "app",
    "sha256"
], function (App, Sha256) {

    // Create a new module
    var Comments = App.module();

    Comments.Model = Backbone.Model.extend({

        urlRoot:function () {

            urlRootBase = "/";

            if (this.action == "addQwizbookComments") {
                return urlRootBase + "comments/";
            } 
        },

        defaults:{
            id:null,
            comment:'qwizbook coments',
            qwizbookId:null
        },

        initialize:function () {

           
        },

        isUserAuthenticated:function () {
            var state = this.get('isLoggedIn');
            return state;
        },

        addQwizbookComments:function (comments,qId) {
        	this.set('comment', comments);
        	this.set('qwizbookId', qId);
        	this.action = "addQwizbookComments";

            var jqxhr = this.save({}, {

                error:function (model, response) {
                	console.log('error');
                },

                success:function (model, response) {
                }
            });

        }
    });

    Comments.Collection = Backbone.Collection.extend({

        model:Comments.Model,
        url:function () {
            var urlRoot = "/comments";
            if(this.qwizbookId)
            {
            	urlRoot =urlRoot + "/" +this.qwizbookId;
            }
            return urlRoot;
		},
		 QwizbookComments:function (qwizbookId) {
		 	this.qwizbookId = qwizbookId;
		 	this.urlroot = this.url();
		 	
            var qwizbookComments = this;

		var jqxhr = qwizbookComments.fetch({
		
		error : function(collection, response) {
		},
		
		success : function(collection, response) {
		List = qwizbookComments.toJSON();
		}
});

    

//qwizbookList.fetch(function() {

//console.log(qwizbookList);

//});

// $('#qwizbook-lists').html(this.qwizbookListView.render().el);
}
    });

    Comments.Router = Backbone.Router.extend({/* ... */ });

    // Required, return the module for AMD compliance
    return Comments;

});
