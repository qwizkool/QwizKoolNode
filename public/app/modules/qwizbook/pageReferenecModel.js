/*!
 * Copyright(c) 2013 Vibrentt
 *
 * Module : QwizBookPage
 *
 */



define([
    "app"
], function(App){

    PageReference = App.module();
    PageReference.Model = Backbone.Model.extend({

        urlRoot:"/pageReference/",

        initialize: function() {
            
        },

        defaults:{
            pageId: null,
            description:null
        },

        create: function(data){

        },
        validate: function(attrs){

        }
    })
});