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
        },

        render: function () {
            this.$el.html(this.template);
            return this;

        },

        events: {
            "click #my-qwizbooks":"myQwizbooks",
            "click #qwizbook-archive":"qwizbookArchive"
        },

        myQwizbooks:function(e) {
            Backbone.history.navigate("#myQwizbooks", true);

        },
        qwizbookArchive:function(e) {
            Backbone.history.navigate("#qwizbookArchives", true);

        }

    });

    return AppToolbar;

});


archiveQwizbook