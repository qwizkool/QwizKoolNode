/*!
 * Copyright(c) 2013 Vibrentt
 *
 * Module : QwizkoolHomeContent
 *
 *
 */
define(function (require, exports, module) {


    /**
     * Module dependencies.
     */
    var App = require('app');
    var    Backbone = require('backbone');
    var     _ = require('underscore');
    var     $ = require('jquery');
    var     BootstrapRating = require('bootstrapRating');
    var     QwizBookListView = require('modules/qwizbook/qwizbookListView');
    var     QwizBookCollection = require('modules/qwizbook/qwizbookCollection');
    var     QwizBookModel = require('modules/qwizbook/qwizbookModel');
    var     Template = require('text!templates/qwizkoolHomeContent.html');


    var QwizkoolHomeContent = App.module();

    QwizkoolHomeContent.View = Backbone.View.extend({

        initialize: function () {

            if (_.isEmpty(this.options.session)) {
                throw "ERROR: Session object is not provided for the view!!"
            }

            this.session = this.options.session;

            // Create qwizbook collection and associate with its list view.
            this.qwizbookCollection = new QwizBookCollection.Collection();
            this.listenTo(this.qwizbookCollection, "reset", this.refreshCollectionView);

        },

        template: Template,

        events:{
            "click #sort-recently-updated":"setfilterParams",
            "click #sort-most-popular":"setfilterParams",
            "click #my-qwizbooks":"goToMyQwizbooks",
            "click #create-qwizbook-modal-btn":"openQwizbookCreateForm",
            "click .close-qwizbook-modal-btn":"closeQwizbookCreateForm",
            "click #create-qwizbook-modal-form-btn":"createQwizbook"
        },

        closeQwizbookCreateForm:function(e) {

            $('#qwizbook-title').val('');
            $('#qwizbook-sub-title').val('');
            $('#qwizbook-description').val('');
            Backbone.history.navigate("#qwizkool-home", true);
        },

        openQwizbookCreateForm:function(e) {
            $('#create-qwizbook-modal').modal();
        },

        createQwizbook:function(e) {


            if ($('#qwizbook-title').val()) {

                var qwizbookmodel = new QwizBookModel.Model();
                var qbooktitle = $('#qwizbook-title').val();
                var qbooksubtitle = $('#qwizbook-sub-title').val();
                var qbookdesc = $('#qwizbook-description').val();
                var view = this;
                qwizbookmodel.create(qbooktitle, qbookdesc);

                $('#create-qwizbook-modal').modal("toggle");
                $('#qwizbook-title').val('');
                $('#qwizbook-sub-title').val('');
                $('#qwizbook-description').val('');
                this.goToMyQwizbooks();


            } else {
                $("#title-status").addClass('alert-error');
                $("#title-status").html('Please enter a Title');
                $("#title-status").show();
            }

        },


        goToMyQwizbooks:function() {
            Backbone.history.navigate("#my-qwizbooks", true);
        },

        setfilterParams: function (e) {

            $('#sort-selection-input').val(e.currentTarget.name);
            var filterCriteria = e.currentTarget.name;
            console.log(filterCriteria);
            this.refreshCollectionForFilterEvent({criteria: filterCriteria});

        },

        refreshCollectionForSearchEvent: function (e) {

            var criteria = e.criteria;

            this.qwizbookCollection.setSearchParams(criteria);

            this.qwizbookCollection.getAllBooks();

        },

        refreshCollectionForFilterEvent: function (e) {

            var criteria = e.criteria;
            this.qwizbookCollection.setFilterParams(criteria);
            this.qwizbookCollection.getAllBooks();

        },

        refreshCollectionView: function () {

            if (_.isEmpty(this.qwizbooklistview)) {

                this.qwizbooklistview = new QwizBookListView.ListView({
                    el: '#qwizkool-home-content-container',
                    model: this.qwizbookCollection,
                    session: this.session
                });
            }

            this.qwizbooklistview.render();

            $('input.rating').rating();

        },

        render: function () {
            this.$el.html(this.template);
            this.qwizbookCollection.getAllBooks();
            return this;
        }
    });

    module.exports = QwizkoolHomeContent;

});

