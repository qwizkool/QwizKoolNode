/*!
 * Copyright(c) 2013 Vibrentt
 *
 * Module : Comments
 *
 *
 */
define([
    "app",
    "text!templates/commentList.html",
    "text!templates/commentListView.html"
], function (App, TemplateList, TemplateListView) {

    // Create a new module
    var Comments = App.module();

    Comments.Model = Backbone.Model.extend({

        urlRoot:"/comments/",

        defaults:{
            id:null,
            comment:'qwizbook comments',
             username:'qwizkool_user',
            qwizbookId:null,
            date:Date.now
            //commentAddStatus:null
            
        },

        initialize:function () {
        
        },


        add:function (comments, qId) {
        	
        	//var commentdesc = "Donec imperdiet egestas lorem, nec feugiat eros gravida et. Pellentesque ultricies consectetur tortor, sit amet hendrerit nibh faucibus ac. Integer imperdiet, leo ut pretium mollis, quam sem malesuada magna, et sollicitudin risus tortor quis tellus. Nunc convallis laoreet mi, in ullamcorper dui molestie quis. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam sit amet posuere nulla. Nulla molestie aliquet tellus sed tristique. Duis pretium, sapien sed venenatis porttitor, nisl sem fringilla risus, ac ultricies neque quam vel massa.";
        	var commentedDate = Date.now();
        	
        	if(comments!=""){
        	this.set('comment', comments);
            //this.set('description', commentdesc);
            this.set('qwizbookId', qId);
            this.set('date', commentedDate);
            
            this.action = "addComments";

            var jqxhr = this.save({}, {

                error:function (model, response) {
                	//commentAddStatus:response.statusText,
                    console.log('error');
                },

                success:function (model, response) {
                	//commentAddStatus: "Comment successfully added!!!!";
                	model.trigger('add-qwizbookcomment-success-event');
                }
            });
        		
        		
        	}
            

        }
        
        
    });

    Comments.Collection = Backbone.Collection.extend({

        model:Comments.Model,
        url:function () {
			
            if (this.qwizbookId) {

                urlRoot = "/comments" + "/" + this.qwizbookId;
            }


            return urlRoot;
        },
        getAll:function (qwizbookId) {
            this.qwizbookId = qwizbookId;
            this.urlroot = this.url();
            
            var qwizbookComments = this;

            var jqxhr = qwizbookComments.fetch({

                error:function (collection, response) {
                },

                success:function (collection, response) {
                    collection.trigger("retreive-qwizbookcomment-success");
                }
            });

        }


    });


    Comments.Router = Backbone.Router.extend({/* ... */ });

    Comments.View = Backbone.View.extend({
        template:TemplateListView,

        initialize:function () {
        	
        },

        render:function (done) {
            var view = this;
            var qbookcomment_item_template;
            var qwizbookcomment = view.model.toJSON();
            qwizbookcomment['formatted_date'] = this.formatDate(qwizbookcomment['date']);
             qbookcomment_item_template = _.template(this.template, qwizbookcomment);
            //qbookcomment_item_template = _.template(this.template, view.model.toJSON());
            //alert(qbook_item_template);
            view.el.innerHTML = qbookcomment_item_template;
            return this;
        },
        
        formatDate: function(d) {
        
        d = new Date(d);
		var monthNames = [ "January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December" ];
		var comentedYear = d.getFullYear();
		var commentedMonth = d.getMonth();
		var commentedDate = d.getDate();
		var commentedHour = d.getHours();
		var commentedMinute = d.getMinutes();
		var commentedSecond = d.getSeconds();
		var commentedMeridiem = "";
		if(commentedHour<12)
		{
			commentedMeridiem = "am";
			
		} else {
			commentedMeridiem = "pm";
			
		}
		
		var commentedDateString = monthNames[commentedMonth]+" "+commentedDate+', '+comentedYear+" "+commentedHour+":"+commentedMinute+" "+commentedMeridiem;
		
  		return commentedDateString;
  
	}

    });

    Comments.ListView = Backbone.View.extend({

        template:TemplateList,

        initialize:function () {
        	
        },

        render:function (done) {

            var view = this;
            var qbookcomment_list_template;
           //alert("hello");
            qbookcomment_list_template = this.template;
            
            view.el.innerHTML = qbookcomment_list_template;
            
            $(view.el).find("#comment-list-container").empty();
            //view.el.innerHTML = _.template(this.template, view.model.toJSON());
          
            _.each(view.model.models, function (comment) {

                var commentView = new Comments.View({
                    model:comment
                });

                $(view.el).find("#comment-list-container").append(commentView.render().el);
                

            });

            return this;
        }
    });

    return Comments;

});
