/*!
 * Copyright(c) 2013 Vibrentt
 *
 * Module : QwizbookSchema
 *
 */

 var PageReferenceSchema = {
    pageId: mongoose.Schema.Types.ObjectId,
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
}

/**
 * Exports.
 */
module.exports = exports = PageReferenceSchema;