/*!
 * Copyright(c) 2013 Vibrentt
 *
 * Module : Comments
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
    var TemplateListView = require("text!modules/comment/templates/qwizbookCommentView.html");

    // Create a new module
    var Comment = App.module();


    Comment.View = Backbone.View.extend({
        template: TemplateListView,

        initialize: function () {

        },

        render: function (done) {
            var view = this;
            var qwizbookcomment = view.model.toJSON();
            qwizbookcomment['formatted_date'] = this.formatDate(qwizbookcomment['date']);
            view.el.innerHTML  = _.template(this.template, qwizbookcomment);
            return this;
        },

        formatDate: function (d) {

            d = new Date(d);
            var monthNames = [ "January", "February", "March", "April", "May", "June",
                "July", "August", "September", "October", "November", "December" ];
            var comentedYear = d.getFullYear();
            var commentedMonth = d.getMonth();
            var commentedDate = d.getDate();
            var commentedHour = d.getHours();
            var commentedMinute = d.getMinutes();
            var commentedSecond = d.getSeconds();
            var commentedMeridiem = "";
            if (commentedHour < 12) {
                commentedMeridiem = "am";

            } else {
                commentedMeridiem = "pm";

            }

            var commentedDateString = monthNames[commentedMonth] + " " + commentedDate + ', ' + comentedYear + " " + commentedHour + ":" + commentedMinute + " " + commentedMeridiem;

            return commentedDateString;

        }

    });



    module.exports = Comment;

});
