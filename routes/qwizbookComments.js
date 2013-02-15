/**
* Created with JetBrains WebStorm.
* User: bambalakkat
* Date: 11/25/12
* Time: 12:47 PM
* To change this template use File | Settings | File Templates.
*/

/**
* Module dependencies.
*/
var User = require('../models/User');
var Qwizbook = require('../models/Qwizbook');
var QwizbookComment = require('../models/QwizbookComments');

module.exports = {

   
AddComments:function (req, res) {
        var qwizbookComment = req.body;
        var comment = qwizbookComment.comment;
        var qwizbookId = qwizbookComment.qwizbookId;
        QwizbookComment.addComments(comment,qwizbookId, function (err, qwizbookComment) {
            // If error send the error response
            if (err) {
                res.send(400, err);
                console.log(err);
                return;
            }
            // No error send the unique ID for the newly created
            res.send({id:qwizbookComment._id});

        })

       

    }
    
};