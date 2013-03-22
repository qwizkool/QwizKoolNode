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

        template:Template,

        initialize:function () {
            this.model = new User.Model();
        },

        render:function () {

            this.el.innerHTML = this.template;

            return this;

        },

        renderLogInStatus:function (done) {
            var view = this;
            var statusTemplate;

            // Update the login status related view elements
            // with appropriate status.
            if (view.model.get('loginAttempted') === true) {


                var data = view.model.toJSON();
                statusTemplate = _.template(TmplLoginStatus, data);

                view.$("#login-status").html(statusTemplate);

                if (view.model.get('isLoggedIn') === true) {
                    view.$("#login-status").find('.alert').addClass('alert-success');
                } else {
                    view.$("#login-status").find('.alert').addClass('alert-error');
                }

                // Show the login status
                $("#login-status").show();

            }

            return this;
        },

        renderRegistrationStatus:function (done) {

            var view = this;
            var statusTemplate;

            // Update the registration status related view elements
            // with appropriate status.
            if (view.model.get('registrationAttempted') === true) {
                var data = view.model.toJSON();
                statusTemplate = _.template(TmplRegStatus, data);

                view.$("#registration-status").html(statusTemplate);

                if (view.model.get('isRegistered') === true) {
                    view.$("#registration-status").find('.alert').addClass('alert-success');
                } else {
                    view.$("#registration-status").find('.alert').addClass('alert-error');
                }

            }

            // Show the login status
            $("#registration-status").show();
            return this;

        },

        events:{
            "click #signin-button":"signIn",
            "click #register-button":"signUp",
            "keyup #user-password-input":"loginByEnter",
            "keyup #user-email-input":"loginByEnter",
            "keyup #user-reg-name-input":"signupByEnter",
            "keyup #user-reg-email-input":"signupByEnter",
            "keyup #user-reg-password-input":"signupByEnter"
        },

        reattachEvents:function () {
            this.undelegateEvents();
            this.delegateEvents(this.events);
        },
        
        loginByEnter:function(e)
        {
        	
			if (e.keyCode == 13)
			{
				this.signIn();
			}
        },
        
        signupByEnter:function(e)
        {
        	
			if (e.keyCode == 13)
			{
				this.signUp();
			}
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

            // Todo: Validate the input values
            var email = $('#user-email-input').val();
            var password = $('#user-password-input').val();

            // Register for event to monitor login status.
            this.model.on('user-login-event', this.userLoginEvent, this);

            this.model.login(email, password);

        },

        userRegisterEvent:function () {

            if (this.model.get('isRegistered') === true) {
                // Go to logged in page.
                 
                Backbone.history.navigate("#main", true);
                this.trigger('registration-attempted');
            } else {
                // Trigger event to update status
                this.trigger('registration-attempted');
            }
        },

        // When the user clicks sign-up, create a new user model and save it
        signUp:function () {

            // Todo: Validate the input values
            var username = $('#user-reg-name-input').val();
            var email = $('#user-reg-email-input').val();
            var password = $('#user-reg-password-input').val();


            // Register for event to monitor registration status
            this.model.on('user-registration-event', this.userRegisterEvent, this);

            this.model.register(username, email, password);

        }

    });

    // Required, return the module for AMD compliance
    return indexMainContent;

});
