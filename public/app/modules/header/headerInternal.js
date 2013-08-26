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
        TmplHeader = require("text!modules/header/templates/headerInternal.html");

    // Create a new module from App
    var HeaderInternal = App.module();

    HeaderInternal.View = Backbone.View.extend({


        template:TmplHeader,

        initialize:function () {

            if (_.isEmpty(this.options.session)) {
                throw "ERROR: Session object is not provided for the view!!"
            }

            this.session = this.options.session;
            this.listenTo(this.session, "session-logout-event", this.userLogoutEvent);

        },

        render:function () {

            var view = this;
            view.el.innerHTML = _.template(TmplHeader, this.session.toJSON());

            return this;
        },

        events:{
            "click #user-logout":"signOut",
            "click #qwizbook-archive":"qwizbookArchives",
            "keyup #qwizkool-search-input": "doSearch",
            "click #qwizkool-search-btn": "doSearch",
            "keyup #qwizkool-search-xs-input": "doSearchXs",
            "click #qwizkool-search-xs-btn": "doSearchXs"
    },

        doSearch: function () {
            var value =       $('#qwizkool-search-input').val();
            this.trigger('search', {criteria: value});
        },
        doSearchXs: function () {
            var value =       $('#qwizkool-search-xs-input').val();
            this.trigger('search', {criteria: value});
        },

        qwizbookArchives:function (e) {

            Backbone.history.navigate("#my-qwizbooks-archive", true);

        },

        signOut:function (e) {

            e.preventDefault();

            if (this.session) {

                this.session.logout();
            }

        },

        userLogoutEvent:function (e) {

            if (this.session) {

                if (e.valid === false) {
                     Backbone.history.navigate('', true);
                }

            }

        },

        remove: function() {

            this.$el.remove();
            this.stopListening();

            return this;
        }

    });
// More extensions ...


// Export module
    module.exports = HeaderInternal;

    /* ---------- CommonJS wrapper ---------- */
});
/* -------------------------------------- */

