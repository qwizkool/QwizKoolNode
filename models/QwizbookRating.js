/**
 * Created with JetBrains WebStorm.
 * User: bambalakkat
 * Date: 11/25/12
 * Time: 10:56 AM
 * To change this template use File | Settings | File Templates.
 */

var db = require('../lib/qwizbookrating_db');

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

var QwizbookRatingSchema = new db.Schema({

//------- General Information/data

// A combination of title and owner email to create uniqueness
// This is with assumption that email is unique @ qwizkool.
    id:{type:String, unique:true},
    userEmail:{type:String},
    qwizbookId:{type:String},
    rating:{ type:String}
    
});

QwizbookRatingSchema.methods.getQwizbookRatingForResponse = function () {

    return {
    	userEmail:this.userEmail,
    	qwizbookId:this.qwizbookId,
    	rating:this.rating,
        id:this._id
    }
};

var QwizbookRatingData = db.conn.model('QwizbookRating', QwizbookRatingSchema);

// Exports
module.exports.addRating = addRating;
module.exports.retrieveAverageRating = retrieveAverageRating;

function addRating(owner, data, callback) {

    // Check if the provided owner is same as the
    // session owner. A book can be created by only
    // the session owner

    if (owner.email != data.ownerEmail) {
        callback({
            Error:"Qwizbook Could not be created, Please Login "
        });
        return;
    }

    var instance = new QwizbookRatingData();

   

    instance.save(function (err) {
        if (err) {
            // Check for duplicate key error
            if (err.code == 11000) {
                callback({
                    Error:"Qwizbook already exist for the same user"
                }, null)
                return;
            }

            // All other conditions Pass as is TODO: need to cleanup.
            callback({
                Error:"Qwizbook Could not be created "
            }, null);
        } else {
            callback(null, instance);
        }
    });
};

function retrieveAverageRating(owner, id, callback) {

};



