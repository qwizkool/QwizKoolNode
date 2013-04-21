/*!
 * Copyright(c) 2013 Vibrentt
 *
 * Module : User
 *
 *
 */

define([
    "app",
    "sha256"
], function (App, Sha256) {

    // Create a new module
    var User = App.module();

    // User extendings
    User.Model = Backbone.Model.extend({

        urlRoot:"/users",

        REGISTRATION_SUCCESS_MSG: function() {
            return "Your account has been created and an activation link has been sent to the " + this.get("email") +
            " Please activate the account by clicking on the activation link before you can log in.";
        },

        REGISTRATION_FAILED_MSG: "Could not complete the registration.",

        USER_ALREADY_EXISTS_MSG: function() {
            return "User already exist with the same email ID: " + this.get("email")+ ".";
        },

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
                    var json = JSON.parse(response.responseText),
                        status = ( "user_already_exists" == json.Error )
                                    ? model.USER_ALREADY_EXISTS_MSG()
                                    : model.REGISTRATION_FAILED_MSG ;
                    model.trigger('user-registration-event', {
                        valid:false,
                        status:status
                    });

                 },

                success:function (model, response) {
                    model.trigger('user-registration-event', {
                        valid:true,
                        status:model.REGISTRATION_SUCCESS_MSG()
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
