define([
    "app",
    "modules/comments",
    "modules/user",
    "modules/qwizbookComments",
    "text!templates/qwizbookComments.html"
], function (App, Comments, User, QwizbookComments, Template) {

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

            this.trigger('add-qwizbookcomment-event', {addComment: $('#qwizbook-comment-text').val(), qwizbookId: this.options.qwizbookId});
            return false;

        }
    });

    // Required, return the module for AMD compliance
    return QwizbookComments;

});