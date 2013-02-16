define([
    "app",
    "modules/comments",
    "text!templates/commentDetails.html"
], function (App,Comments,Template) {

    // Create a new module
    var CommentDetails = App.module();

    // Footer extendings
    CommentDetails.Model = Backbone.Model.extend({ /* ... */ });
    CommentDetails.Collection = Backbone.Collection.extend({ /* ... */ });
    CommentDetails.Router = Backbone.Router.extend({ /* ... */ });

    CommentDetails.View = Backbone.View.extend({
    	initialize:function () {
    	},

        template:Template,

        render:function (done) {

            this.el.innerHTML = this.template;
            return this;
        }
    });

    // Required, return the module for AMD compliance
    return CommentDetails;

});