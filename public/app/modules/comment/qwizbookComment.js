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

    // Create a new module
    var Comment = App.module();

    Comment.Model = Backbone.Model.extend({

        urlRoot: "/comments/",

        defaults: {
            id: null,
            comment: 'qwizbook comments',
            username: 'qwizkool_user',
            qwizbookId: null,
            date: Date.now
        },

        initialize: function () {

        },


        add: function (comments, qId) {

            var commentedDate = Date.now();

            if (comments != "") {
                this.set('comment', comments);
                this.set('qwizbookId', qId);
                this.set('date', commentedDate);

                this.action = "addComments";

                var jqxhr = this.save({}, {

                    error: function (model, response) {
                        //commentAddStatus:response.statusText,
                        console.log('error');
                    },

                    success: function (model, response) {
                        //commentAddStatus: "Comment successfully added!!!!";
                        model.trigger('add-qwizbookcomment-success-event');
                    }
                });


            }


        }


    });


    module.exports = Comment;

});
