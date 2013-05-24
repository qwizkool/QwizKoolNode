/*!
 * Copyright(c) 2013 Vibrentt
 *
 * Module : QwizBookPage
 *
 */



define([
    "app"
], function(App){

    QwizBookPage = App.module();

    QwizBookPage.Model = Backbone.Model.extend({
        idAttribute:"_id",
        initialize:function(){
        },

        defaults : {
            _id:"",
            qwizbookId:"",
            multiple_choice_question:[],
            hints:[],
            reinforce:[],
            comments:[]
        },

        delete: function(){
            this.destroy({
                // Handle the Logout Error condition.
                error: function (model, response) {
                    console.log("Failed to delete Qwizbook"); 
                },

                // Handle the Logout success condition.
                success: function (model, response) {
                    model.trigger('delete-qwizbookpage-success-event');
                }
            });
        },

        update: function(){
            this.save({},{
                reset: true,
                error: function(model, response){
                    model.trigger('qwizbookpage-update-failed');
                },
                success:function(model,response){
                    model.trigger('qwizbookpage-update-success');
                }
            })
        }

    });

    QwizBookPage.PageRefModel = Backbone.Model.extend({

        initialize: function() {
          
        },

        isAddedqwizBook:  false,

        defaults:{
            qwizbookPage : {
                qwizbookId : null,
                multiple_choice_question : {
                    questionType : 1,
                    question : {
                        text : "Question"
                    },
                    answers : [{
                        choice : {
                            text: "Answer"
                        },
                        correct : false
                    }]
                },
                reinforce : [{}],
                hints : [{}]
            },
            pageReference : [{
                pageId: null,
                description:null
            }]
        },

        create: function(successCallback){
            var jqxhr = this.save({}, {
                error : function(model, response){
                    model.isAddedqwizBookPage = false;
                    model.trigger('qwizbook-page-create-failed-event');
                },
                success : function(model, response){
                    successCallback(model, response);
                }
            });
        },

        validate: function(attrs){

        }

    });
    
    return QwizBookPage;
});