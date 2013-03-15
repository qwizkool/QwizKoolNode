define([
    "app",
    "modules/comments",
    "text!templates/qwizbookComments.html"
], function (App, Comments, Template) {

    // Create a new module
    var Comment = App.module();

    // Footer extendings
    Comment.Model = Backbone.Model.extend({ /* ... */ });
    Comment.Collection = Backbone.Collection.extend({ /* ... */ });
    Comment.Router = Backbone.Router.extend({ /* ... */ });

    Comment.View = Backbone.View.extend({

        template:Template,

        initialize:function () {
            this.qId = this.options.qwizbookId;
            this.commentdetmodel = this.options.commentmodel;
            this.model = new Comments.Model();
            this.qbookCommentCollection = new Comments.Collection({qwizbookId:this.qId});
            this.model.on("add-qwizbookcomment-success-event",this.commentHandler,this);
            this.commentDetail = new Comments.ListView({model:this.qbookCommentCollection});
            //this.qwizbookContent = new QwizbookContent.View({model:this.commentdetmodel, commentmodel:this.qbookCommentCollection, qwizbookId:this.qId});
            
        },
        
        commentHandler:function() {
        //alert("ghhfg");	
         this.qbookCommentCollection.on("reset", this.updateModel, this);
            
         this.qbookCommentCollection.QwizbookComments(this.qId);
         $(this.el).find("#review-content-container").append(this.commentDetail.render().el);	
        },
        
        updateModel:function () {
        	alert("fksdf");
        	//$("#qpage-content").html(this.qwizbookContent.render().el);
            //this.qwizbookContent.reattachEvents();
        },

        render:function (done) {

            this.el.innerHTML = this.template;
            return this;
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
        	var addComment = $('#qwizbook-comment-text').val();
            this.model.addQwizbookComments(addComment, this.qId);
            this.render();
            this.model.trigger("add-qwizbookcomment-success");
            return false;
        }
    });

    // Required, return the module for AMD compliance
    return Comment;

});