/*!
 * Copyright(c) 2013 Vibrentt
 *
 * Module : Comments
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
    var TemplateList = require("text!modules/comment/templates/qwizbookCommentListView.html");
    var CommentView = require('modules/comment/qwizbookCommentView');

    // Create a new module
    var Comment = App.module();

    Comment.ListView = Backbone.View.extend({

        template: TemplateList,

        initialize: function () {

        },

        render: function (done) {

            var view = this;
            var qbookcomment_list_template;
            //alert("hello");
            qbookcomment_list_template = this.template;

            view.el.innerHTML = qbookcomment_list_template;

            $(view.el).find("#comment-list-container").empty();

            _.each(view.model.models, function (comment) {

                var commentView = new CommentView.View({
                    model: comment
                });

                $(view.el).find("#comment-list-container").append(commentView.render().el);


            });

            return this;
        }
    });

    module.exports = Comment;

});
