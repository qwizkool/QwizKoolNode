define([

    "app",

    // Modules
    "modules/user"

], function (namespace, User) {

    // Create a new module
    var UserSettings = namespace.module();


    // This will fetch the tutorial template and render it.
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
            namespace.fetchTemplate(template, function (tmpl) {

                view.el.innerHTML = tmpl();
                if (_.isFunction(done)) {
                    done(view.el);
                }

            });

        },

        events:{
            // TODO: implement expandable/collapsible user setting
            // dropdown list.
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

        // When the user clicks sign-in, create a new user model and save it
        signOut:function (e) {

           // e.preventDefault();

            // Listen for success/fail events
            this.model.on('user-logout-event', this.userLogoutEvent, this);

            this.model.logout();

        }
    });

    // Required, return the module for AMD compliance
    return UserSettings;

});

