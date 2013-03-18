define([
    "app",
    "modules/comments",
    "modules/user",
    "modules/qwizbookComments",
    "text!templates/qwizbookComments.html"
], function (App, Comments, User, QwizbookComments, Template) {

    // Create a new module
    //var Comment = App.module();

    // Footer extendings
   // Comment.Model = Backbone.Model.extend({ /* ... */ });
   // Comment.Collection = Backbone.Collection.extend({ /* ... */ });
    //Comment.Router = Backbone.Router.extend({ /* ... */ });
    
    var QwizbookComments = App.module();

    QwizbookComments.View = Backbone.View.extend({
    
        template:Template,

        initialize:function () {
            this.usermodel = new User.Model();
            //this.commentList= this.options.commentmodel;
            //this.qwizbookcontentmodel = this.options.qwizbookcontentmodel;
            //this.model = new Comments.Model();
            //this.model.on("add-qwizbookcomment-success-event",this.commentHandler,this);
            //this.commentDetail = new Comments.ListView({model:this.commentdetmodel});
            //this.qwizbookContentCommentview = new QwizbookContent.View({model:this.qwizbookcontentmodel,commentmodel:this.commentList,qwizbookId:this.qId});
            //this.qwizbookContent = new QwizbookContent.View({model:this.qwizbookcontentmodel, commentmodel:this.commentList, qwizbookId:this.qId});
            //this.qwizbookMainPage = new QwizbookMainPage.View();
        },
        
         
         render:function (done) {

            this.el.innerHTML = this.template;
            return this;
        },
        
        renderSearch:function () {

            // Show the settings option based on the user
            // log in.
            if (this.usermodel.get('isLoggedIn') === true) {
                $('#qwizbook-comments-form').show();
            } else {
                $('#qwizbook-comments-form').hide();
            }

        },

        events:{

            "click #cancelComment":"commentDiv",
            "click #qwizbook-comments-form":"addCommentDiv",
            "click #addcomment":"addComment"
        },

        reattachEvents:function () {
            this.undelegateEvents();
            this.delegateEvents(this.events);
        },

        commentDiv:function (e) {
            $('#qwizbook-comments-form').hide();


        },

        addCommentDiv:function (e) {
            $('#qwizbook-comments-form').show();
        },


        addComment:function (e) {
        	
            this.trigger('add-qwizbookcomment-event',{qwizbookContentModel:this.options.qwizbookcontentmodel,addComment:$('#qwizbook-comment-text').val(), qwizbookId:this.options.qwizbookId});
        
        }
    });

    // Required, return the module for AMD compliance
    return QwizbookComments;

});