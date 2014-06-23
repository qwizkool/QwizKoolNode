/*!
 * Copyright(c) 2013 Vibrentt
 *
 * Module : QwizbookContent
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

    var Qwizbook = require('modules/qwizbook/qwizbookModel');
    var QwizbookDetailView = require('modules/qwizbook/qwizbookDetailView');

    var QwizbookCommentHeader = require('modules/comment/qwizbookCommentHeader');
    var QwizbookComment = require('modules/comment/qwizbookComment');
    var QwizbookCommentCollection = require('modules/comment/qwizbookCommentCollection');
    var QwizbookCommentListView = require('modules/comment/qwizbookCommentListView');

    var Template = require("text!templates/qwizbookContent.html");

    // Create a new module
    var QwizbookContent = App.module();

    QwizbookContent.View = Backbone.View.extend({

        initialize: function () {

            if (_.isEmpty(this.options.session)) {
                throw "ERROR: Session object is not provided for the view!!"
            }

            this.session = this.options.session;

            this.qwizbookId = this.options.qwizbookId;

            // Instantiate and sync the qwizbook
            this.qwizbook = new Qwizbook.Model({_id:this.qwizbookId, session:this.session});
            this.qwizbook.retreive();
            // On success of retrieving the book. get all its comments.
            this.listenTo(this.qwizbook, "retreive-qwizbook-success-event", this.getQwizbookComments);

            // Qwizbook details View
            this.qwizbookDetailView = new QwizbookDetailView.View({model: this.qwizbook, qwizbookId: this.qwizbookId, session:this.session});

            //Collection of comments
            this.commentCollection = new QwizbookCommentCollection.Collection({qwizbookId:this.qwizbookId});
            this.listenTo(this.commentCollection, "reset", this.updateView);

            // comment List view
            this.commentListView = new QwizbookCommentListView.ListView({model: this.commentCollection});

            // Add comment form view
            this.commentHeaderView = new QwizbookCommentHeader.View({qwizbookcontentmodel: this.qwizbook, qwizbookId: this.qwizbookId});
            this.listenTo(this.commentHeaderView, "add-qwizbookcomment-event", this.processCommentAdd);


        },


        getQwizbookComments:function () {
            this.commentCollection.getAll(this.qwizbookId);
        },


        updateView:function () {
            this.commentListView = new QwizbookCommentListView.ListView({model: this.commentCollection});
            this.render();
        },

        processCommentAdd: function(e) {


            var comment = new QwizbookComment.Model();
            var newComment = e.addComment;
            var qbookId = e.qwizbookId;
            var view = this;

            if (newComment != '') {

                // Add the comment
                comment.add(newComment, qbookId);

                // After successful add of the refresh the comment collection
                // to trigger view updates.
                // TODO: can't we add the item to local connection.
                this.listenTo(comment, "add-qwizbookcomment-success-event", function () {
                    view.commentCollection.getAll(qbookId);
                });
            }

        },

        template: Template,

        render: function () {
            this.el.innerHTML = this.template;
            $(this.el).find("#qwizbook-detail-content-container").append(this.qwizbookDetailView.render().el);
            $(this.el).find("#qwizbook-comment-header-container").append(this.commentHeaderView.render().el);
            $(this.el).find("#qwizbook-comment-list-container").append(this.commentListView.render().el);
            $('input.rating').rating();
            return this;

        }
    });

    // Required, return the module for AMD compliance
    module.exports = QwizbookContent;

});


