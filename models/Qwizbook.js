var db = require('../lib/db_connection');

/*

 Qwizbook definition

 Qwizbook has sections[]. Each Sections has pages[]. Each Page has one Question.

 The transition from one section to another is managed by the qwizbook FSM and
 the rules/criteria defined in the FSM.

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
//var mongoose = require('mongoose');
//var Schema = mongoose.Schema;

//var db = require('../lib/qwizbookrating_db');

//var QwizbookRatingSchema = mongoose.model('QwizbookRating', QwizbookRatingSchema);

var QwizbookSchema = new db.Schema({

//------- General Information/data

// A combination of title and owner email to create uniqueness
// This is with assumption that email is unique @ qwizkool.
    uniqueKey:{type:String, unique:true},
    title:{type:String},
    description:{type:String},
    ownerEmail:{type:String},
    date:{ type:Date, default:Date.now },
    userrating:{type:String},
// Private/Public/Shared
    groupPermission:{ type:String
    },
// Shared with these email owners.
    sharedWith:[
        { email:String }
    ],

//------- Qwizbook comments
    comments:[
        {
            submitterEmail:{type:String},
            date:{ type:Date, default:Date.now }, text:{ type:String
        }, approved:{ type:Boolean
        }

        }
    ],

//------- Qwizbook references
// TODO: complete the schema definition.
    reference:[
        {
            videoLinks:[],
            webLinks:[],
            imageLinks:[],
            pages:[]
        }
    ],

//------- Qwizbook FSM
// TODO: complete the schema definition.
    FSM:{},

//------- Qwizbook sections
    sections:[
        {

            sectionTitle:{type:String},

//------- Qwizbook pages
            pages:[
                {

//------- Page comments
                    comments:[
                        {
                            submitterEmail:{type:String},
                            date:{ type:Date, default:Date.now }, text:{ type:String
                        }, approved:{ type:Boolean
                        }

                        }
                    ],

//------- Hints for the questions
                    hints:[
                        {
                            text:{type:String}
//TODO: Add support for Image, Video, Audio

                        }
                    ],

                    question:{

                        // question text
                        text:{ type:String
                        },

                        //TODO: Add support for Image, Video, Audio
                        // as questions.

                        // answer choices
                        choices:[
                            {
                                text:{
                                    type:String
                                },
                                answer:{
                                    type:Boolean
                                }
                            }
                        ]
                    }

                }
            ]

        }
    ]

});

QwizbookSchema.methods.getQwizbookForResponse = function () {

    return {
        title:this.title,
        description:this.description,
        id:this._id,
        userrating:this.userrating
    }
};

//var QwizbookRatingData = db.conn.model('QwizbookRating', QwizbookRatingSchema);

var QwizbookData = db.conn.model('Qwizbook', QwizbookSchema);

// Exports
module.exports.createQwizbook = createQwizbook;
module.exports.retrieveQwizbook = retrieveQwizbook;
module.exports.retrieveQwizbooks = retrieveQwizbooks;
module.exports.retrieveQwizbooksOnSearch = retrieveQwizbooksOnSearch;
module.exports.retrieveQwizbooksOnFilter = retrieveQwizbooksOnFilter;
module.exports.updateQwizbook = updateQwizbook;
module.exports.deleteQwizbook = deleteQwizbook;

function createQwizbook(owner, data, callback) {

    // Check if the provided owner is same as the
    // session owner. A book can be created by only
    // the session owner

    if (owner.email != data.ownerEmail) {
        callback({
            Error:"Qwizbook Could not be created, Please Login "
        });
        return;
    }

    var instance = new QwizbookData();

    instance.uniqueKey = data.title + ":" + owner.email;
    instance.title = data.title;
    instance.description = data.description;
    instance.ownerEmail = owner.email;
    instance.groupPermission = data.groupPermission;

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

function retrieveQwizbook(owner, id, callback) {

    QwizbookData.findById(id, function (err, book) {

        if (err) {
            // Check for duplicate key error

            // All other conditions Pass as is TODO: need to cleanup.
            callback({
                Error:"failed Qwizbook Retreive ."
            }, null);
        } else {
            callback(null, book);
        }

    });

};

function retrieveQwizbooks(owner, callback) {

    // TODO: Complete the Retrieve Qwizbooks
    // Retrieve Qwizbooks, that are shared, public or
    // owned by the 'owner'
    QwizbookData.find(function (err, books) {

        if (err) {
            // All other conditions Pass as is TODO: need to cleanup.
            callback({ Error:"Retreive Qwizbooks failed." }, null);
        } else {
            callback(null, books);
        }

    });

};

function retrieveQwizbooksOnSearch(owner, searchdata, filterdata, callback) {

    // TODO: Complete the Retrieve Qwizbooks
    // Retrieve Qwizbooks, that are shared, public or
    // owned by the 'owner'

    if (filterdata == "Recently Updated") {
        //console.log(searchdata);
        QwizbookData.find({
            $or:[
                {
                    title:{
                        $regex:searchdata,
                        $options:'i'
                    }
                },
                {
                    description:{
                        $regex:searchdata,
                        $options:'i'
                    }
                }
            ]
        }).sort({
                date:-1
            }).execFind(function (err, books) {

                if (err) {
                    // Check for duplicate key error

                    // All other conditions Pass as is TODO: need to cleanup.
                    callback({
                        Error:"Retreive Qwizbooks failed."
                    }, null);
                } else {
                    callback(null, books);
                }

            });

    }

    if (filterdata == "Most Popular") {
        //console.log(searchdata);
        QwizbookData.find({
            $or:[
                {
                    title:{
                        $regex:searchdata,
                        $options:'i'
                    }
                },
                {
                    description:{
                        $regex:searchdata,
                        $options:'i'
                    }
                }
            ]
        }).execFind(function (err, books) {

                if (err) {
                    // Check for duplicate key error

                    // All other conditions Pass as is TODO: need to cleanup.
                    callback({
                        Error:"Retreive Qwizbooks failed."
                    }, null);
                } else {
                    //console.log(books);
                    callback(null, books);
                }

            });


    }

};

function retrieveQwizbooksOnFilter(owner, filterdata, callback) {

    // TODO: Complete the Retrieve Qwizbooks
    // Retrieve Qwizbooks, that are shared, public or
    // owned by the 'owner'
    var qwizbookArray = new Array();

    console.log("Filter Filter");
    if (filterdata == "Recently Updated") {
        QwizbookData.find().sort({
            date:-1
        }).execFind(function (err, books) {

                if (err) {
                    // Check for duplicate key error

                    // All other conditions Pass as is TODO: need to cleanup.
                    callback({
                        Error:"Retreive Qwizbooks failed."
                    }, null);
                } else {
                    callback(null, books);

                }

            });


    }
    if (filterdata == "Most Popular") {
        QwizbookData.find(function (err, books) {

            if (err) {
                // Check for duplicate key error

                // All other conditions Pass as is TODO: need to cleanup.
                callback({
                    Error:"Retreive Qwizbooks failed."
                }, null);
            } else {
                callback(null, books);
            }

        });

    }

};

function updateQwizbook(owner, callback) {

};

function deleteQwizbook(owner, callback) {

};

