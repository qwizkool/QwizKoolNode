/*!
 * Copyright(c) 2013 Vibrentt
 *
 * Module : IndexPage
 * Index page renders the landing page for the qwizbook.
 *
 */

define(function (require, exports, module) {

    /**
     * Module dependencies.
     */
    var App = require('app');
    var    Backbone = require('backbone');
    var     _ = require('underscore');
    var     $ = require('jquery');
    var     Header = require('modules/header/headerLogin');
    var    Login = require('modules/account/login');
    var     Footer = require('modules/footer/footer');

    // Create a new module from App
    var LoginPage = App.module();

    LoginPage.View = Backbone.View.extend({


        initialize: function () {

            if (_.isEmpty(this.options.session)) {
                throw "ERROR: Session object is not provided for the view!!"
            }

            this.signup = this.options.signup;
            this.session = this.options.session;

            this.header = new Header.View();

            this.footer = new Footer.View();

            this.Login = new Login.View({session: this.session, signup:  this.signup});

            if (this.session) {
                this.listenTo(this.session, "session-login-event", this.userLoginEvent);
            }

        },

        userLoginEvent: function (e) {

            if (this.session) {
                if (e.valid === true) {
                    Backbone.history.navigate("#qwizkool-home", true);
                }
            }

        },

        // Render all the nested views related to this page
        // and attach it to the DOM.
        show: function () {

            $('#qwizkool-header').html(this.header.render().el);
            $('#qwizkool-footer').html(this.footer.render().el);
            $('#qwizkool-content').html(this.Login.render().el);
        },

        remove: function () {

            this.$el.remove();
            this.stopListening();
            this.header.remove();
            this.footer.remove();
            this.Login.remove()
            return this;

        }

    });


    module.exports = LoginPage;


});


