/* ---------- CommonJS wrapper ---------- */
define(function(require, exports, module) {
    /* -------------------------------------- */


    /**
     * Module dependencies.
     */
    var App = require("app"),
    Backbone = require('backbone'),
    _ = require('underscore'),
    $ = require('jquery'),
    TmplHeader = require("text!modules/header/templates/headerMain.html");

    // Create a new module from App
    var HeaderMain = App.module();

    HeaderMain.View = Backbone.View.extend({


        template:TmplHeader,

        initialize:function () {

        },

        render:function () {

            this.$el.html(this.template);

            return this;
        },

        remove: function() {

            this.$el.remove();
            this.stopListening();

            return this;
        }

    });
// More extensions ...


// Export module
module.exports = HeaderMain;

/* ---------- CommonJS wrapper ---------- */
});
/* -------------------------------------- */