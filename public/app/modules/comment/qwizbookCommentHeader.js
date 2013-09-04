/*!
 * Copyright(c) 2013 Vibrentt
 *
 * Module : QwizbookCommentHeader
 *
 *
 */
define(function (require, exports, module) {

    /**
     * Module dependencies.
     */
    var App = require('app');
    var Backbone = require('backbone');
    var _ = require('underscore');
    var $ = require('jquery');
    var Template = require("text!modules/comment/templates/qwizbookCommentHeader.html");

    var CommentHeader = App.module();

    CommentHeader.View = Backbone.View.extend({

        template: Template,

        initialize: function () {
        },

        render: function (done) {
            this.el.innerHTML = this.template;
            return this;
        },

        events: {

            "click #add-comment": "addComment",
            "keyup #qwizbook-comment-text": "checkCommentSize"
        },

        reattachEvents: function () {
            this.undelegateEvents();
            this.delegateEvents(this.events);
        },

        addComment: function (e) {

            this.trigger('add-qwizbookcomment-event', {addComment: $('#qwizbook-comment-text').val(), qwizbookId: this.options.qwizbookId});
            return false;

        },

        checkCommentSize: function (e) {

            var userComment = $('#qwizbook-comment-text').val();
            var userCommentLength = userComment.length;
            var newComment = "";

            if (userCommentLength > 0 && userCommentLength > App.appConfig.MAX_COMMENT_SIZE_IN_CHARS) {
                //alert("123");

                //$('#user-reg-email-input').
                newComment = userComment.substring(0, App.appConfig.MAX_COMMENT_SIZE_IN_CHARS);
                $('#qwizbook-comment-text').val(newComment);

            }

        }

    });

    // Required, return the module for AMD compliance
    module.exports = CommentHeader;

});