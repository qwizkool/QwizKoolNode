define([
    "app",
    "sha256"
], function (App, Sha256) {

    // Create a new module
    var User = App.module();

    // User extendings
    User.Model = Backbone.Model.extend({

        urlRoot:"/users",

        REGISTRATION_SUCCESS_MSG: "Registration Successful. You may login now.",
        REGISTRATION_FAILED_MSG: "Could not complete the registration.",

        defaults:{
            id:null,
            name:'new_user',
            email:'new_user@qwizkool.com',
            password:'',
            notifications:2
        },

        initialize:function () {

        },

        register:function (username, email, password) {


            var shaObj = new jsSHA(password, "TEXT");
            var hash = shaObj.getHash("SHA-256", "HEX");


            this.set('name', username);
            this.set('email', email);
            this.set('password', hash);


            var jqxhr = this.save({}, {

                error:function (model, response) {

                    model.trigger('user-registration-event', {
                        valid:false,
                        status:model.REGISTRATION_FAILED_MSG

                    });

                 },

                success:function (model, response) {
                    model.trigger('user-registration-event', {
                        valid:true,
                        status:model.REGISTRATION_SUCCESS_MSG
                    });
                }
            });

        }



    });

    User.Collection = Backbone.Collection.extend({

        model:User.Model,
        url:"/users"

    });

    User.Router = Backbone.Router.extend({/* ... */ });

    // Required, return the module for AMD compliance
    return User;

});
