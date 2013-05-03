/*!
 * Copyright(c) 2013 Vibrentt
 *
 * QwizbookSchema
 * Schema definition for quizbook schema
 */

var mongoose = require('mongoose');

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

    //------- Qwizbook FSM
    // TODO: complete the schema definition.
    FSM: {},

    //------- Qwizbook sections
    sections: [{

        sectionTitle: {
            type: String
        },

        //------- Qwizbook pages optional
        pages: [mongoose.Schema.Types.ObjectId]

    }]
};

/**
 * Exports.
 */
module.exports = exports = QwizbookSchema;

