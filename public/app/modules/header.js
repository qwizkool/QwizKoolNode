define([
    "app",
    "modules/user",
    "text!templates/header.html"
], function (App, User, Template) {

    // Create a new module
    var Header = App.module();

    Header.View = Backbone.View.extend({

        template:Template,

        initialize:function () {
            this.model = new User.Model();
        },

        render:function () {

            this.el.innerHTML = this.template;
            return this;
        },

        renderSettings:function () {

            // Show the settings option based on the user
            // log in.
            if (this.model.get('isLoggedIn') === true) {
                $("#qwizkool-htbu").show();
            } else {
                $("#qwizkool-htbu").hide();
            }

        }

    });

    // Required, return the module for AMD compliance
    return Header;

});
