/*!
 * Copyright(c) 2013 Vibrentt
 *
 * Module : QwizbookArchiveContent
 *
 *
 */
define([
    "app",
    "modules/qwizbook",
    "modules/myArchivedQwizbook",
    "text!templates/qwizbookArchiveContent.html"
], function (App, QwizBook, MyQwizbook, Template) {

    var QwizbookArchiveContent = App.module();

    QwizbookArchiveContent.View = Backbone.View.extend({

        initialize: function () {


            if (_.isEmpty(this.options.session)) {
                throw "ERROR: Session object is not provided for the view!!"
            }
            $(this.el).find("#archiveQwizbookList-container").html('<i class="icon-spinner icon-spin">dcd</i>cd');

            this.session = this.options.session;
            var view = this;

            this.qwizbookUserCollection = new QwizBook.Collection();

            // TODO: cleanup mix of static html in javascripy

            this.listenTo(this.qwizbookUserCollection, "fetch", function () {
                this.html('<i class="icon-spinner icon-spin"></i>');
            }, this);

            this.listenTo(this.qwizbookUserCollection, "no-qwizbook-tolist", this.notFoundView);

            this.listenTo(this.qwizbookUserCollection, "list-qwizbook-event", this.refreshView);

            this.qwizbooklistview = new MyQwizbook.ListMyBook({
                idAttribute: "_id",
                model: this.qwizbookUserCollection,
                session: this.session
            });

        },

        events: {

            "keyup #search-qwizbook": "qwizbook_search",
            "click #my-archived-qwizbooks-content-header #all-items-selector": "toggleSelAllQwizbooks",
            "click .item-un-archive-sel": "qwizbookItemUnArchive",
            "click .item-checked": "qwizbookItemSelect",
            "click #my-archived-qwizbooks-content-header #un-archive-all-btn": "unarchiveAllBooks"

        },

        qwizbookItemUnArchive: function (e) {
            var id = e.currentTarget.id;
            var view = this;
            if (id) {
                var split_id = id.split("_");
                var qId = split_id[1];
                var qbookModel = view.qwizbookUserCollection.get(qId);
                var confirmMsg = confirm('Are you sure you want to unarchive this Qwizbook')
                if (confirmMsg) {

                    this.listenTo(qbookModel, "unArchive-qwizbook-success-event", function () {

                        view.qwizbookUserCollection.getMybook();
                    });

                    qbookModel.unArchiveMyQwizbook(qId);
                }

            }
        },
        qwizbookItemSelect: function () {

            // Check  if any item is selected, if not disable archive all
            // controls.
            if ($('#myArchivedQwizbook-list-container :checkbox:checked').length > 0) {
                this.activateSelAll();
            } else {
                this.deactivateSelAll();
            }

        },

        toggleSelAllQwizbooks: function (e) {

            if ($('a#all-items-selector').button().hasClass('active')) {
                // Currently active , after this it will become in active
                this.deactivateSelAll();

                // de select all qwizbooks
                this.deselectAllQwizbooks();
            } else {
                // Currently inactive,  now it will become active
                this.activateSelAll();

                // Select all qwizbooks
                this.selectAllQwizbooks();
            }

        },

        activateSelAll: function () {
            // Currently inactive,  now it will become active
            if ($('a#all-items-selector i').hasClass('icon-circle-blank')) {

                $('a#all-items-selector i').removeClass('icon-circle-blank')
                $('a#all-items-selector i').addClass('icon-ok-circle')

                // Show the archive all button
                $('a#un-archive-all-btn').button().removeClass('disabled')

            }
        },

        deactivateSelAll: function () {

            if ($('a#all-items-selector i').hasClass('icon-ok-circle')) {
                $('a#all-items-selector i').removeClass('icon-ok-circle')
                $('a#all-items-selector i').addClass('icon-circle-blank')

                // hide archive all button
                $('a#un-archive-all-btn').button().addClass('disabled')
            }
        },
        selectAllQwizbooks: function () {

            $('#myArchivedQwizbook-list-container').find(':checkbox').each(function () {
                $(':checkbox').prop("checked", true);
            });
        },


        deselectAllQwizbooks: function () {

            $('#myArchivedQwizbook-list-container').find(':checkbox').each(function () {
                $(':checkbox').prop("checked", false);
            });

        },
        qwizbook_search: function (e) {
            var searchparam = e.target.value;
            this.qwizbookUserCollection.setSearchParameter(this.session, searchparam);
            this.qwizbookUserCollection.getAllBooks();
        },

        unarchiveAllBooks: function () {

            var currentQwizbook = "";
            var selectedQwizbooks = [];

            var counter = 1;
            var view = this;

            var selectedQbookCount = $('#myArchivedQwizbook-list-container :checkbox:checked').length;

            if (selectedQbookCount) {

                var confirmMsg = confirm('Are you sure you want to Un Archive ' + selectedQbookCount + ' Qwizbooks')
                if (confirmMsg) {

                    $('#myArchivedQwizbook-list-container :checkbox:checked').each(function () {

                        var id = $(this).attr('id');

                        if (id) {

                            var split_id = id.split("_");

                            var currentQwizbookId = split_id[1];

                            var qbookModel = view.qwizbookUserCollection.get(currentQwizbookId);

                            if (counter == selectedQbookCount) {
                                view.listenTo(qbookModel, "unArchive-qwizbook-success-event", function () {
                                    view.qwizbookUserCollection.getMybook();
                                });

                            }

                            qbookModel.unArchiveMyQwizbook(currentQwizbook);
                            counter++;

                        }

                    });

                    view.deselectAllQwizbooks();
                }
            }

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

            this.el.innerHTML = this.template;
            this.qwizbookUserCollection.getArchiveQwizbook(this.session);
            this.qwizbookUserCollection.getMybook();
            return;
        }
    });

    return QwizbookArchiveContent;

});

