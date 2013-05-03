/*!
 * Copyright(c) 2013 Vibrentt
 *
 * Module : AppToolbar
 * Implements the Application tool bar view
 *
 */

define([
    "app",
    "text!templates/appToolbar.html"
], function (App, Template) {

    // Create a new module
    var AppToolbar = App.module();

    AppToolbar.View = Backbone.View.extend({

        template: Template,

        initialize: function () {

            // The Assumption here is the toolbar nav location name is same as the the html ID attribute used
            // for that nav item in the html template. This ID
            this.id = this.options.location;
        },

        render: function () {
           this.$el.html(this.template);
           $(this.el).find('#qwizkool-toolbar li#'+this.id).addClass('active');
           return this;

        },

        events: {
            "click #my-qwizbooks":"myQwizbooks",
            "click #my-qwizbooks-archive":"qwizbookArchive",
            "click #qwizkool-home":"goHome"
        },

        myQwizbooks:function(e) {
            var id = e.currentTarget.id;
            Backbone.history.navigate("#my-qwizbooks", true);
        },

        qwizbookArchive:function(e) {
            Backbone.history.navigate("#my-qwizbooks-archive", true);
        },
        goHome:function(e) {
            Backbone.history.navigate("#qwizkool-home", true);
        }

    });

    return AppToolbar;

});
