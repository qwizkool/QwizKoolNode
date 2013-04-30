/*!
 * Copyright(c) 2013 Vibrentt
 *
 * Module : Searchfilter
 *
 *
 */

define([
    "app",
    "bootstrap_select",
    "text!templates/searchFilter.html"
], function (App, BootstrapSelect, Template) {

    // Create a new module
    var Searchfilter = App.module();

    Searchfilter.View = Backbone.View.extend({

        template: Template,

        initialize: function () {
            this.startPage = 1;
            this.pageSizeInItems = 10;
            this.maxItems = 5000;
        },

        render: function () {

            var data = {startPage: this.startPage, pageSizeInItems: this.pageSizeInItems, maxItems: this.maxItems};

            this.$el.html(_.template(this.template, data));
            $(this.el).find('.filter-selection').selectpicker();
            return this;

        },


        events: {
            "keyup #user-search-input": "setsearchParams",
            "change .filter-selection": "setfilterParams"
        },

        setPaginationParamaters: function (startPage, pageSizeInItems, maxItems) {


        },

        reattachEvents: function () {
            this.undelegateEvents();
            this.delegateEvents(this.events);
        },

        setsearchParams: function () {
            this.trigger('search', {criteria: $('#user-search-input').val()});
        },

        setfilterParams: function () {

            var filterCriteria = $(this.el).find('.filter-selection').val();
            console.log(filterCriteria);
            this.trigger('filter', {criteria: filterCriteria});

        }
    });

    return Searchfilter;

});
