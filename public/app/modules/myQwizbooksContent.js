/*!
 * Copyright(c) 2013 Vibrentt
 *
 * Module : myQwizbooksContent
 * Container that holds the my qwizbooks content inside a page.
 *
 */
define(["app",
    "modules/qwizbook",
    "modules/myQwizbook",
    "text!templates/myQwizbooksContent.html"], function (App, QwizBook, MyQwizbook, Template) {

    var MyQwizbooksContent = App.module();

    MyQwizbooksContent.View = Backbone.View.extend({

        initialize: function () {

            if (_.isEmpty(this.options.session)) {
                throw "ERROR: Session object is not provided for the view!!"
            }

            this.session = this.options.session;
            var view = this;


            this.qwizbookUserCollection = new QwizBook.Collection();
            this.listenTo(this.qwizbookUserCollection, "reset", this.refreshView);
            this.qwizbooklistview = new MyQwizbook.ListMyBook({
                model: this.qwizbookUserCollection,
                session: this.session
            });


        },

        events: {

            "click #all-items-selector": "toggleSelAllQwizbooks",
            "click #create-form-btn": "showCreateForm",
            "click .item-archive-sel": "qwizbookItemArchive",
            "click .item-pub-sel": "qwizbookItemPublish",
            "click .item-checked": "qwizbookItemSelect",
            "click #archive-all-btn": "archiveAllBooks",

            "keyup #search-qwizbook": "qwizbook_search",
            "keyup #qwizbook-title": "checkQwizbookTitleLength",
            "keyup #qwizbook-description": "checkQwizbookDescriptionLength"


        },

        qwizbookItemArchive: function (e) {
            var id = e.currentTarget.id;
            var view = this;
            if (id) {
                var split_id = id.split("_");
                var qId = split_id[1];
                var qbookModel = view.qwizbookUserCollection.get(qId);
                var confirmMsg = confirm('Are you sure you want to delete this Qwizbook')
                if (confirmMsg) {

                    this.listenTo(qbookModel, "delete-qwizbook-success-event", function () {

                        view.qwizbookUserCollection.getMybook();
                    });

                    qbookModel.deleteMyQwizbook(qId);
                }

            }
        },

        qwizbookItemPublish: function (e) {

            var id = e.currentTarget.id;
            var view = this;
            if (id) {
                var split_id = id.split("_");
                var qId = split_id[1];
                var qbookModel = view.qwizbookUserCollection.get(qId);

                var published = $('#published_' + qId).val();

                this.listenTo(qbookModel, "publishOrunpublish-qwizbook-success-event", function () {

                    view.qwizbookUserCollection.getMybook();
                });

                qbookModel.publishOrunpublishQwizbook(qId, (published === "true") ? false : true);

            }
        },
        qwizbookItemSelect: function () {

            // Check  if any item is selected, if not disable archive all
            // controls.
            if ($('#myQwizbookList-container :checkbox:checked').length > 0) {
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
                $('a#archive-all-btn').button().removeClass('disabled')

            }
        },

        deactivateSelAll: function () {

            if ($('a#all-items-selector i').hasClass('icon-ok-circle')) {
                $('a#all-items-selector i').removeClass('icon-ok-circle')
                $('a#all-items-selector i').addClass('icon-circle-blank')

                // hide archive all button
                $('a#archive-all-btn').button().addClass('disabled')
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

        qwizbook_search: function (e) {
            var searchparam = e.target.value;
            this.qwizbookUserCollection.setSearchParameter(this.session, searchparam);
            this.qwizbookUserCollection.getMybook();
        },

        authorQwizbook: function (e) {
            var id = $("input[id^='myqbook_']").val();
            Backbone.history.navigate("#authorQwizbook/" + id, true);
        },

        showCreateForm: function (e) {

            $("#title-status").hide();
            $('#qwizbook-create-form').show();
            $('#myBook-no-result-found').hide();

        },

        submitCreateForm: function (e) {

            if ($('#qwizbook-title').val()) {

                var qwizbookmodel = new QwizBook.Model();
                var qbooktitle = $('#qwizbook-title').val();
                var qbookdesc = $('#qwizbook-description').val();
                var view = this;
                qwizbookmodel.create(qbooktitle, qbookdesc);
                this.listenTo(qwizbookmodel, "qwizbook-create-success-event", function () {
                    //view.qwizbookUserCollection.setUserId();
                    view.qwizbookUserCollection.getMybook();

                });
                $('#qwizbook-create-form').hide();
                $('#qwizbook-title').val('');
                $('#qwizbook-description').val('');
            } else {
                $("#title-status").addClass('alert-error');
                $("#title-status").html('Please enter a Title');
                $("#title-status").show();
            }

        },

        cancelCreateForm: function (e) {

            $("#title-status").hide();
            $('#qwizbook-create-form').hide();

            $('#qwizbook-title').val('');
            $('#qwizbook-description').val('');

            if (this.qwizbookUserCollection.length == 0) {
                $('#myBook-no-result-found').show();
            }


        },

        selectAllQwizbooks: function () {

            $('#myQwizbook-list-container').find(':checkbox').each(function () {
                $(':checkbox').prop("checked", true);
            });
        },


        deselectAllQwizbooks: function () {

            $('#myQwizbook-list-container').find(':checkbox').each(function () {
                $(':checkbox').prop("checked", false);
            });

        },


        archiveAllBooks: function () {

            var currentQwizbook = "";
            var selectedQwizbooks = [];

            var counter = 1;
            var that = this;

            $('#myQwizbook-list-container input:checked').each(function () {

                selectedQwizbooks.push($(this).attr('value'));

            });

            var selectedQbookCount = $('#myQwizbookList-container :checkbox:checked').length;

            if (selectedQbookCount) {

                var confirmMsg = confirm('Are you sure you want to delete ' + selectedQbookCount + ' Qwizbook')
                if (confirmMsg) {

                    $('#myQwizbook-list-container input:checked').each(function () {

                        var currentQwizbookId = $(this).attr('value');
                        var qbookModel = that.qwizbookUserCollection.get(currentQwizbookId);
                        if (counter == selectedQbookCount) {

                            this.listenTo(qbookModel, "delete-qwizbook-success-event", function () {
                                view.qwizbookUserCollection.getMybook();
                            });

                        }
                        qbookModel.deleteMyQwizbook(currentQwizbook);
                        counter++;
                    });


                    $('#myQwizbook-list-container').find(':checkbox').each(function () {
                        $(':checkbox').prop("checked", false);
                    });
                }
                this.undelegateEvents();
                this.delegateEvents(this.events);
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
            this.qwizbookUserCollection.setUserId(this.session);
            this.qwizbookUserCollection.getMybook();

            return this;
        }
    });

    return MyQwizbooksContent;

});

