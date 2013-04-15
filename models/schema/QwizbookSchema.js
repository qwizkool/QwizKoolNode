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
        type: Boolean
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


            //------- Page reference
            reference: [{
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
            }],

            multiple_choice_question: {

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
            }

        }]

    }]
};

/**
 * Exports.
 */
module.exports = exports = QwizbookSchema;

