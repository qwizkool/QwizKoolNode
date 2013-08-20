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
    var     QwizBook = require('modules/qwizbook');
    var    SearchFilter = require('modules/searchFilter');
    var     Template = require('text!templates/qwizkoolHomeContent.html');


    var QwizkoolHomeContent = App.module();

    QwizkoolHomeContent.View = Backbone.View.extend({

        initialize: function () {

            this.qwizbookList = this.collection;

            if (_.isEmpty(this.options.session)) {
                throw "ERROR: Session object is not provided for the view!!"
            }

            this.session = this.options.session;


            // Create and associate the user search filter view with the tool bar lower
            // view in the Header.
            this.searchFilterView = new SearchFilter.View({});
            this.listenTo(this.searchFilterView, "search", this.refreshCollectionForSearchEvent);
            this.listenTo(this.searchFilterView, "filter", this.refreshCollectionForFilterEvent);

            // Create qwizbook collection and associate with its list view.
            this.qwizbookCollection = new QwizBook.Collection();
            this.listenTo(this.qwizbookCollection, "reset", this.refreshCollectionView);
       

        },

        template: Template,

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

                this.qwizbooklistview = new QwizBook.ListView({
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
            //$(this.el).find("#user-main-content-header").html(this.searchFilterView.render().el);

            this.qwizbookCollection.getAllBooks();
            return this;
        }
    });



    module.exports = QwizkoolHomeContent;


});

