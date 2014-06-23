/*!
 * Copyright(c) 2013 Vibrentt
 *
 * Module : myQwizbooksContent
 * Container that holds the my qwizbooks content inside a page.
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
    var QwizbookCollection = require('modules/qwizbook/qwizbookCollection');
    var MyQwizbook = require('modules/qwizbook/myQwizbookListView');
    var Template = require("text!templates/myQwizbooksContent.html");


    var MyQwizbooksContent = App.module();

    MyQwizbooksContent.View = Backbone.View.extend({

        initialize: function () {

            if (_.isEmpty(this.options.session)) {
                throw "ERROR: Session object is not provided for the view!!"
            }

            this.session = this.options.session;
            var view = this;


            this.myQwizbookCollection = new QwizbookCollection.Collection();
            this.myQwizbookCollection.setMyQwizbookMode(this.session);

            this.listenTo(this.myQwizbookCollection, "reset", this.refreshView);

            this.qwizbooklistview = new MyQwizbook.ListView({
                model: this.myQwizbookCollection,
                session: this.session
            });

            this.myQwizbookCollection.getMybooks();

        },

        events: {

            "click .item-archive-sel": "qwizbookItemArchivePopup",
            "click .archive-cancel-btn": "qwizbookItemArchiveCancel",
            "click .archive-confirm-btn": "qwizbookItemArchive",
            "click .item-pub-sel": "qwizbookItemPublish",
            "click .item-edit-sel": "qwizbookItemEdit",

            "keyup #search-qwizbook": "qwizbook_search",
            "keyup #qwizbook-title": "checkQwizbookTitleLength",
            "keyup #qwizbook-description": "checkQwizbookDescriptionLength",

            "click .create-qwizbook-modal-btn": "openQwizbookCreateForm",
            "click .close-qwizbook-modal-btn": "closeQwizbookCreateForm",
            "click #create-qwizbook-modal-form-btn": "createQwizbook"
        },

        closeQwizbookCreateForm: function (e) {

            $('#qwizbook-title').val('');
            $('#qwizbook-sub-title').val('');
            $('#qwizbook-description').val('');
        },

        openQwizbookCreateForm: function (e) {
            $('#create-qwizbook-modal').modal();
        },

        createQwizbook: function (e) {


            if ($('#qwizbook-title').val()) {

                var qwizbookmodel = new Qwizbook.Model();
                var qbooktitle = $('#qwizbook-title').val();
                var qbooksubtitle = $('#qwizbook-sub-title').val();
                var qbookdesc = $('#qwizbook-description').val();
                var view = this;
                qwizbookmodel.create(qbooktitle, qbooksubtitle, qbookdesc);
                this.listenTo(qwizbookmodel, "qwizbook-create-success-event", function () {
                    view.myQwizbookCollection.getMybooks();
                });
                $('#create-qwizbook-modal').modal('hide');
                $('#qwizbook-title').val('');
                $('#qwizbook-sub-title').val('');
                $('#qwizbook-description').val('');


            } else {
                $("#title-status").addClass('alert-error');
                $("#title-status").html('Please enter a Title');
                $("#title-status").show();
            }

        },
        qwizbookItemArchivePopup: function (e) {
            var id = e.currentTarget.id;
            var view = this;
            if (id) {
                var split_id = id.split("_");
                var qId = split_id[1];
                var qbookModel = view.myQwizbookCollection.get(qId);
                var title = qbookModel.get('title');
                var message = "";
                message += [
                    ' <p>Do you really want to archive ',
                    '<strong>',
                    title,
                    '</strong>',
                    '? </p>'].join('');

                $('#archival-confirmation .modal-body').html(message);
                $('#archival-confirmation .archive-confirm-btn').attr('id', "archive-qwizbook_" + qId);
                $('#archival-confirmation').modal();
            }
        },
        qwizbookItemArchiveCancel: function (e) {
            $('#archival-confirmation .modal-body').html("");
            $('#archival-confirmation .archive-confirm-btn').attr('id', "");
        },
        qwizbookItemArchive: function (e) {
            var id = e.currentTarget.id;
            var view = this;
            if (id) {
                var split_id = id.split("_");
                var qId = split_id[1];
                var qbookModel = view.myQwizbookCollection.get(qId);
                this.listenTo(qbookModel, "delete-qwizbook-success-event", function () {
                    view.myQwizbookCollection.getMybooks();
                });
                qbookModel.deleteMyQwizbook(qId);
                $('#archival-confirmation .modal-body').html("");
                $('#archival-confirmation .archive-confirm-btn').attr('id', "");
                $('#archival-confirmation').modal('hide');
            }
        },

        qwizbookItemPublish: function (e) {

            var id = e.currentTarget.id;
            var view = this;
            if (id) {
                var split_id = id.split("_");
                var qId = split_id[1];
                var qbookModel = view.myQwizbookCollection.get(qId);

                var published = $('#published_' + qId).val();

                this.listenTo(qbookModel, "publishOrunpublish-qwizbook-success-event", function () {

                    view.myQwizbookCollection.getMybooks();
                });

                qbookModel.publishOrunpublishQwizbook(qId, (published === "true") ? false : true);

            }
        },


        checkQwizbookTitleLength: function (e) {

            var qwizbookTitle = $('#qwizbook-title').val();
            var qwizbookTitleLength = qwizbookTitle.length;
            var newQwizbookTitle = "";

            if (qwizbookTitleLength > 0 && qwizbookTitleLength > App.appConfig.MAX_QWIZBOOK_TITLE_SIZE_IN_CHARS) {
                //alert("123");

                //$('#user-reg-email-input').
                newQwizbookTitle = qwizbookTitle.substring(0, App.appConfig.MAX_QWIZBOOK_TITLE_SIZE_IN_CHARS);
                $('#qwizbook-title').val(newQwizbookTitle);

            }

        },

        checkQwizbookDescriptionLength: function (e) {

            var qwizbookDescription = $('#qwizbook-description').val();
            var qwizbookDescriptionLength = qwizbookDescription.length;
            var newQwizbookDescription = "";


            if (qwizbookDescriptionLength > 0 && qwizbookDescriptionLength > App.appConfig.MAX_QWIZBOOK_DESCRIPTION_SIZE_IN_CHARS) {

                newQwizbookDescription = qwizbookDescription.substring(0, App.appConfig.MAX_QWIZBOOK_DESCRIPTION_SIZE_IN_CHARS);
                $('#qwizbook-description').val(newQwizbookDescription);

            }


        },

        refreshCollectionForSearchEvent: function (e) {
            var searchparam = e.criteria;
            this.myQwizbookCollection.setSearchParameter(this.session, searchparam);
            this.myQwizbookCollection.getMybooks();
        },

        qwizbookItemEdit: function (e) {
            var id = e.currentTarget.id;
            var view = this;
            if (id) {
                var split_id = id.split("_");
                var qId = split_id[1];

                Backbone.history.navigate("#authorQwizbook/" + qId, true);
            }
        },

        refreshView: function () {

            $(this.el).find("#myQwizbookList-container").html(this.qwizbooklistview.render().el);

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

    return MyQwizbooksContent;

});

