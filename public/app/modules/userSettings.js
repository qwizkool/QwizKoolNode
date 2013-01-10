define([
    "app",
    "modules/user"
], function (App, User) {

    // Create a new module
    var UserSettings = App.module();

    UserSettings.View = Backbone.View.extend({

        template:"app/templates/userSettings.html",

        initialize:function () {

            this.model = new User.Model();

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


            // Fetch the template, render it to the View element and call done.
            App.fetchTemplate(this.template, function (tmpl) {

                view.el.innerHTML = tmpl();

                view.$(".dropdown .guibutton, .dropdown guibutton").click(function () {
                    $(this).parent().find('.dropdown-slider').slideToggle('fast');
                    $(this).find('span.toggle').toggleClass('active');
                    return false;
                });


                if (_.isFunction(done)) {
                    done(view.el);
                }

            });

        },

        events:{
            // TODO: implement expandable/collapsible user setting drop down list.
            "click #user-settings":"toggleUserSettings",
            "click #user-logout":"signOut"
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

        userLogoutEvent:function () {
            if (this.model.get('isLoggedIn') === false) {
                // Go to logged in page.
                Backbone.history.navigate('', true);
                this.trigger('logout-attempted');
            } else {
                // Trigger event to update status
                this.trigger('logout-attempted');
            }
        },

        signOut:function (e) {

            e.preventDefault();

            // Register for log out status event.
            this.model.on('user-logout-event', this.userLogoutEvent, this);

            this.model.logout();

        }
    });

    // Required, return the module for AMD compliance
    return UserSettings;

});

