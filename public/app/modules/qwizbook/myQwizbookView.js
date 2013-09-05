/*!
 * Copyright(c) 2013 Vibrentt
 *
 * Module : myQwizbookView
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
    var TmplQwizbookItem = require("text!modules/qwizbook/templates/myQwizbookListItem.html");

    // Create a new module
    var MyQwizBook = App.module();

    MyQwizBook.View = Backbone.View.extend({

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
                $(view.el).find("#qwizbookPublishOrUnpublish_" + id+' span').html("Unpublish");
                $(view.el).find("#qwizbookPublishOrUnpublish_" + id+' i').addClass('text-success');
            }
            else {
                $(view.el).find("#qwizbookPublishOrUnpublish_" + id+' span').html("Publish");
                $(view.el).find("#qwizbookPublishOrUnpublish_" + id+' i').removeClass('text-success');
           }
            return this;
        }
    });

    module.exports = MyQwizBook;

});