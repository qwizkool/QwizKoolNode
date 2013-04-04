/*!
 * Copyright(c) 2013 Vibrentt
 *
 * Module : UserMainContent
 *
 *
 */

define([
    "app",
    "modules/qwizbook",
    "modules/searchFilter",
    "text!templates/userMainContent.html"

], function (App, QwizBook, SearchFilter, Template) {

    var UserMainContent = App.module();

    UserMainContent.View = Backbone.View.extend({

        initialize: function () {

            this.qwizbookList = this.collection;
            

            if (_.isEmpty(this.options.session)) {
                throw "ERROR: Session object is not provided for the view!!"
            }

            this.session = this.options.session;


            // Create and associate the user search filter view with the tool bar lower
            // view in the Header.
            this.searchFilterView = new SearchFilter.View({});
            this.searchFilterView.on("search", this.refreshCollectionForSearchEvent, this);
            this.searchFilterView.on("filter", this.refreshCollectionForFilterEvent, this);

            // Create qwizbook collection and associate with its list view.
            this.qwizbookCollection = new QwizBook.Collection();
            this.qwizbookCollection.on("reset", this.refreshCollectionView, this);

       

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
                    el: '#user-main-content-container',
                    model: this.qwizbookCollection,
                    session: this.session
                });
            }

            this.qwizbooklistview.render();

        },

        clear: function () {

            // clear all the subviews.
            this.$el.empty();

            return this;
        },

        render: function () {

            this.el.innerHTML = this.template;
            $(this.el).find("#user-main-content-header").html(this.searchFilterView.render().el);

            this.qwizbookCollection.getAllBooks();
            return this;
        }
    });

    return UserMainContent;

});
