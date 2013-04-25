/*!
 * Copyright(c) 2013 Vibrentt
 *
 * Module : SignIn
 *
 *
 */
define([
    "app",
    "text!templates/loginStatus.html",
    "text!templates/signIn.html"
], function (App, TmplLoginStatus, Template) {

    // Create a new module
    var SignIn = App.module();

    SignIn.View = Backbone.View.extend({

        template:Template,

        initialize:function () {

            if (_.isEmpty(this.options.session)) {
                throw "ERROR: Session object is not provided for the view!!"
            }

            this.session = this.options.session;
            this.listenTo(this.session, "session-login-event", this.userLoginEvent);

        },
        remove:function () {
            console.log("removed signIn View")
        },

        render:function (done) {

            var view = this;
            view.el.innerHTML = _.template(Template, this.session.toJSON());

            // To prevent closing of drop down when input is selected.
            $(this.el).find('.dropdown-menu #sign-in-form input').on('click', this.manageClinkInsideDropdown);

            return this;
        },

        renderLogInStatus:function (statusObject) {

            var view = this;
            var statusTemplate;

            // Update the login status related view elements
            // with appropriate status.

            statusTemplate = _.template(TmplLoginStatus, {
                loginStatus:statusObject.status
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

        userLoginEvent:function (e) {

            if (this.session) {

                if (e.valid === false) {

                    this.renderLogInStatus(e);

                }

            }

        },

        events:{
            "click #signin-button":"signIn",
            "keyup #user-password-input":"signInByEnter",
            "keyup #user-email-input":"signInByEnter"

        },

        manageClinkInsideDropdown:function (e) {
            e.stopPropagation();
        },

        reattachEvents:function () {
            this.undelegateEvents();
            this.delegateEvents(this.events);

        },
        signInByEnter:function (e) {

            if (e.keyCode == 13) {
                this.signIn();
            }

        },

        signIn:function () {

            // Todo: Validate the input values
            var email = $('#user-email-input').val();
            var password = $('#user-password-input').val();

            this.session.login(email, password);

        }

    });

    return SignIn;

});

