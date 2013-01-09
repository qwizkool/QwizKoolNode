define([
    "app",

    // Modules
    "modules/user"
], function (App, User) {

    // Create a new module
    var indexMainContent = App.module();

    indexMainContent.View = Backbone.View.extend({

        template:"app/templates/indexMainContent.html",

        initialize:function () {
            this.model = new User.Model();
         },

        render:function (done) {
            var view = this;

            // Fetch the template, render it to the View element and call done.
            App.fetchTemplate(this.template, function (tmpl) {
                view.el.innerHTML = tmpl();

                // If a done function is passed, call it with the element
                if (_.isFunction(done)) {
                    done(view.el);
                }
            });
        },

        renderLogInStatus:function (done) {
            var view = this;
            var statusTemplate;

            // Update the login status related view elements
            // with appropriate status.
            if (view.model.get('loginAttempted') === true) {

                App.fetchTemplate("app/templates/loginStatus.html", function (tmpl) {

                    // clear all DOM events.
                    view.undelegateEvents();

                    var attributes = view.model.toJSON();
                    statusTemplate = _.template(tmpl(attributes));

                    view.$("#login-status").html(statusTemplate());

                    if (view.model.get('isLoggedIn') === true) {
                        view.$("#login-status").find('.status').addClass('success');
                    } else {
                        view.$("#login-status").find('.status').addClass('error');
                    }

                    if (_.isFunction(done)) {
                        done(view.el);
                    }

                    // re-attach all DOM events.
                    view.delegateEvents(this.events);

                });

            }
            ;

            // Show the login status
            $("#login-status").show();

        },

        renderRegistrationStatus:function (done) {
            var view = this;
            var statusTemplate;

            // Update the registration status related view elements
            // with appropriate status.
            if (view.model.get('registrationAttempted') === true) {

                App.fetchTemplate("app/templates/registrationStatus.html", function (tmpl) {

                    var attributes = view.model.toJSON();
                    statusTemplate = _.template(tmpl(attributes));

                    view.$("#registration-status").html(statusTemplate());

                    if (view.model.get('isRegistered') === true) {
                        view.$("#registration-status").find('.status').addClass('success');
                    } else {
                        view.$("#registration-status").find('.status').addClass('error');
                    }

                    if (_.isFunction(done)) {
                        done(view.el);
                    }

                    // re-attach all DOM events.
                    view.delegateEvents(this.events);

                });

            }
            ;

            // Show the login status
            $("#registration-status").show();

        },

        events:{
            "click #signin-button":"signIn",
            "click #register-button":"signUp"
        },

        reattachEvents:function () {
            this.undelegateEvents();
            this.delegateEvents(this.events);
        },

        userLoginEvent:function () {
            if (this.model.get('isLoggedIn') === true) {
                // Go to logged in page.
                Backbone.history.navigate("#main", true);
            } else {
                // Trigger event to update status
                this.trigger('login-attempted');
            }
        },


        // When the user clicks sign-in, create a new user model and save it
        signIn:function () {

            // clear the current login status, if present.
             $("#login-status").hide();

            // Todo: Validate the input values
            this.model.set('email', $('#user-email-input').val());
            this.model.set('password', $('#user-password-input').val());

            // Register for event to monitor login status.
            this.model.on('user-login-event', this.userLoginEvent, this);

            this.model.login();

        },

        userRegisterEvent:function () {
            if (this.model.get('isRegistered') === true) {
                // Go to logged in page.
                Backbone.history.navigate("#main", true);
            } else {
                // Trigger event to update status
                this.trigger('registration-attempted');
            }
        },

        // When the user clicks sign-up, create a new user model and save it
        signUp:function () {

            // clear/hide the current status
            $("#registration-status").hide();

            // Todo: Validate the input values
            this.model.set('name', $('#user-reg-name-input').val());
            this.model.set('email', $('#user-reg-email-input').val());
            this.model.set('password', $('#user-reg-password-input').val());

            // Register for event to monitor registration status
            this.model.on('user-registration-event', this.userRegisterEvent, this);

            this.model.register();

        }

    });

    // Required, return the module for AMD compliance
    return indexMainContent;

});
