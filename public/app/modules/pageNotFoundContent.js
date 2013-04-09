/*!
 * Copyright(c) 2013 Vibrentt
 *
 * Module : pageNotFoundContent
 * pageNotFoundContent renders page not found specific content.
 *
 */
define([
    "app",
    "text!templates/pageNotFoundContent.html"

], function (App, Template) {

    var PageNotFoundContent = App.module();

    PageNotFoundContent.View = Backbone.View.extend({

        initialize:function () {



        },

        template:Template,

        clear:function () {

            // clear all the subviews.
            this.$el.empty();

            return this;
        },

        render:function () {

            this.el.innerHTML = this.template;

            return this;
        }
    });

    return PageNotFoundContent;

});
