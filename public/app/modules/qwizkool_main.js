define([
    "app",

    // Libs

    // Modules
    "modules/user"
    // Plugins
], function (namespace, User) {

    // Create a new module
    var QwizkoolMain = namespace.module();

    // QwizkoolMain extendings
    QwizkoolMain.Model = Backbone.Model.extend({ /* ... */ });
    QwizkoolMain.Collection = Backbone.Collection.extend({ /* ... */ });
    QwizkoolMain.Router = Backbone.Router.extend({ /* ... */ });

    // This will fetch the tutorial template and render it.
    QwizkoolMain.View = Backbone.View.extend({
        template:"app/templates/qwizkool_main.html",

        initialize : function() {
            this.model = new User.Model();
          },

        render:function (done) {
            var view = this;

            // Fetch the template, render it to the View element and call done.
            namespace.fetchTemplate(this.template, function (tmpl) {
                view.el.innerHTML = tmpl();

                // If a done function is passed, call it with the element
                if (_.isFunction(done)) {
                    done(view.el);
                }
            });
        },

        renderLogInStatus : function(done) {
            var view = this;
            var status_template;
            var full_template;

            // Update the login status related view elements
            // with appropriate status.
            if (view.model.get('loginAttempted') === true) {
                namespace.fetchTemplate("app/templates/signin_status.html", function(tmpl) {

                    view.undelegateEvents();

                    var attributes = view.model.toJSON();
                    status_template = _.template(tmpl(attributes));
                    view.$("#login-status").html(status_template());

                    if (view.model.get('isLoggedIn') === true) {
                        view.$("#login-status").find('.status').addClass('success');
                    } else {
                        view.$("#login-status").find('.status').addClass('error');
                    }

                    if (_.isFunction(done)) {
                        done(view.el);
                    }

                    view.delegateEvents(this.events);

                });

            };

            // Show the login status
            $("#login-status").show();

        },

        renderRegistrationStatus : function(done) {
            var view = this;
            var status_template;
            var full_template;

            // Update the registration status related view elements
            // with appropriate status.
            if (view.model.get('registrationAttempted') === true) {

                namespace.fetchTemplate("app/templates/registration_status.html", function(tmpl) {
                    var attributes = view.model.toJSON();
                    status_template = _.template(tmpl(attributes));
                    view.$("#registration-status").html(status_template());

                    if (view.model.get('isRegistered') === true) {
                        view.$("#registration-status").find('.status').addClass('success');
                    } else {
                        view.$("#registration-status").find('.status').addClass('error');
                    }

                    if (_.isFunction(done)) {
                        done(view.el);
                    }

                    view.delegateEvents(this.events);

                });

            };

            // Show the login status
            $("#registration-status").show();

        },

        events:{
            "click #signin-button":"signIn",
            "click #signout_button":"signOut",
            "click #register-button":"signUp"
        },

        reattachEvents:function () {
            this.undelegateEvents();
            this.delegateEvents(this.events);

        },

        userLoginEvent:function () {
            if (this.model.get('isLoggedIn') === true) {

                //alert(JSON.parse(localStorage.getItem('qwizkoolUser')).username);

                // Go to logged in page.
                Backbone.history.navigate("#main", true);
            } else {

                // Trigger event to update status
                this.trigger('login-attempted');

            }
        },

        userLogoutEvent:function () {
            if (this.model.get('isLoggedIn') === false) {
                // Go to logged in page.
                Backbone.history.navigate("", true);
                this.trigger('logout-attempted');
            } else {
                // Trigger event to update status
                this.trigger('logout-attempted');
            }
        },

        // When the user clicks sign-in, create a new user model and save it
        signOut:function () {

            // Listen for success/fail events
            this.model.on('user-logout-event', this.userLogoutEvent, this);

            this.model.logout();

            //alert("user signout : end");

        },

        // When the user clicks sign-in, create a new user model and save it
        signIn:function () {

            //alert("user signin");
            $("#login-status").hide();

            // Todo: Validate the input values
            this.model.set('email', $('#user-email-input').val());
            this.model.set('password', $('#user-password-input').val());

            // Listen for success/fail events
            this.model.on('user-login-event', this.userLoginEvent, this);

            this.model.login();

            //alert("user signin : end");

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

            //alert("new user signup");
            $("#registration-status").hide();

            // Todo: Validate the input values
            this.model.set('name', $('#user-reg-name-input').val());
            this.model.set('email', $('#user-reg-email-input').val());
            this.model.set('password', $('#user-reg-password-input').val());

            // Listen for success/fail events
            this.model.on('user-registration-event', this.userRegisterEvent, this);

            this.model.register();

        }

    });

    // Required, return the module for AMD compliance
    return QwizkoolMain;

});
