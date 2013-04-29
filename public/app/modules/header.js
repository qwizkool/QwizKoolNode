/*!
 * Copyright(c) 2013 Vibrentt
 *
 * Module : Header
 *
 *
 */
define([
    "app",
    "modules/user",
    "text!templates/header.html"
], function (App, User, Template) {

    // Create a new module
    var Header = App.module();

    Header.View = Backbone.View.extend({

        el:'#qwizkool-header',

        template:Template,

        initialize:function () {

            // Set the header toolbar upper and lower views
            // that is passed.
            this.htbuView = this.options.htbuView;
            this.htblView = this.options.htblView;

        },

        render:function () {

            this.$el.html(this.template);

            // Render the subviews.
            if (this.htbuView) {
            	$(this.el).find("#qwizkool-htbu").html(this.htbuView.render().el);

            };
            if (this.htblView) {
            	$(this.el).find("#qwizkool-htbl").html(this.htblView.render().el);
            };

            return this;
        },

        remove: function() {
            if (this.htbuView) {
                this.htbuView.remove();

            };
            if (this.htblView) {
                this.htblView.remove();
            };
            return this;
        }


    });

    // Required, return the module for AMD compliance
    return Header;

});
