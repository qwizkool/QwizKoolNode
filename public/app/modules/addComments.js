define([
    "app",
    "sha256"
], function (App, Sha256) {

    // Create a new module
    var AddComments = App.module();

    // User extendings
    AddComments.Model = Backbone.Model.extend({

        urlRoot:function () {

            urlRootBase = "/";

            if (this.action == "addQwizbookComments") {
                return urlRootBase + "addComments/";
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
                  console.log(response);
                }
            });

        }
    });

    AddComments.Collection = Backbone.Collection.extend({

        model:AddComments.Model,
        url:"/comments"

    });

    AddComments.Router = Backbone.Router.extend({/* ... */ });

    // Required, return the module for AMD compliance
    return AddComments;

});
