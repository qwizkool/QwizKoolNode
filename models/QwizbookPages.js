/*!
 * Copyright(c) 2013 Vibrentt 
 *
 * Module : Pages 
 *
 */

 /**
 * Module dependencies.
 */

 var QwizbookPageModel = require('./QwizbookPageModel'), logger = require('../utils/logger');

 /**
 * Page constructor
 */

 function QwizbookPage(){

 }

/**
* Create new page
*
* @param {Object} data
* @param {Function} callback function
*/

 QwizbookPage.prototype.create = function(data, callback){

    var page = new QwizbookPageModel(data);

    page.save(function(err){
        if(err){
            if (err.code == 11000) {
                callback({
                    Error : "Page number already exists for the same Qwizbook"
                }, null);
                return;
            }
            callback({
                Error : "Qwizbook page cannot be created",
            }, null);
        }
        else{
            callback(null, page);
        }
    })

 }