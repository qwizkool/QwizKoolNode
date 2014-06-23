/*!
 * Copyright(c) 2013 Vibrentt
 *
 * Module : QwizbookDetails
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
    var QwizBookRating = require('modules/qwizbook/qwizbookrating');
    var Template = require("text!modules/qwizbook/templates/qwizbookDetailed.html");

    // Create a new module
    var QwizbookDetails = App.module();

    QwizbookDetails.View = Backbone.View.extend({

        initialize: function () {

            if (_.isEmpty(this.options.session)) {
                throw "ERROR: Session object is not provided for the view!!"
            }

            this.session = this.options.session;

            this.qwizbookId = this.options.qwizbookId;

            var currentUserEmail = this.session.get('email');
            this.qwizbookRating = new QwizBookRating.Model({userEmail: currentUserEmail});
            this.listenTo(this.qwizbookRating, "qwizbookrating-add-event", function (response) {
                var rating = response.rating;
                var qId = response.qId;
                var count = response.count;
                var avg = response.avgRating;
                avg = Math.ceil(avg);
                var html = '';
                for (i = 1; i <= avg; i++) {
                    html += '<i class="fa fa-star text-primary"></i>';
                }

                if (count > 1) {
                    html += '<p  class="text-muted" >' + count + ' ratings</p>';
                } else {
                    html += '<p  class="text-muted" >' + count + ' rating</p>';
                }

                var ratingElement = 'qwizbook-rating-container_' + qId;
                $('#' + ratingElement + ' span').html(html);

            });


        },

        template: Template,

        render: function (done) {

            var view = this;
            var qbook_itemdetail_template;

            view.el.innerHTML = _.template(this.template, this.model.toJSON());

            return this;

        },

        events: {
            "click .rating-input": "updateQwizbookRating"
        },

        addRating: function (ratingdataObj) {

            var ratingvalue = ratingdataObj.ratingval;
            var qbookId = this.qwizbookId;
            var qwizbookratingmodel = ratingdataObj.ratingmodel;
            qwizbookratingmodel.addRating(qbookId, ratingvalue);

        },

        updateQwizbookRating: function (e) {

            var id = $(e.currentTarget).closest('div').find("input[name='qwizbook-rating']").attr('id');

            if (id) {
                var split_id = id.split("_");
                var qId = split_id[1];
                var starValue = $(e.currentTarget).closest('div').find("input[name='qwizbook-rating']").val();
                if (starValue === "") {
                    starValue = "0";
                }
                //console.log("Value of stars for "+ id + " :" + starValue);
                this.qwizbookRating.addRating(qId, starValue);
            }

        }

    });

    module.exports = QwizbookDetails;

});