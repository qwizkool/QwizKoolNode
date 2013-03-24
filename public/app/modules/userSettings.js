/*!
 * Copyright(c) 2013 Vibrentt
 *
 * Module : UserSettings
 *
 *
 */
define([
    "app",
    "modules/user",
    "text!templates/userSettings.html"
], function (App, User, Template) {

    // Create a new module
    var UserSettings = App.module();

    UserSettings.View = Backbone.View.extend({

        template:Template,

        initialize:function () {

            this.session = this.options.session;

            if(this.session) {
                // Register for seesion based events.
                this.session.on('session-login-event', this.userLoginEvent, this)
                this.session.on('session-logout-event', this.userLogoutEvent, this)
                this.session.on('session-check-event', this.sessionCheckEvent, this)
            } else {
                throw "ERROR: Session object is not provided for the view!!"
            }

            // Bind the event for toggling the settings view.
            $(document).bind('click', function (e) {
                if (e.target.id != $('.dropdown').attr('class')) {
                    $('.dropdown-slider').slideUp();
                    $('span.toggle').removeClass('active');
                }
            });
        },

        render:function (done) {

            var view = this;
            view.el.innerHTML = _.template(Template, this.session.toJSON());

            // Show only the settings if the session is valid.
            if (this.session && this.session.isUserAuthenticated()) {
                $(this.el).find("#user-settings").show();
            } else {
                $(this.el).find("#user-settings").hide();
            }

            return this;
        },

        events:{
            "click #user-settings":"toggleUserSettings",
            "click #user-logout":"signOut"
        },

        signOut:function (e) {

            e.preventDefault();

            if(this.session) {

                this.session.logout();
            }

        },

        toggleUserSettings:function (e) {

            if (e.target.id != $('.dropdown').attr('class')) {
                $('.dropdown-slider').slideUp();
                $('span.toggle').removeClass('active');
            }

        },

        reattachEvents:function () {
            this.undelegateEvents();
            this.delegateEvents(this.events);

        },

        userLoginEvent:function (e) {
            if(this.session) {

                if (e.valid === true) {

                    $(this.el).find("#user-settings").show();

                } else {

                    $(this.el).find("#user-settings").hide();
                }

            }

        },

        userLogoutEvent:function (e) {

            if(this.session) {

                if (e.valid === false) {
                    // Go to logged in page.
                    $(this.el).find("#user-settings").hide();
                    Backbone.history.navigate('', true);
                }

            }

        },

        sessionCheckEvent:function (e) {

            if(this.session) {

                if (e.valid === true) {

                    $(this.el).find("#user-settings").show();

                } else {

                    $(this.el).find("#user-settings").hide();
                 }

            }
        }

    });

    return UserSettings;

});

