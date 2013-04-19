/**
 * Module dependencies.
 */
var User = require('../models/Users'),
    Mailer = require('../utils/Mailer'),
    crypto = require('crypto'),
    config = require('../config/config');


/*
 * GET users listing.
 */

exports.list = function (req, res) {
    res.send("respond with a resource");
};


module.exports = {

    register:function (req, res) {

        var user = req.body,
            activationCode = "tessss";
        console.log('User Add request for: ');
        console.log(JSON.stringify(user));

        //TODO:
        // do all the required validations.
        // or make all the validations on the client
        // side.

        console.log(user.name);
        console.log(user.email);
        console.log(user.password);
        
        // async generate random token
        // addUser should wait until random token is generated
        crypto.randomBytes(48, function(ex, buf) {

            // generate url save random token 
            activationCode = buf.toString('base64').replace(/\//g,'_').replace(/\+/g,'-');
            console.log("code :" + activationCode);
            var username = user.name;
            var password = user.password;
            var email = user.email;

            // register user
            User.addUser(username, password, email, activationCode, function (err, user) {
                // If error send the error response
                if (err) {
                    res.send(400, err);
                    console.log(err);
                    return;
                }

                // No error send the unique ID for the newly created
                // user.
                var from  = "qzauthmail@gmail.com",
                    to = email,
                    subject = "Please complete the registration",
                    url = config.base_url + '/activate/' + activationCode
                    body = "To complete the registration please click the following link<br>" +
                           '<a href="' + url + '">' + url + '</a>'
                Mailer.send(from, to, subject, body)
                console.log("User Added:");
                console.log(JSON.stringify(user));
                res.send({id:user._id});
            }); 
        });

    },

    updateUser:function (req, res) {

    },


    login:function (req, res) {
        console.log(JSON.stringify(req.user));
        res.send(JSON.stringify(req.user.getUserForResponse()));
    },

    logout:function (req, res) {
        req.logout();
        res.send({STATUS:"Logout Success"})
    },

    getUser:function (req, res) {
        console.log(JSON.stringify(req.user));
        res.send(JSON.stringify(req.user.getUserForResponse()));
    },

    activate:function(req,res){
        var token = req.params.token
        User.activate(token, function(err, user){
            if(err === false){
                status = 2;
            }
            else if(user === false){
                status = -1;
            }
            else if(user){
                status = 1;
            }
            res.render("activate.jade",{activationStatus:status, title:"User Account Activation"})
        });
    }

};
