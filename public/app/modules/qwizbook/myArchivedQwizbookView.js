/*!
 * Copyright(c) 2013 Vibrentt
 *
 * Module : MyArchivedQwizbook
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
    var TmplQwizbookItem = require("text!modules/qwizbook/templates/myArchivedQwizbookListItem.html");

    // Create a new module
    var MyArchivedQwizbook = App.module();

    MyArchivedQwizbook.View = Backbone.View.extend({

        template: TmplQwizbookItem,

        initialize: function () {

            if (_.isEmpty(this.options.session)) {
                throw "ERROR: Session object is not provided for the view!!"
            }

            this.session = this.options.session;

        },

        render: function (done) {

            var view = this;

            view.el.innerHTML = _.template(this.template, view.model.toJSON());
            id = view.model.id;
            var getPublishOrunpublish = $(view.el).find("#published_" + id).val();
            if (getPublishOrunpublish == 'true') {
                $(view.el).find("#qwizbookPublishOrUnpublish_" + id + ' span').html("Unpublish");
                $(view.el).find("#qwizbookPublishOrUnpublish_" + id + ' i').addClass('fa-muted');
                $(view.el).find("#qwizbook-publish-status_" + id + ' i').removeClass('hidden');


            }
            else {
                $(view.el).find("#qwizbookPublishOrUnpublish_" + id + ' span').html("Publish");
                $(view.el).find("#qwizbookPublishOrUnpublish_" + id + ' i').removeClass('fa-muted');
                $(view.el).find("#qwizbook-publish-status_" + id + ' i').addClass('hidden');
            }
            return this;
        }
    });


    module.exports = MyArchivedQwizbook;

});