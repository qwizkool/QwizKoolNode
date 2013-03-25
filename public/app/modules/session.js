/*!
 * Copyright(c) 2013 Vibrentt
 *
 * Module : Session
 * Session Module exports a session model. This model will keep track of the current user
 * session. Session model is used for logging in , Logging out and to query session status
 * of the current user.
 *
 */
define([
    "app",
    "sha256"
], function (App, Sha256) {

    // Create a new module
    var Session = App.module();

    Session.Model = Backbone.Model.extend({

        urlRoot:"/sessions",

        SESSION_STORAGE:"qwizkoolSession",

        LOGIN_FAILED_MSG:"Authentication Failed: Invalid ID or password",
        LOGIN_SUCCESS_MSG:"Authentication successful",
        LOGOUT_FAILED_MSG:"Logout failed",
        LOGOUT_SUCCESS_MSG:"Logout successful",
        SESSION_INVALID_MSG:"Session invalid",
        SESSION_VALID_MSG:"Session valid",

        defaults:{
            id:null,
            name:'new_user',
            email:'new_user@qwizkool.com',
            password:'',
            isAuthenticated:false
        },

        initialize:function () {

            var sessionData = localStorage.getItem(this.SESSION_STORAGE);
            if(sessionData)
            {

                sessionInfo = JSON.parse(localStorage.getItem(this.SESSION_STORAGE));
                if (sessionInfo) {

                    this.set({
                        name:sessionInfo.name,
                        id:sessionInfo.id,
                        email:sessionInfo.email,
                        isAuthenticated:sessionInfo.isAuthenticated
                    });

                }
            }

        },

        isUserAuthenticated:function () {
            return this.get('isAuthenticated');
        },


        login:function (email, password) {

            var shaObj = new jsSHA(password, "TEXT");
            var hash = shaObj.getHash("SHA-256", "HEX");

            this.set('email', email);
            this.set('password', hash);

            this.save({}, {

                // Handle the Login Error condition.
                error:function (model, response) {

                    console.log(response);
                    localStorage.setItem(model.SESSION_STORAGE, JSON.stringify(model));
                    model.trigger('session-login-event', {
                        valid:model.isUserAuthenticated(),
                        status:model.LOGIN_FAILED_MSG
                    });

                },
                // Handle the Login success condition.
                success:function (model, response) {

                    console.log(response);
                    localStorage.setItem(model.SESSION_STORAGE, JSON.stringify(model));
                    model.trigger('session-login-event', {
                        valid:model.isUserAuthenticated(),
                        status:model.LOGIN_SUCCESS_MSG
                    });
                }
            });

        },

        logout:function () {

            this.destroy({

                // Handle the Logout Error condition.
                error:function (model, response) {
                    console.log(response);
                    model.clear().set(model.defaults);
                    localStorage.setItem(model.SESSION_STORAGE, JSON.stringify(model));
                    model.trigger('session-logout-event', {
                        valid:model.isUserAuthenticated(),
                        status:model.LOGOUT_FAILED_MSG
                    });
                },

                // Handle the Logout success condition.
                success:function (model, response) {

                    console.log(response);
                    model.clear().set(model.defaults);
                    localStorage.setItem(model.SESSION_STORAGE, JSON.stringify(model));
                    model.trigger('session-logout-event', {
                        valid:model.isUserAuthenticated(),
                        status:model.LOGOUT_SUCCESS_MSG
                    });

                }
            });

        },

        isSessionValid:function () {

            this.fetch({

                // Handle the fetch Error condition.
                error:function (model, response) {

                    console.log(response);
                    localStorage.setItem(model.SESSION_STORAGE, JSON.stringify(model));
                    model.trigger('session-check-event', {
                        valid:model.isUserAuthenticated(),
                        status:model.SESSION_INVALID_MSG
                    });
                },

                // Handle the fetch success condition.
                success:function (model, response) {

                    console.log(response);
                    localStorage.setItem(model.SESSION_STORAGE, JSON.stringify(model));
                    model.trigger('session-check-event', {
                        valid:model.isUserAuthenticated(),
                        status:model.SESSION_VALID_MSG
                    });

                }
            });
        }
    });

    return Session;

});
