/*!
 * Copyright(c) 2013 Vibrentt
 *
 * Module : QwizbookArchiveContent
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
    var Qwizbook = require('modules/qwizbook/qwizbookCollection');
    var ArchivedQwizbook = require('modules/qwizbook/myArchivedQwizbookListView');
    var Template = require("text!templates/qwizbookArchiveContent.html");

    var QwizbookArchiveContent = App.module();

    QwizbookArchiveContent.View = Backbone.View.extend({

        initialize: function () {


            if (_.isEmpty(this.options.session)) {
                throw "ERROR: Session object is not provided for the view!!"
            }
            $(this.el).find("#archiveQwizbookList-container").html('<i class="fa fa-spinner fa-spin">dcd</i>cd');

            this.session = this.options.session;
            var view = this;

            this.qwizbookUserCollection = new Qwizbook.Collection();
            this.qwizbookUserCollection.setArchiveQwizbookMode(this.session);

            this.listenTo(this.qwizbookUserCollection, "no-qwizbook-tolist", this.notFoundView);

            //this.listenTo(this.qwizbookUserCollection, "list-qwizbook-event", this.refreshView);
            this.listenTo(this.qwizbookUserCollection, "reset", this.refreshView);

            this.qwizbooklistview = new ArchivedQwizbook.ListView({
                idAttribute: "_id",
                model: this.qwizbookUserCollection,
                session: this.session
            });

            this.qwizbookUserCollection.getMybooks();

        },

        events: {

            "click .item-un-archive-sel": "qwizbookItemUnArchivePopup",
            "click .unarchive-cancel-btn": "qwizbookItemUnArchiveCancel",
            "click .unarchive-confirm-btn": "qwizbookItemUnArchive"
        },

        qwizbookItemUnArchivePopup: function (e) {
            var id = e.currentTarget.id;
            var view = this;
            if (id) {
                var split_id = id.split("_");
                var qId = split_id[1];
                var qbookModel = view.qwizbookUserCollection.get(qId);
                var title = qbookModel.get('title');
                var message = "";
                message += [
                    ' <p>Do you really want to unarchive ',
                    '<strong>',
                    title,
                    '</strong>',
                    '? </p>'].join('');

                $('#unarchival-confirmation .modal-body').html(message);
                $('#unarchival-confirmation .unarchive-confirm-btn').attr('id', "unarchive-qwizbook_" + qId);
                $('#unarchival-confirmation').modal();
            }
        },

        qwizbookItemUnArchiveCancel: function (e) {
            $('#unarchival-confirmation .modal-body').html("");
            $('#unarchival-confirmation .archive-confirm-btn').attr('id', "");
        },

        qwizbookItemUnArchive: function (e) {
            var id = e.currentTarget.id;
            var view = this;
            if (id) {
                var split_id = id.split("_");
                var qId = split_id[1];
                var qbookModel = view.qwizbookUserCollection.get(qId);
                this.listenTo(qbookModel, "unArchive-qwizbook-success-event", function () {

                    view.qwizbookUserCollection.getMybooks();
                });
                qbookModel.unArchiveMyQwizbook(qId);
                $('#unarchival-confirmation .modal-body').html("");
                $('#unarchival-confirmation .archive-confirm-btn').attr('id', "");
                $('#unarchival-confirmation').modal('hide');
            }
        },

        refreshCollectionForSearchEvent: function (e) {
            var searchparam = e.criteria;
            this.qwizbookUserCollection.setSearchParameter(this.session, searchparam);
            this.qwizbookUserCollection.getAllBooks();
        },


        refreshView: function () {

            $(this.el).find("#archiveQwizbookList-container").html(this.qwizbooklistview.render().el);
        },

        notFoundView: function () {
            $(this.el).find("#archiveQwizbookList-container").html('<p class="lead"><p class="text-warning" style="text-align:center;">You dont have any archived Qwizbooks.</p></p>');
        },

        clear: function () {

            // clear all the subviews.
            this.$el.empty();

            return this;
        },

        template: Template,

        render: function () {
            this.$el.html(this.template);
            return this;
        }
    });

    module.exports = QwizbookArchiveContent;

});

