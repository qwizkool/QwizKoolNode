define([
    "app",
    "modules/comments",
    "modules/user",
    "modules/qwizbookComments",
    "text!templates/qwizbookComments.html"
], function (App, Comments, User, QwizbookComments, Template) {

    // Create a new module
    //var Comment = App.module();

    // Footer extendings
    // Comment.Model = Backbone.Model.extend({ /* ... */ });
    // Comment.Collection = Backbone.Collection.extend({ /* ... */ });
    //Comment.Router = Backbone.Router.extend({ /* ... */ });

    var QwizbookComments = App.module();

    QwizbookComments.View = Backbone.View.extend({

        template: Template,

        initialize: function () {
        },


        render: function (done) {

            this.el.innerHTML = this.template;
            return this;
        },

        events: {

            "click #cancelComment": "commentDiv",
            "click #qwizbook-comments-form": "addCommentDiv",
            "click #addcomment": "addComment"
        },

        reattachEvents: function () {
            this.undelegateEvents();
            this.delegateEvents(this.events);
        },

        commentDiv: function (e) {
            $('#qwizbook-comments-form').hide();


        },

        addCommentDiv: function (e) {
            $('#qwizbook-comments-form').show();
        },


        addComment: function (e) {

            this.trigger('add-qwizbookcomment-event', {qwizbookContentModel: this.options.qwizbookcontentmodel, addComment: $('#qwizbook-comment-text').val(), qwizbookId: this.options.qwizbookId});
            return false;

        }
    });

    // Required, return the module for AMD compliance
    return QwizbookComments;

});