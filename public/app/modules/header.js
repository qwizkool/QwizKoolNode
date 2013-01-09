define([
    "app",

    // Libs

    // Modules
    "modules/user",
     // Plugins
], function (namespace, User, UserSettings) {

    // Create a new module
    var Header = namespace.module();

    // This will fetch the tutorial template and render it.
    Header.View = Backbone.View.extend({
        template:"app/templates/header.html",


        initialize:function () {
            this.model = new User.Model();
        },

        render:function (done) {
            var view = this;


            // Fetch the template, render it to the View element and call done.
            namespace.fetchTemplate(this.template, function (tmpl) {

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
