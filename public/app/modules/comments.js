define([
    "app",
    "text!templates/commentList.html",
    "text!templates/commentListView.html"
], function (App, TemplateList, TemplateListView) {

    // Create a new module
    var Comments = App.module();

    Comments.Model = Backbone.Model.extend({

        //urlRoot:function () {

            //urlRootBase = "/";

            //if (this.action == "addQwizbookComments") {
                //return urlRootBase + "comments/";
            //}

        //},
        
        urlRoot:"/comments/",

        defaults:{
            id:null,
            comment:'qwizbook comments',
            description:"Donec imperdiet egestas lorem, nec feugiat eros gravida et. Pellentesque ultricies consectetur tortor, sit amet hendrerit nibh faucibus ac. Integer imperdiet, leo ut pretium mollis, quam sem malesuada magna, et sollicitudin risus tortor quis tellus. Nunc convallis laoreet mi, in ullamcorper dui molestie quis. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam sit amet posuere nulla. Nulla molestie aliquet tellus sed tristique. Duis pretium, sapien sed venenatis porttitor, nisl sem fringilla risus, ac ultricies neque quam vel massa.",
            username:'qwizkool_user',
            qwizbookId:null,
            date:Date.now
            //commentAddStatus:null
            
        },

        initialize:function () {
        
        },

        isUserAuthenticated:function () {
            var state = this.get('isLoggedIn');
            return state;
        },

        addQwizbookComments:function (comments, qId) {
        	var commentdesc = "Donec imperdiet egestas lorem, nec feugiat eros gravida et. Pellentesque ultricies consectetur tortor, sit amet hendrerit nibh faucibus ac. Integer imperdiet, leo ut pretium mollis, quam sem malesuada magna, et sollicitudin risus tortor quis tellus. Nunc convallis laoreet mi, in ullamcorper dui molestie quis. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam sit amet posuere nulla. Nulla molestie aliquet tellus sed tristique. Duis pretium, sapien sed venenatis porttitor, nisl sem fringilla risus, ac ultricies neque quam vel massa.";
        	var commentedDate = Date.now();
        	
        	if(comments!=""){
        		this.set('comment', comments);
            this.set('description', commentdesc);
            this.set('qwizbookId', qId);
            this.set('date', commentedDate);
            
            this.action = "addQwizbookComments";

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
        QwizbookComments:function (qwizbookId) {
            this.qwizbookId = qwizbookId;
            this.urlroot = this.url();
            
            var qwizbookComments = this;

            var jqxhr = qwizbookComments.fetch({

                error:function (collection, response) {
                },

                success:function (collection, response) {
                    List = qwizbookComments.toJSON();
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
            qbookcomment_item_template = _.template(this.template, view.model.toJSON());
            //alert(qbook_item_template);
            view.el.innerHTML = qbookcomment_item_template;
            return this;
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
