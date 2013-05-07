

var ObjectId = require('mongoose').Schema.Types.ObjectId;
var QwizbookPageSchema = {

    qwizbookId : ObjectId,
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
    reference: [ObjectId],

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
}

/**
 * Exports.
 */
module.exports = exports = QwizbookPageSchema;