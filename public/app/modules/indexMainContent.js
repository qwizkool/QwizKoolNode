/*!
 * Copyright(c) 2013 Vibrentt
 *
 * Module : indexMainContent
 *
 *
 */
define([
    "app",
    "modules/user",
    "text!templates/indexMainContent.html",
    "text!templates/loginStatus.html",
    "text!templates/registrationStatus.html"
], function (App, User, Template, TmplLoginStatus, TmplRegStatus) {

    // Create a new module
    var indexMainContent = App.module();

    indexMainContent.View = Backbone.View.extend({

        template: Template,

        initialize: function () {

            this.session = this.options.session;
            if (this.session) {
                // Register for seesion based events.
                this.session.on('session-login-event', this.userLoginEvent, this)

            } else {
                throw "ERROR: Session object is not provided for the view!!"
            }

            this.model = new User.Model();
            this.model.on('user-registration-event', this.userRegisterEvent, this);

        },

        render: function () {

            this.el.innerHTML = this.template;

            return this;

        },

        renderLogInStatus: function (statusObject) {
            var view = this;
            var statusTemplate;

            // Update the login status related view elements
            // with appropriate status.


            var data = view.model.toJSON();

            statusTemplate = _.template(TmplLoginStatus, {loginStatus: statusObject.status});

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

        renderRegistrationStatus: function (statusObject) {

            var view = this;
            var statusTemplate;

            var data = view.model.toJSON();

            statusTemplate = _.template(TmplRegStatus, {registrationStatus: statusObject.status});

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

        events: {
            "click #register-button": "signUp",
            "keyup #user-reg-name-input": "signupByEnter",
            "keyup #user-reg-email-input": "signupByEnter",
            "keyup #user-reg-password-input": "signupByEnter"

        },

        reattachEvents: function () {
            this.undelegateEvents();
            this.delegateEvents(this.events);
        },

        loginByEnter: function (e) {

            if (e.keyCode == 13) {
                this.signIn();
            }
        },

        signupByEnter: function (e) {

            if (e.keyCode == 13) {
                this.signUp();
            }
        },

        userLoginEvent: function (e) {

            if (this.session) {

                if (e.valid === false) {

                    this.renderLogInStatus(e);

                }

            }

        },

        userRegisterEvent: function (e) {

            this.renderRegistrationStatus(e);
        },

        // When the user clicks sign-up, create a new user model and save it
        signUp: function () {

            // Todo: Validate the input values
            var username = $('#user-reg-name-input').val();
            var email = $('#user-reg-email-input').val();
            var password = $('#user-reg-password-input').val();
            $('#user-reg-name-input').val('');
            $('#user-reg-email-input').val('');
            $('#user-reg-password-input').val('');
            // Register for event to monitor registration status
            this.model.on('user-registration-event', this.userRegisterEvent, this);

            this.model.register(username, email, password);

        }

    });

    // Required, return the module for AMD compliance
    return indexMainContent;

});
