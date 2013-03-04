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
            view.el.innerHTML = _.template(Template, this.model.toJSON());

            return this;
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

