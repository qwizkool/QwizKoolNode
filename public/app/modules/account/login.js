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
        User = require('modules/user/user'),
        Template = require('text!modules/account/templates/login.html'),
        TmplLoginStatus = require('text!modules/account/templates/loginStatus.html'),
        TmplRegStatus = require('text!modules/account/templates/registrationStatus.html');


    // Create a new module
    var login = App.module();

    login.View = Backbone.View.extend({

        template: Template,

        initialize: function () {
            if (_.isEmpty(this.options.session)) {
                throw "ERROR: Session object is not provided for the view!!"
            }

            this.signup = this.options.signup;
            this.session = this.options.session;

            this.session = this.options.session;
            this.listenTo(this.session, "session-login-event", this.userLoginEvent);

        },

        render: function () {

            this.$el.html(this.template);

            if (this.signup) {
                $(this.el).find("#qwizkool-signin-tab").removeClass('active');
                $(this.el).find("#qwizkool-signup-tab").addClass('active');
                $(this.el).find("#qwizkool-signin-pane").removeClass('active');
                $(this.el).find("#qwizkool-signup-pane").addClass('active');


            } else {
                $(this.el).find("#qwizkool-signup-tab").removeClass('active');
                $(this.el).find("#qwizkool-signin-tab").addClass('active');
                $(this.el).find("#qwizkool-signup-pane").removeClass('active');
                $(this.el).find("#qwizkool-signin-pane").addClass('active');

            }


            return this;

        },
        renderLogInStatus: function (statusObject) {

            var view = this;
            var statusTemplate;

            // Update the login status related view elements
            // with appropriate status.

            statusTemplate = _.template(TmplLoginStatus, {
                loginStatus: statusObject.status
            });

            view.$("#login-status").html(statusTemplate);

            if (statusObject.valid === true) {
                view.$("#login-status").find('.alert').addClass('alert-success');
            } else {
                view.$("#login-status").find('.alert').addClass('alert-error');
            }

            // Show the login status
            $("#login-status").show();

            return this;
        },

        userLoginEvent: function (e) {

            if (this.session) {

                if (e.valid === false) {

                    this.renderLogInStatus(e);

                }

            }

        },
        events: {
            "click #signin-button": "signIn",
            "keyup #password": "signInByEnter",
            "keyup #email": "signInByEnter",
            "click #signup-button": "signUp",
            "keyup #reg-email": "signupByEnter",
            "keyup #reg-password": "signupByEnter",
            "keyup #confirm-reg-password": "signupByEnter"

        },
        signInByEnter: function (e) {

            if (e.keyCode == 13) {
                this.signIn();
            }

        },

        signIn: function () {

            // Todo: Validate the input values
            var email = $('#email').val();

            var atpos = email.indexOf("@");
            var dotpos = email.lastIndexOf(".");
            if (atpos < 1 || dotpos < atpos + 2 || dotpos + 2 >= email.length) {
                this.renderLogInStatus({status: "Not a valid email address!"});
                return;
            }

            var password = $('#password').val();
            if (password.length < App.appConfig.MIN_PASSWORD_LENGTH_IN_CHARS) {
                this.renderLogInStatus({status: "Invalid Id or Wrong password!"});
                return;
            }

            this.session.login(email, password);

        },
        renderRegistrationStatus: function (statusObject) {

            var view = this;
            var statusTemplate;

            statusTemplate = _.template(TmplRegStatus, {
                registrationStatus: statusObject.status
            });

            view.$("#registration-status").html(statusTemplate);

            if (statusObject.valid === true) {
                view.$("#registration-status").find('.alert').addClass('alert-success');
            } else {
                view.$("#registration-status").find('.alert').addClass('alert-error');
            }

            // Show the login status
            $("#registration-status").show();
            return this;

        },

        reattachEvents: function () {
            this.undelegateEvents();
            this.delegateEvents(this.events);
        },

        signupByEnter: function (e) {

            var email = $('#reg-email').val();
            var emailLength = email.length;
            var newEmail = "";

            var password = $('#reg-password').val();
            var passwordLength = password.length;
            var newPassword = "";

            var confirmPassword = $('#confirm-reg-password').val();
            var confirmPasswordLength = confirmPassword.length;
            var newConfirmPassword = "";


            if (e.keyCode == 13) {
                this.signUp();
            }
            else {

                // TODO: Need cleanup of this validation.
                if (emailLength > 0 && emailLength > App.appConfig.MAX_EMAIL_LENGTH_IN_CHARS) {
                    newEmail = email.substring(0, App.appConfig.MAX_EMAIL_LENGTH_IN_CHARS);
                    $('#user-reg-email-input').val(newEmail);

                }

                if ((passwordLength > 0) && (passwordLength < App.appConfig.MIN_PASSWORD_LENGTH_IN_CHARS ||
                    passwordLength > App.appConfig.MAX_PASSWORD_LENGTH_IN_CHARS)) {
                    newPassword = password.substring(0, App.appConfig.MAX_PASSWORD_LENGTH_IN_CHARS);
                    $('#user-reg-password-input').val(newPassword);

                }

                if ((confirmPasswordLength > 0) && (confirmPasswordLength < App.appConfig.MIN_PASSWORD_LENGTH_IN_CHARS ||
                    confirmPasswordLength > App.appConfig.MAX_PASSWORD_LENGTH_IN_CHARS)) {
                    newConfirmPassword = confirmPassword.substring(0, App.appConfig.MAX_PASSWORD_LENGTH_IN_CHARS);
                    $('#user-reg-confirm-password-input').val(newConfirmPassword);

                }

            }
        },

        userRegisterEvent: function (e) {

            this.renderRegistrationStatus(e);
        },

        // When the user clicks sign-up, create a new user model and save it
        signUp: function () {

            // Email Validation
            var email = $('#reg-email').val();

            var atpos = email.indexOf("@");
            var dotpos = email.lastIndexOf(".");
            if (atpos < 1 || dotpos < atpos + 2 || dotpos + 2 >= email.length) {
                this.renderRegistrationStatus({status: "Not a valid email address!"});
                return;
            }

            // User name for email
            var username = email.split("@")[0];

            // Password validation
            var password = $('#reg-password').val();
            var confirmPassword = $('#confirm-reg-password').val();

            if (password != "" && password == confirmPassword) {
                if (password.length < App.appConfig.MIN_PASSWORD_LENGTH_IN_CHARS) {
                    this.renderRegistrationStatus({status: "Password must contain at least six characters!"});
                    return;
                }
                if (password === username) {
                    this.renderRegistrationStatus({status: "Password must be different from Username!"});
                    return;
                }
            } else {

                this.renderRegistrationStatus({status: "Please check that you've entered and confirmed your password!"});
                return;

            }

            // Clear all fields
            $('#reg-email').val('');
            $('#reg-password').val('');
            $('#confirm-reg-password').val('');

            // Register a new user.
            this.model = new User.Model();
            this.listenTo(this.model, "user-registration-event", this.userRegisterEvent);
            this.model.register(username, email, password);


        }

    });

    module.exports = login;
});
