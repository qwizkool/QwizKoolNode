/**
 * Created with JetBrains WebStorm.
 * User: bambalakkat
 * Date: 11/25/12
 * Time: 10:56 AM
 * To change this template use File | Settings | File Templates.
 */
var db = require('../lib/qwizbookComments_db');
/*

 Qwizbook definition

 Qwizbook has sections[]. Each Sections has pages[]. Each Page has one Question.

 The transition from one section to another is managed by the qwizbook FSM and
 the rules/criteria  defined in the FSM.

 Inside each section, the transition happens from one page to another in a linear
 fashion.

 A Qwizbook can have reference module. A reference module is a collection of the following

 - Links to external videos[]
 - links to web pages[]
 - links to Images[]
 - links to wiki like pages[] created by user (internal to Qwizkool)

 A Qwizbook can have comments posted by the registered users.

 A collection of hints can be associated with the a page. every time a user refers to a hint. The points
 will be deducted accordingly. This will affect the criteria that decides the progress from one section to
 another.

 A qwizbook page can have comments posted by the registered users.

 Comments will be moderated by the Qwizbook owner. Comments will be active only after the owners approval.
 CAPTCHA based Spam prevention will be used for comments.

 A question is the basic unit. A question will have one or more correct answers.

 */

/*Schema definition*/

var QwizbookCommentsSchema = new db.Schema({

    comment:{type:String},
    qwizbookId:{type:String}
    
});


var QwizbookCommentsData = db.conn.model('QwizbookComments', QwizbookCommentsSchema);

// Exports
module.exports.addComments = addComments;

function addComments(comment,qwizbookId, callback) {

    var instance = new QwizbookCommentsData();
    instance.comment = comment;
    instance.qwizbookId = qwizbookId;
	
   

    instance.save(function (err) {
        if (err) {

            // All other conditions Pass as is TODO: need to cleanup.
            callback({
                Error:"Qwizbookcomments Could not be created "
            }, null);
        } else {
            callback(null, instance);
        }
    });
};






