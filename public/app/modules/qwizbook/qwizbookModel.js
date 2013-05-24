/*!
 * Copyright(c) 2013 Vibrentt
 *
 * Module : QwizBook
 *
 */


define([
    "app",
    "modules/qwizbook/qwizbookPageCollection",
], function(App, QwizbookPage){

    var QwizBook = App.module();

    QwizBook.Model = Backbone.Model.extend({
        idAttribute:"_id",
        //Root of the REST url for QwizBooks
        urlRoot:"/qwizbooks/",

        defaults:{
            id:null,
            uniqueKey:null,
            title:"Welcome to a new way of learning ..",
            description:"Qwizbook Description",
            ownerEmail:"qwizkool_user@qwizkool.com",
            date:Date.now,
            archive:false,
            published:false,
            userRating:"0",
            averageRating:"0",
            userratingcount:"0",
            isAddedqwizBook:false,
            AddedqwizBookAttempted:false,
            AddedqwizBookStatus:null,
            pageReference:[],
            reference: [{
                        videoLinks: [{link: "www.videolink.com"}],
                        webLinks  : [{link: "www.webLinks.com"}],
                        imageLinks: [{link: "www.imageLinks.com"}],
                        audioLinks: [{link: "www.audioLinks.com"}]
                        }],
            pages:[]
        },

        initialize:function(){
            this.qwizbookPage     = new QwizbookPage.Model();
            this.qwizbookPage.url = "/qwizbooks/" + this.id + "/pages";
        },

        create:function (qbtitle, qbdescription) {
            this.set('title', qbtitle);
            this.set('description', qbdescription); 
            this.set({
                AddedqwizBookAttempted:true,
                isAddedqwizBook:false,
                AddedqwizBookStatus:null
            });

            var jqxhr = this.save({}, {

                error:function (model, response) {
                    model.set({
                        isAddedqwizBook:false,
                        AddedqwizBookStatus:response.statusText,
                        action:'none'
                    });
                    model.trigger('qwizbook-create-failed-event');

                },

                success:function (model, response) {

                    model.set({
                        isAddedqwizBook:true,
                        //AddedqwizBookStatus:"Successfully Added Qwizbook" + model.get('title') + "Qwizbook id is #" + model.get('id') + ".",
                        action:'none'
                    });
                    model.trigger('qwizbook-create-success-event');
                }
                
            });
        },

        retreive:function (qId,session) {
            var jqxhr = this.fetch({


                error:function (model, response) {
                    //this.isListedqwizBook = false;
                    console.log("Failed to get QwizBook!");
                    model.trigger('retreive-qwizbook-failed-event');
                },

                success:function (model, response) {
                    model.trigger('retreive-qwizbook-success-event');
                }
            });

        },

        publishOrunpublishQwizbook:function(qId,publishOrunpublish) {
            
            this.set('published', publishOrunpublish);  
            this.set({
                AddedqwizBookAttempted:true,
                isAddedqwizBook:false,
                AddedqwizBookStatus:null
            });

            var jqxhr = this.save({}, {

                error:function (model, response) {
                    model.set({
                        isAddedqwizBook:false,
                        AddedqwizBookStatus:response.statusText,
                        action:'none'
                    });
                    model.trigger('qwizbook-create-failed-event');
                },

                success:function (model, response) {
                    model.set({
                        isAddedqwizBook:true,
                        //AddedqwizBookStatus:"Successfully Added Qwizbook" + model.get('title') + "Qwizbook id is #" + model.get('id') + ".",
                        action:'none'
                    });
                    model.trigger('publishOrunpublish-qwizbook-success-event');
                }                
            });

        },
        
        deleteMyQwizbook:function(qBookId)
        {
            //alert(qBookId);
            //this.set('id',qBookId);
            this.destroy({

                // Handle the Logout Error condition.
                error: function (model, response) {
                    console.log("Failed to delete Qwizbook");
                   
                },

                // Handle the Logout success condition.
                success: function (model, response) {
                model.trigger('delete-qwizbook-success-event');
                  
                }
            });
        },
        
        unArchiveMyQwizbook :function(qBookId)
        {
            
            //this.set('_id',qBookId);
             var jqxhr = this.save({}, {

                error:function (model, response) {
                   console.log("Failed to unarchive Qwizbook");

                },

                success:function (model, response) {
                   model.trigger('unArchive-qwizbook-success-event');
                }
                
            });
        },

        validate: function(attr, options){
        }

    });
    return QwizBook;
});
