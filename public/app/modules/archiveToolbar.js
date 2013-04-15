/*!
 * Copyright(c) 2013 Vibrentt
 *
 * Module : AppToolbar
 * Implements the Application tool bar view
 *
 */

define([
    "app",
    "text!templates/archiveToolbar.html"
], function (App, Template) {

    // Create a new module
    var ArchiveToolbar = App.module();

    ArchiveToolbar.View = Backbone.View.extend({

        template: Template,

        initialize: function () {
        },

        render: function () {

            this.el.innerHTML = this.template;
            return this;

        },

        events: {
            "click #archive-qwizbook":"archiveQwizbook"
        },

        reattachEvents: function () {
            this.undelegateEvents();
            this.delegateEvents(this.events);
        },

        archiveQwizbook:function(e) {
            Backbone.history.navigate("#archiveQwizbook", true);

        }

    });

    return ArchiveToolbar;

});
