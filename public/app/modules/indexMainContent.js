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
    "text!templates/registrationStatus.html"
],function (App, User, Template, TmplRegStatus) {

    // Create a new module
    var indexMainContent = App.module();

    indexMainContent.View = Backbone.View.extend({

        template:Template,

        initialize:function () {

            this.session = this.options.session;
            if (this.session) {

            } else {
                throw "ERROR: Session object is not provided for the view!!"
            }


        },

        render:function () {

            this.el.innerHTML = this.template;

            return this;

        },

        renderRegistrationStatus:function (statusObject) {

            var view = this;
            var statusTemplate;

            statusTemplate = _.template(TmplRegStatus, {
                registrationStatus:statusObject.status
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

        events:{
            "click #register-button":"signUp",
            "keyup #user-reg-name-input":"signupByEnter",
            "keyup #user-reg-email-input":"signupByEnter",
            "keyup #user-reg-password-input":"signupByEnter"

        },

        reattachEvents:function () {
            this.undelegateEvents();
            this.delegateEvents(this.events);
        },

        signupByEnter:function (e) {

            if (e.keyCode == 13) {
                this.signUp();
            }
        },

        userRegisterEvent:function (e) {

            this.renderRegistrationStatus(e);
        },

        // When the user clicks sign-up, create a new user model and save it
        signUp:function () {

            // Email Validation
            var email = $('#user-reg-email-input').val();

            var atpos = email.indexOf("@");
            var dotpos = email.lastIndexOf(".");
            if (atpos < 1 || dotpos < atpos + 2 || dotpos + 2 >= email.length) {
                this.renderRegistrationStatus({status:"Not a valid email address!"});
                return;
            }

            // User name for email
            var username = email.split("@")[0];

            // Password validation
            var password = $('#user-reg-password-input').val();
            var confirmPassword = $('#user-reg-confirm-password-input').val();

            if (password != "" && password == confirmPassword) {
                if (password.length < 6) {
                    this.renderRegistrationStatus({status:"Password must contain at least six characters!"});
                    return;
                }
                if (password === username) {
                    this.renderRegistrationStatus({status:"Password must be different from Username!"});
                    return;
                }
            } else {

                this.renderRegistrationStatus({status:"Please check that you've entered and confirmed your password!"});
                return;

            }

            // Clear all fields
            $('#user-reg-email-input').val('');
            $('#user-reg-password-input').val('');
            $('#user-reg-confirm-password-input').val('');

            // Register a new user.
            this.model = new User.Model();
            this.model.on('user-registration-event', this.userRegisterEvent, this);
            this.model.register(username, email, password);

        }
    });

    // Required, return the module for AMD compliance
    return indexMainContent;

});
