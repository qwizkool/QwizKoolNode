/*!
 * Copyright(c) 2013 Vibrentt
 *
 * Module : QwizbookContent
 *
 *
 */
define([
    "app",
    "modules/qwizbook",
    "modules/qwizbookBreadcrumbs",
    "modules/qwizbookDetails",
    "modules/qwizbookComments",
    "modules/comments",
    "text!templates/qwizbookContent.html"

], function (App, Qwizbook, Breadcrumb, QwizbookDetails, QwizbookComments, Comments, Template) {

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
            this.qwizbook.on("retreive-qwizbook-success-event", this.getQwizbookComments, this);

            //Collection of comments
            this.commentCollection = new Comments.Collection({qwizbookId:this.qwizbookId});
            this.commentCollection.on("reset", this.updateView, this);

            // comment List view
            this.commentListView = new Comments.ListView({model: this.commentCollection});

            // Qwizbook details View
            this.qwizbookDetails = new QwizbookDetails.View({model: this.qwizbook, qwizbookId: this.qwizbookId, session:this.session});

            // Add comment form view
            this.addCommentView = new QwizbookComments.View({qwizbookcontentmodel: this.qwizbook, qwizbookId: this.qwizbookId});
            this.addCommentView.on("add-qwizbookcomment-event", this.processCommentAdd, this);


        },


        getQwizbookComments:function () {

            this.commentCollection.getAll(this.qwizbookId);

        },


        updateView:function () {
            this.commentListView = new Comments.ListView({model: this.commentCollection});
            this.render();
        },

        processCommentAdd: function(e) {


            var comment = new Comments.Model();
            var newComment = e.addComment;
            var qbookId = e.qwizbookId;
            var view = this;

            if (newComment != '') {

                // Add the comment
                comment.add(newComment, qbookId);

                // After successful add of the refresh the comment collection
                // to trigger view updates.
                // TODO: can't we add the item to local connection.
                comment.on("add-qwizbookcomment-success-event", function () {

                    view.commentCollection.getAll(qbookId);

                });

            }

        },

        template: Template,

        render: function () {
            this.el.innerHTML = this.template;
            $(this.el).find("#qwizbook-content-container").append(this.qwizbookDetails.render().el);
            $(this.el).find("#review-content-header").append(this.addCommentView.render().el);
            $(this.el).find("#review-content-container").append(this.commentListView.render().el);

            return this;

        }
    });

    // Required, return the module for AMD compliance
    return QwizbookContent;

});


