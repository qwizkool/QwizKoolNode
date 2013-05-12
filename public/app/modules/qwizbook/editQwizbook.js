/*!
 * Copyright(c) 2013 Vibrentt
 *
 * Module : QwizbookDetails
 *
 *
 */
define([
    "app",
    "modules/qwizbook/qwizbookView",
    "text!templates/editQwizbook.html"
],
    function (App, QwizBook,  Template) {
        // Create a new module
        var EditQwizbook = App.module();

        EditQwizbook.View = Backbone.View.extend({

            initialize: function () {

             

            },

            template: Template,

            render: function (done) {

                var view = this;
                var qbook_itemdetail_template;
                qbook_itemdetail_template = _.template(this.template, this.model.toJSON());
                view.el.innerHTML = qbook_itemdetail_template;
                $(view.el).find("#qwizbook-create-form").append(view.el.innerHTML);
                return this;

            }

        });

        return EditQwizbook;

    });