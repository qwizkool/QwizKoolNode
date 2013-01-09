define([
    "app",
    "modules/user"
], function (App, User) {

    // Create a new module
    var UserSettings = App.module();

     UserSettings.View = Backbone.View.extend({
        template:"",

        initialize:function () {
            this.model = new User.Model();
            this.tmplSettings = "app/templates/userSettings.html";
        },

        render:function (done) {
            var view = this;
            var template;

            template = this.tmplSettings;

            // Fetch the template, render it to the View element and call done.
            App.fetchTemplate(template, function (tmpl) {

                view.el.innerHTML = tmpl();
                if (_.isFunction(done)) {
                    done(view.el);
                }

            });

        },

        events:{
            // TODO: implement expandable/collapsible user setting drop down list.
            "click #user-settings":"signOut"
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

