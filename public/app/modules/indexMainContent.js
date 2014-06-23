/*!
 * Copyright(c) 2013 Vibrentt
 *
 * Module : indexMainContent
 *
 *
 */

define(function (require, exports, module) {

    /**
     * Module dependencies.
     */
    var App = require("app"),
        Backbone = require('backbone'),
        _ = require('underscore'),
        $ = require('jquery'),
        Template = require('text!templates/indexMainContent.html');


    // Create a new module
    var indexMainContent = App.module();

    indexMainContent.View = Backbone.View.extend({

        template:Template,

        initialize:function () {

        },

        render:function () {

            this.$el.html(this.template);
            return this;

        }

    });

    module.exports = indexMainContent;
});
