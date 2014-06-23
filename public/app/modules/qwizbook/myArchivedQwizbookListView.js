/*!
 * Copyright(c) 2013 Vibrentt
 *
 * Module : MyArchivedQwizbookListView
 *
 *
 */
define(function (require, exports, module) {

    /**
     * Module dependencies.
     */
    var App = require('app');
    var Backbone = require('backbone');
    var _ = require('underscore');
    var $ = require('jquery');
    var MyArchivedQwizBookView = require("modules/qwizbook/myArchivedQwizbookView");
    var TmplQwizbookList = require("text!modules/qwizbook/templates/myArchivedQwizbookList.html");

    // Create a new module
    var MyArchivedQwizbook = App.module();

    MyArchivedQwizbook.ListView = Backbone.View.extend({

        template: TmplQwizbookList,

        initialize: function () {

            if (_.isEmpty(this.options.session)) {
                throw "ERROR: Session object is not provided for the view!!"
            }

            this.session = this.options.session;
        },

        render: function () {

            var view = this;
            var qbook_list_template;

            qbook_list_template = this.template;

            view.el.innerHTML = qbook_list_template;

            $(view.el).find("#myQwizbook-list-container").empty();

            // If we have items to list , update the list view.
            // else show nothing to display view.
            if (view.model.models.length) {

                _.each(view.model.models, function (qwizbook) {
                    var qwizbookView = new MyArchivedQwizBookView.View({
                        model: qwizbook,
                        session: view.session
                    });

                    $(view.el).find("#myArchivedQwizbook-list-container").append(qwizbookView.render().el);
                })
            } else {
                $(view.el).find("#myArchivedBook-no-result-found").show();
            }

            return this;

        }

    });

    module.exports = MyArchivedQwizbook;

});