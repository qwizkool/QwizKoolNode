/*!
 * Copyright(c) 2013 Vibrentt
 *
 * Module : qwizbookCommentCollection
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
    var CommentModel = require('modules/comment/qwizbookComment');

    // Create a new module
    var Comment = App.module();


    Comment.Collection = Backbone.Collection.extend({

        model: CommentModel.Model,
        url: function () {

            if (this.qwizbookId) {

                urlRoot = "/comments" + "/" + this.qwizbookId;
            }


            return urlRoot;
        },
        getAll: function (qwizbookId) {
            this.qwizbookId = qwizbookId;
            this.urlroot = this.url();

            var qwizbookComments = this;

            var jqxhr = qwizbookComments.fetch({

                // specify fetch to reset the collection instead
                // of add/merge using set.
                reset: true,

                error: function (collection, response) {
                },

                success: function (collection, response) {
                    collection.trigger("retreive-qwizbookcomment-success");
                }
            });

        }


    });




    module.exports = Comment;

});
