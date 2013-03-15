/*!
 * Copyright(c) 2013 Vibrentt 
 *
 * Module : QwizbookSchema 
 *
 */

var QwizbookSchema = {

    //------- General Information/data

    // A combination of title and owner email to create uniqueness
    // This is with assumption that email is unique @ qwizkool.
    uniqueKey: {
        type: String,
        unique: true
    },
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
    // Private/Public/Shared
    groupPermission: {
        type: String
    },
    // Shared with these email owners.
    sharedWith: [{
        email: String
    }],

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
        pages: []
    }],

    //------- Qwizbook FSM
    // TODO: complete the schema definition.
    FSM: {},

    //------- Qwizbook sections
    sections: [{

        sectionTitle: {
            type: String
        },

        //------- Qwizbook pages
        pages: [{

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
                }
                //TODO: Add support for Image, Video, Audio

            }],

            question: {

                // question text
                text: {
                    type: String
                },

                //TODO: Add support for Image, Video, Audio
                // as questions.

                // answer choices
                choices: [{
                    text: {
                        type: String
                    },
                    answer: {
                        type: Boolean
                    }
                }]
            }

        }]

    }]
};

/**
  * Exports.
  */
module.exports  = exports = QwizbookSchema;
