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
    "modules/breadcrumbs",
    "text!templates/userMainContent.html"

], function (App, QwizBook, Breadcrumbs, Template) {

    var UserMainContent = App.module();

    UserMainContent.View = Backbone.View.extend({

        initialize: function () {

            this.qwizbookList = this.collection;

            if (_.isEmpty(this.options.session)) {
                throw "ERROR: Session object is not provided for the view!!"
            }

            this.session = this.options.session;

            this.qwizbooklistview = new QwizBook.ListView({
                model: this.qwizbookList,
                session: this.session
            });


        },

        template: Template,

        clear: function () {

            // clear all the subviews.
            this.$el.empty();

            return this;
        },

        render: function () {

            this.el.innerHTML = this.template;
            $(this.el).find("#qwizbooklist-container").html(this.qwizbooklistview.render().el);

            return this;
        }
    });

    return UserMainContent;

});
