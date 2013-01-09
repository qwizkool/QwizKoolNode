define([
    "app",
    "modules/user"
], function (App, User, UserSettings) {

    // Create a new module
    var Header = App.module();

    Header.View = Backbone.View.extend({
        template:"app/templates/header.html",

        initialize:function () {
            this.model = new User.Model();
        },

        render:function (done) {
            var view = this;

            // Fetch the template, render it to the View element and call done.
            App.fetchTemplate(this.template, function (tmpl) {

                // Add the template for header
                view.el.innerHTML = tmpl();
                // Pass the rendered el to the caller to attach
                // to the DOM.
                if (_.isFunction(done)) {
                    done(view.el);
                }

            });

        },

        renderSettings:function () {

            // Show the settings option based on the user
            // log in.
            if (this.model.get('isLoggedIn') === true) {
                $("#qwizkool-user-settings").show();
            } else {
                $("#qwizkool-user-settings").hide();
            }

        }

    });

    // Required, return the module for AMD compliance
    return Header;

});
