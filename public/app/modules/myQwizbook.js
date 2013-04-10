/*!
 * Copyright(c) 2013 Vibrentt
 *
 * Module : QwizBook
 *
 *
 */

/*
 QwizBook represents one full quiz with associated navigation, hints, comments, images, video, audio etc.
 The QwizBook primarily maintains a list of QwizPage references, and the starte transitions between them.
 A QwizPage could be an intro page, a multiple choice question, summary etc.
 */

define([
    "app",
    
    "text!templates/mybookListItem.html",
    "text!templates/myBookList.html"

], function (App, TmplQwizbookItem, TmplQwizbookList) {

    // Create a new module
    var MyQwizBook = App.module();

    MyQwizBook.Model = Backbone.Model.extend({
    	urlRoot:"/qwizbooks/",
    });

    MyQwizBook.Collection = Backbone.Collection.extend({
    });

    MyQwizBook.Router = Backbone.Router.extend({/* ... */ });

    MyQwizBook.View = Backbone.View.extend({

        template:TmplQwizbookItem,

        initialize:function () {


            if (_.isEmpty(this.options.session)) {
                throw "ERROR: Session object is not provided for the view!!"
            }

            this.session = this.options.session;

           
        },

        render:function (done) {

            var view = this;

            view.el.innerHTML  = _.template(this.template, view.model.toJSON());
            return this;
        }
    });


    MyQwizBook.ListMyBook = Backbone.View.extend({

        template:TmplQwizbookList,

        initialize:function () {


            if (_.isEmpty(this.options.session)) {
                throw "ERROR: Session object is not provided for the view!!"
            }

            this.session = this.options.session;
        },

        render:function () {

            var view = this;
            var qbook_list_template;

            qbook_list_template = this.template;

            view.el.innerHTML = qbook_list_template;

            $(view.el).find("#myQwizbook-list-container").empty();

            // If we have items to list , update the list view.
            // else show nothing to display view.
            if (view.model.models.length) {
                _.each(view.model.models, function (qwizbook) {

                    var qwizbookView = new MyQwizBook.View({
                        model:qwizbook,
                        session:view.session
                    });
                    

                    $(view.el).find("#myQwizbook-list-container").append(qwizbookView.render().el);


                })

            } else {
                $(view.el).find("#myBook-no-result-found").show();
            }

            return this;

        },
        
        
        deleteQwizbook:function (currentQwizbook) {
        
         var view = this;
         var newQbook = "";
         //var selectedQbooks = currentQwizbook;
         //var selectQbooksCount = selectedQbooks.length;
         var checkedQbook = "";
         
         checkedQbook = currentQwizbook;
         
         
         _.each(view.model.models, function (qwizbook) {
         	      
         	    
         	   newQbook = qwizbook.toJSON();
         	         		
         	    if(newQbook._id == checkedQbook){
                    	
                    qwizbook.deleteMyQwizbook(checkedQbook);
                     
                }
                    	
          })	
         
         
         	        	
          
        }
        
        
    });

    return MyQwizBook;

});