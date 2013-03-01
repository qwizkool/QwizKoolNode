define([
    "app",
    "modules/comments",
    "text!templates/qwizbookComments.html"
], function (App, Comments, Template) {

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
            this.model = new Comments.Model();
        },

        render:function (done) {

            this.el.innerHTML = this.template;
            return this;
        },

        events:{

            "click #cancelComment":"commentDiv",
            "click #qwizbook-comments-form":"addCommentDiv",
            "click #addcomment":"addComment"
        },

        commentDiv:function (e) {
            $('#qwizbook-comments-form').hide();

        },

        addCommentDiv:function (e) {
            $('#qwizbook-comments-form').show();
        },

        addComment:function (e) {
            var addComment = $('#qwizbook-comment-text').val();
            $('#qwizbook-comments-form').hide();
            this.model.addQwizbookComments(addComment, "", this.qId);
        }
    });

    // Required, return the module for AMD compliance
    return Comment;

});