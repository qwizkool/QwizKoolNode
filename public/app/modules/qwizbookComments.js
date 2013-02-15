define([
    "app",
    "modules/addComments",
    "text!templates/qwizbookComments.html"
], function (App,AddComments,Template) {

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
        this.model = new AddComments.Model();
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
        
        commentDiv:function(e){
        	$('#addcomments').hide();
        },
        
        addCommentDiv:function(e){
        	$('#addcomments').show();
        },
        
        addComment:function(e){
        	var addComment = $('#comment').val();
        	this.model.addQwizbookComments(addComment,this.qId);
        }
    });

    // Required, return the module for AMD compliance
    return Comment;

});