define([
    "app",
    "modules/comments",
    "text!templates/qwizbookComments.html"
], function (App,Comments,Template) {

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
        this.model = new Comments.Model();
        this.qbookCommentCollection =  new Comments.Collection({qwizbookId:this.qId});
    	},

        render:function (done) {

            this.el.innerHTML = this.template;
            return this;
        },
        
        events:{
        	
        	"click #cancelComment":"commentDiv",
        	"click #writeComment":"addCommentDiv",
        	"click #addcomment":"addComment"
        },

        reattachEvents:function () {
            this.undelegateEvents();
            this.delegateEvents(this.events);
        },
         
        
        
        commentDiv:function(e){
        	$('#comment').val("Add comments");
        	$('#description').val("Add Description");
        	$('#addcomments').hide();
        	
        },
        
        addCommentDiv:function(e){
        	$('#addcomments').show();
        },
        
        addComment:function(e){
        	var addComment = $('#comment').val();
        	var addDescription = $('#description').val();
        	$('#comment').val("Add comments");
        	$('#description').val("Add Description");
        	$('#addcomments').hide();
        	this.model.addQwizbookComments(addComment,addDescription,this.qId);
        	this.trigger('reattachcommentView', {comments:this.qbookCommentCollection,qId:this.qId});
        	
        }
    });

    // Required, return the module for AMD compliance
    return Comment;

});