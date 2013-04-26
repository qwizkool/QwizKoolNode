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
        },

        render: function () {

            this.$el.html(this.template);
            $(this.el).find('.filter-selection').selectpicker();
           return this;

        },

        events: {
            "keyup #user-search-input": "setsearchParams",
            "change .filter-selection": "setfilterParams"
        },

        reattachEvents: function () {
            this.undelegateEvents();
            this.delegateEvents(this.events);
        },

        setsearchParams: function () {
            this.trigger('search', {criteria: $('#user-search-input').val()});
        },

        setfilterParams: function () {

            var filterCriteria =  $(this.el).find('.filter-selection').val();
            console.log(filterCriteria);
           this.trigger('filter', {criteria: filterCriteria});

        }
    });

    return Searchfilter;

});
