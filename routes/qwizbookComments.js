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
        var sessionUser = req.user;
        
        var comment = qwizbookComment.comment;
        var description = qwizbookComment.description;
        var qwizbookId = qwizbookComment.qwizbookId;
        QwizbookComment.addComments(qwizbookComment, sessionUser,function (err, qwizbookComment) {
            // If error send the error response
            if (err) {
                res.send(400, err);
                console.log(err);
                return;
            }
            // No error send the unique ID for the newly created
            res.send({id:qwizbookComment._id});

        })

       

   },
ListComments:function(req,res)
    {
    	
        var qbookId = req.route.params.qwizbookId;

		var sessionUser = req.user;
		QwizbookComment.retrieveQwizbookcomments(sessionUser, qbookId, function(err, comments) {
		// If error send the error response
		if (err) {
		res.send(400, err);
		console.log(err);
		return;
		}
		res.send(JSON.stringify(comments));
		
		})
    }
};