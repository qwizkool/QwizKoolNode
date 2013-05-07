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

        initialize: function() {
          
        },

        isAddedqwizBook:  false,

        defaults:{
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

    })
    return QwizBookPage;
});