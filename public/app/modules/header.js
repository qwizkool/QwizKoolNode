define([
    "app",

    // Libs

    // Modules
    "modules/user"
    // Plugins
], function (namespace, User) {

    // Create a new module
    var Header = namespace.module();

    // Header extendings
    Header.Model = Backbone.Model.extend({ /* ... */ });
    Header.Collection = Backbone.Collection.extend({ /* ... */ });
    Header.Router = Backbone.Router.extend({ /* ... */ });

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
                view.el.innerHTML = tmpl();

                // If a done function is passed, call it with the element
                if (_.isFunction(done)) {
                    done(view.el);
                }
            });

        },

        renderSettings:function () {

            if (this.model.get('isLoggedIn') === true) {
            } else {
                $("#qwizkool-user-settings").hide();
            }


        }

    });

    // Required, return the module for AMD compliance
    return Header;

});
