/*!
 * Copyright(c) 2013 Vibrentt
 *
 * QwizbookSchema
 * Schema definition for quizbook schema
 */

var ObjectId = require('mongoose').Schema.Types.ObjectId;

var QwizbookSchema = {

    //------- General Information/data

    // A combination of title and owner email to create uniqueness
    // This is with assumption that email is unique @ qwizkool.
    title: {
        type: String
    },
    description: {
        type: String
    },
    ownerEmail: {
        type: String
    },
    date: {
        type: Date,
        'default': Date.now
    },
    userRating: {
        type: String
    },
    userratingcount: {
        type: String
    },
    averageRating: {
        type: String
    },
    // Private/Public/Shared
    groupPermission: {
        type: String
    },
    // Shared with these email owners.
    sharedWith: [{
        email: String
    }],
    // Published status
    published: {
        type: Boolean,
        'default': false
    },
    
    //Archive status
    
    archive:{
    	type: Boolean,
    	'default': false
    },


    //------- Qwizbook comments
    comments: [{
        submitterEmail: {
            type: String
        },
        date: {
            type: Date,
            'default': Date.now
        },
        text: {
            type: String
        },
        approved: {
            type: Boolean
        }

    }],

    //------- Qwizbook references
    // TODO: complete the schema definition.
    reference: [{
        videoLinks: [],
        webLinks: [],
        imageLinks: [],
        audioLinks: []
    }],

    pageReference: [{
        pageId: ObjectId,
        description: String,
        videoLinks: [{
            url: String
        }],
        webLinks: [{
            url: String
        }],
        imageLinks: [{
            url: String
        }],
        audioLinks: [{
            url: String
        }]
    }],

    //------- Qwizbook FSM (SCXML string)
    FSM: {
        type: String
	},
	
    //------- Qwizbook chapters
    chapters: [{
    
        title : String,
        id : Number
  
    }],
    
    //------- Qwizbook sections
    pages: [{

        qwizbookId : ObjectId,
        chapterId : Number,
        multiple_choice_question: {

            questionType : Number,

            // question
            question: {
                text: {
                    type: String
                },
                videoLinks: [{
                    url: String
                }],
                imageLinks: [{
                    url: String
                }],
                audioLinks: [{
                    url: String
                }]
            },

            // answer choices
            answers: [{
                choice: {
                    text: {
                        type: String
                    },
                    videoLinks: [{
                        url: String
                    }],
                    imageLinks: [{
                        url: String
                    }],
                    audioLinks: [{
                        url: String
                    }]
                },

                correct: {
                    type: Boolean
                }
            }]
        },
        //------- Page reference optional
        referenceIds: [ObjectId],

        //------- Re-inforcement
        reinforce: [{
            description: String,
            videoLinks: [{
                url: String
            }],
            webLinks: [{
                url: String
            }],
            imageLinks: [{
                url: String
            }],
            audioLinks: [{
                url: String
            }]
        }],


        //------- Page comments
        comments: [{
            submitterEmail: {
                type: String
            },
            date: {
                type: Date,
                'default': Date.now
            },
            text: {
                type: String
            },
            approved: {
                type: Boolean
            }

        }],

        //------- Hints for the questions
        hints: [{
            text: {
                type: String
            },
            imageLinks: [{
                url: String
            }]
        }]
    }]      

};

/**
 * Exports.
 */
module.exports = exports = QwizbookSchema;

