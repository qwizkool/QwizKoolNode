/*!
 * Copyright(c) 2013 Vibrentt
 *
 * Module : Searchfilter
 *
 *
 */

define([
    "app",
    "text!templates/searchFilter.html"
], function (App, Template) {

    // Create a new module
    var Searchfilter = App.module();

    Searchfilter.View = Backbone.View.extend({

        template: Template,

        initialize: function () {
        },

        render: function () {

            this.el.innerHTML = this.template;
            return this;

        },

        events: {
            "keyup #user-search-input": "setsearchParams",
            "change #user-filter-input": "setfilterParams"
        },

        reattachEvents: function () {
            this.undelegateEvents();
            this.delegateEvents(this.events);
        },

        setsearchParams: function () {
            this.trigger('search', {criteria: $('#user-search-input').val()});
        },

        setfilterParams: function () {
            this.trigger('filter', {criteria: $('#user-filter-input option:selected').text()});

        }
    });

    return Searchfilter;

});
