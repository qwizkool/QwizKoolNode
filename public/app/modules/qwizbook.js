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
    "modules/qwizbookrating",
    "text!templates/qwizbookListItem.html",
    "text!templates/qwizbookList.html"

], function (App, QwizBookRating, TmplQwizbookItem, TmplQwizbookList) {

    // Create a new module
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
            reference: [{
				        videoLinks: [{link: "www.videolink.com"}],
				        webLinks  : [{link: "www.webLinks.com"}],
				        imageLinks: [{link: "www.imageLinks.com"}],
				        audioLinks: [{link: "www.audioLinks.com"}]
				    	}]
        },
        
        initialize : function() {
			
		},

       // create:function () {
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
        }
        
    });

    QwizBook.Collection = Backbone.Collection.extend({

        model:QwizBook.Model,

        url:function () {
            var urlRoot = "/";

            if (this.searchval != '') {
                urlRoot = "qwizbooks"+urlRoot + "?search_str=" + this.searchval + "&sort_by=" + this.filterval;


            }
            
            else if(this.myQwizbook)
            {
            	//urlRoot ="myQwizbook";
            	urlRoot ="users/"+this.userId+"/qwizbooks";
            	if(this.search)
            {
            	if(this.searchParam != '')
            	{
            		urlRoot ="users/"+this.userId+"/qwizbooks?search_str=" + this.searchParam+"&archived=false";
            	}
            }
            }
            
             else if(this.search)
            {
            	if(this.searchParam != '')
            	{
            		urlRoot ="users/"+this.userId+"/qwizbooks?search_str=" + this.searchParam;
            	}
            	else{
            		urlRoot ="users/"+this.userId+"/qwizbooks?archived=true";
            	}
            	
            }
            
            
            else if(this.deleteQwizbookId){
            	urlRoot ="deleteQwizbook/"+this.deleteQwizbookId;
            }
            
           
            
            else if(this.archiveQwizbook){
            	urlRoot ="users/"+this.userId+"/qwizbooks?archived=true";
            }
            
            
             else {

                urlRoot = "qwizbooks"+urlRoot + "?search_str=" + '' + "&sort_by=" + this.filterval;

            }
            return urlRoot;

        },

        initialize:function () {
            this.searchval = '';
            this.searchParam ='';
            this.search =false;
            this.myQwizbook = false;
            this.deleteQwizbookId =false;
            this.archiveQwizbook =false;
            this.filterval = 'Recently Updated';
            this.isListedqwizBook = false;
        },

        setSearchParams:function (searchedstring) {
            this.searchval = searchedstring;
            this.urlroot = this.url(searchedstring);
        },

        setFilterParams:function (filterstring) {
            this.filterval = filterstring;
            this.urlroot = this.url();
        },
        
        
        setUserId:function(session){
        	this.myQwizbook =true; 
        	this.userId = session.id;
        	this.urlroot = this.url();
        	
        },
        setSearchParameter : function(session,seachPArameter)
        {
        	this.search = true;
        	this.userId = session.id;
        	this.searchParam = seachPArameter;
        	this.urlroot = this.url();
        },
        
        getArchiveQwizbook: function(session){
        	this.userId = session.id;
        	this.archiveQwizbook =true;
        	this.urlroot = this.url();
        },
       

        getAllBooks:function () {
             var jqxhr = this.fetch({

                // specify fetch to reset the collection instead
                // of add/merge using set.
                reset: true,

                error:function (collection, response) {
                    this.isListedqwizBook = false;
                    collection.trigger('list-qwizbook-event');
                },

                success:function (collection, response) {
                    this.isListedqwizBook = true;


                    if (response == null) {
                    	
                    	
                        collection.trigger('no-qwizbook-tolist');
                    }

                    collection.trigger('list-qwizbook-event');
                }
            });
        },
        
        getMybook:function(){
        	
        	var qwizbookList = this;
            var jqxhr = qwizbookList.fetch({
             reset: true,

                error:function (collection, response) {
                    this.isListedqwizBook = false;
                    collection.trigger('list-qwizbook-event');
                },

                success:function (collection, response) {
                    this.isListedqwizBook = true;
                    var List = Array();
                    if (response && response.page == "Archive") {
                        collection.trigger('no-qwizbook-tolist');
                        return;
                    }
                    collection.trigger('list-qwizbook-event');
                }
            });
        	
        }
        
        
        
        
    });

    QwizBook.Router = Backbone.Router.extend({/* ... */ });

    QwizBook.View = Backbone.View.extend({

        template:TmplQwizbookItem,

        initialize:function () {


            if (_.isEmpty(this.options.session)) {
                throw "ERROR: Session object is not provided for the view!!"
            }

            this.session = this.options.session;

            var currentUserEmail = this.session.get('email');
            this.qwizbookRating = new QwizBookRating.Model({userEmail : currentUserEmail});
            this.listenTo(this.qwizbookRating, "qwizbookrating-add-event", function (response) {
                var rating = response.rating;
                var qId = response.qId;
                var count = response.count;
                var avg = response.avgRating;
                avg = Math.ceil(avg);
                var html = '';

                var i = 1;
                if (rating) {
                    for (i = 1; i <= rating; i++) {
                        html += '<li id="rating-' + i + '" class="rated" name="rating-' + i + '" value="' + i + '">R</li>';
                    }
                    if (i <= 5) {
                        for (j = i; j <= 5; j++) {
                            html += '<li id="rating-' + j + '" name="rating-' + j + '" value="' + j + '">R</li>';
                        }
                    }
                }
                else {
                    for (j = 1; j <= 5; j++) {
                        html += '<li id="rating-' + j + '" name="rating-' + j + '" value="' + j + '">R</li>';
                    }
                }


                var avgHtml = '';
                i = 1;
                if (avg) {
                    for (i = 1; i <= avg; i++) {
                        avgHtml += '<li  class="rated" name="rating-' + i + '" value="' + i + '">R</li>';
                    }
                    if (i <= 5) {
                        for (j = i; j <= 5; j++) {
                            avgHtml += '<li  name="rating-' + j + '" value="' + j + '">R</li>';
                        }
                    }
                }
                else {
                    for (j = 1; j <= 5; j++) {
                        avgHtml += '<li  name="rating-' + j + '" value="' + j + '">R</li>';
                    }
                }
                var userrating = 'rat_' + qId;
                var ratingCount = 'count_' + qId;
                var averageRating = 'avg_' + qId;
                $('#' + ratingCount).html(count + ' ratings ');
                $('#' + userrating).html(html);
                $('#' + averageRating).html(avgHtml);

            });
        },

        render:function (done) {

            var view = this;

            view.el.innerHTML  = _.template(this.template, view.model.toJSON());

            var avgRating = $(view.el.innerHTML).find(".book_avgRating").val();
            var userRating = $(view.el.innerHTML).find(".book_userrating").val();
            var bookId = $(view.el.innerHTML).find(".book_id").val();
            avgRating = Math.ceil(avgRating);
            var avgHtml = '';
            var i = 1;
            avgHtml += '<ul id="avg_' + bookId + '" class="rating-w-fonts" style="margin: 10px">';
            if (avgRating) {
                for (i = 1; i <= avgRating; i++) {
                    avgHtml += '<li  class="rated" name="rating-' + i + '" value="' + i + '">R</li>';
                }
                if (i <= 5) {
                    for (j = i; j <= 5; j++) {
                        avgHtml += '<li  name="rating-' + j + '" value="' + j + '">R</li>';
                    }
                }
            }
            else {
                for (j = 1; j <= 5; j++) {
                    avgHtml += '<li  name="rating-' + j + '" value="' + j + '">R</li>';
                }
            }
            avgHtml += '</ul>';


            var ratingHtml = '';
            i = 1;
            ratingHtml += '<ul id="rat_' + bookId + '" class="rating-w-fonts" style="margin: 10px">';
            if (userRating) {
                for (i = 1; i <= userRating; i++) {
                    ratingHtml += '<li id="rating-' + i + '" class="rated" name="rating-' + i + '" value="' + i + '">R</li>';
                }
                if (i <= 5) {
                    for (j = i; j <= 5; j++) {
                        ratingHtml += '<li id="rating-' + j + '" name="rating-' + j + '" value="' + j + '">R</li>';
                    }
                }
            }
            else {
                for (j = 1; j <= 5; j++) {
                    ratingHtml += '<li id="rating-' + j + '" name="rating-' + j + '" value="' + j + '">R</li>';
                }
            }
            ratingHtml += '</ul>';
            $(view.el).find("#qbookaverage_rating").append(avgHtml);
            $(view.el).find("#book_userRating").append(ratingHtml);
            return this;
        },
        
        

        events:{
            "click button":"openQwizbook",
            "click #rating-1":"setRating1",
            "click #rating-2":"setRating2",
            "click #rating-3":"setRating3",
            "click #rating-4":"setRating4",
            "click #rating-5":"setRating5"
        },

        openQwizbook:function (e) {
            var clickedEl = $(e.currentTarget);
            var id = clickedEl.attr("id");
            Backbone.history.navigate("#qwizbookDetails/" + id, true);

            //this.trigger('getQwizbook', {qwizbookCriteria: id, openDescription:this.options.collection});
        },

        setRating1:function (e) {
            var ul_id = e.target.parentNode.id;
            var split_id = ul_id.split("_");
            var qBook_id = split_id[1];
            var ratingval = $('#rating-1').val();
            this.qwizbookRating.addRating(qBook_id, ratingval);
        },

        setRating2:function (e) {
            var ul_id = e.target.parentNode.id;
            var split_id = ul_id.split("_");
            var qBook_id = split_id[1];
            var ratingval = $('#rating-2').val();
            this.qwizbookRating.addRating(qBook_id, ratingval);
        },

        setRating3:function (e) {
            var ul_id = e.target.parentNode.id;
            var split_id = ul_id.split("_");
            var qBook_id = split_id[1];
            var ratingval = $('#rating-3').val();
            this.qwizbookRating.addRating(qBook_id, ratingval);
        },

        setRating4:function (e) {
            var ul_id = e.target.parentNode.id;
            var split_id = ul_id.split("_");
            var qBook_id = split_id[1];
            var ratingval = $('#rating-4').val();
            this.qwizbookRating.addRating(qBook_id, ratingval);
        },

        setRating5:function (e) {
            var ul_id = e.target.parentNode.id;
            var split_id = ul_id.split("_");
            var qBook_id = split_id[1];
            var ratingval = $('#rating-5').val();
            this.qwizbookRating.addRating(qBook_id, ratingval);
        }
    });


    QwizBook.ListView = Backbone.View.extend({

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

            $(view.el).find("#qwizbook-list-container").empty();

            // If we have items to list , update the list view.
            // else show nothing to display view.
            if (view.model.models.length) {
                _.each(view.model.models, function (qwizbook) {

                    var qwizbookView = new QwizBook.View({
                        model:qwizbook,
                        session:view.session
                    });

                    $(view.el).find("#qwizbook-list-container").append(qwizbookView.render().el);


                })

            } else {
                $(view.el).find("#qwizbook-no-result-found").show();
            }

            return this;

        }
    });

    return QwizBook;

});