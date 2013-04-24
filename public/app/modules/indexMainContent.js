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

        },

        render:function () {

            this.$el.html(this.template);
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
            "keyup #user-reg-email-input":"signupByEnter",
            "keyup #user-reg-password-input":"signupByEnter",
            "keyup #user-reg-confirm-password-input":"signupByEnter"

        },

        reattachEvents:function () {
            this.undelegateEvents();
            this.delegateEvents(this.events);
        },

        signupByEnter:function (e) {
        	
        	var email = $('#user-reg-email-input').val();
            var emailLength = email.length;
            var newEmail = "";
            
            var password = $('#user-reg-password-input').val();
            var passwordLength = password.length;
            var newPassword = "";
            
            var confirmPassword = $('#user-reg-confirm-password-input').val();
            var confirmPasswordLength = confirmPassword.length;
            var newConfirmPassword ="";
            
            
            if (e.keyCode == 13) {
                this.signUp();
            }
            else {
            	
            	// TODO: Need cleanup of this validation.
            	if(emailLength>0 && emailLength > App.appConfig.MAX_EMAIL_LENGTH_IN_CHARS)
            	{
             		newEmail = email.substring(0,App.appConfig.MAX_EMAIL_LENGTH_IN_CHARS);
            		$('#user-reg-email-input').val(newEmail);
            		
            	}
            	
            	if((passwordLength>0) && (passwordLength < App.appConfig.MIN_PASSWORD_LENGTH_IN_CHARS ||
                    passwordLength > App.appConfig.MAX_PASSWORD_LENGTH_IN_CHARS))
            	{
             		newPassword = password.substring(0,App.appConfig.MAX_PASSWORD_LENGTH_IN_CHARS);
            		$('#user-reg-password-input').val(newPassword);
            		
            	}
            	
            	if((confirmPasswordLength>0) && (confirmPasswordLength < App.appConfig.MIN_PASSWORD_LENGTH_IN_CHARS ||
                    confirmPasswordLength > App.appConfig.MAX_PASSWORD_LENGTH_IN_CHARS))
            	{
             		newConfirmPassword = confirmPassword.substring(0,App.appConfig.MAX_PASSWORD_LENGTH_IN_CHARS);
            		$('#user-reg-confirm-password-input').val(newConfirmPassword);
            		
            	}
            	
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
                if (password.length < App.appConfig.MIN_PASSWORD_LENGTH_IN_CHARS) {
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
