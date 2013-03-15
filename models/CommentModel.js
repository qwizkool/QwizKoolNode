var db = require('../lib/db_connection');

/*

 QwizbookComments definition
 TODO: Document this section.

 */

/*Schema definition*/

var QwizbookCommentsSchema = new db.Schema({

	comment : {
		type : String
	},
	description : {
		type : String
	},
	username : {
		type : String
	},
	date : {
		type : Date
	},
	qwizbookId : {
		type : String
	}

});

var QwizbookCommentsData = db.conn.model('QwizbookComments', QwizbookCommentsSchema);

// Exports
module.exports.addComments = addComments;
module.exports.retrieveQwizbookcomments = retrieveQwizbookcomments;

function addComments(qwizbookComment, sessionUser, callback) {

	var instance = new QwizbookCommentsData();
	instance.comment = qwizbookComment.comment;
	instance.description = qwizbookComment.description;
	instance.date = qwizbookComment.date;
	instance.qwizbookId = qwizbookComment.qwizbookId;
	instance.username = sessionUser.username;
	//instance.date 			= Date.now;

	instance.save(function(err) {
		if (err) {

			// All other conditions Pass as is TODO: need to cleanup.
			callback({
				Error : "Qwizbookcomments Could not be created "
			}, null);
		} else {
			callback(null, instance);
		}
	});
}

function retrieveQwizbookcomments(user, qbookId, callback) {
	
		QwizbookCommentsData.find({qwizbookId : qbookId}).sort({date:-1}).execFind(function(err, comments) {


		if (err) {
			// All other conditions Pass as is TODO: need to cleanup.
			callback({
				Error : "Retreive QwizbookComments failed."
			}, null);
		} else {
			callback(null, comments);
		}

	});
}

