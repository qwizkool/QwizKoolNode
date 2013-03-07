/*
 QwizBook represents one full quiz with associated navigation, hints, comments, images, video, audio etc.
 The QwizBook primarily maintains a list of QwizPage references, and the starte transitions between them.
 A QwizPage could be an intro page, a multiple choice question, summary etc.
 */

define(["app"], function (App) {

    // Create a new module
    var QwizBookRating = App.module();

    QwizBookRating.Model = Backbone.Model.extend({

        urlRoot:"/qwizbookrating/",


        defaults:{
            id:null,
            userEmail:"qwizkool_user@qwizkool.com",
            qwizbookId:null,
            rating:0,
            isRatedqwizBook:false

        },

        initialize:function () {

            var qwizbook = localStorage.getItem("QwizbookData");


            //if (qwizbook) {

            qwizbookDetails = JSON.parse(localStorage.getItem("QwizbookData"));
            userInfo = JSON.parse(localStorage.getItem("qwizkoolUser"));


            if (userInfo) {
                //this.urlroot = this.url();
                this.set({
                    userEmail:userInfo.email,
                    qwizbookId:this.qbookId,
                    rating:this.ratingval

                });

            }

        },

        addqwizbookrating:function (qbId, rating) {

            this.set('qbookId', qbId);
            this.set('isRatedqwizBook', false);
            this.set('ratingval', rating);
            console.log("Rating added Qbook Id" + qbId);
            var jqxhr = this.save({}, {

                error:function (model, response) {
                    model.set({
                        isRatedqwizBook:false,
                        action:'none'
                    });
                    model.trigger('add-qwizbookrating-event');

                    // alert("Model:Failed to register "+ model.get('name') + " ! " + response.statusText);
                },

                success:function (model, response) {
                    //alert("Model:Hello " + model.get('name') + " ! " + "Welcome to QwizKool ! " + "You are user #" + model.get('uid') +".");

                    model.set({
                        action:'none'
                    });
                    //console.log(response.rating);
                    localStorage.setItem('qwizkoolUserRating', response.rating);
                    model.trigger('add-qwizbookrating-event', response);
                    //model.trigger('show-qwizbookrating-event', response.ratingval);
                }
            });

        }
    });

    QwizBookRating.Collection = Backbone.Collection.extend({

        model:QwizBookRating.Model,
        url:function () {
            var urlRoot = "/qwizbookrating/";

            return urlRoot;

        }

    });

    QwizBookRating.Router = Backbone.Router.extend({/* ... */ });

    // Required, return the module for AMD compliance
    return QwizBookRating;

});

