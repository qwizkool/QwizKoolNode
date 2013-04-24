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
            "click #create-qwizbook":"authorQwizbook"
        },

        authorQwizbook:function(e) {
            Backbone.history.navigate("#createQwizbook", true);

        }

    });

    return AppToolbar;

});
