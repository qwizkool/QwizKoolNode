define([
    "app",
    "text!templates/qwizbookComments.html"
], function (App,Template) {

    // Create a new module
    var Comment = App.module();

    // Footer extendings
    Comment.Model = Backbone.Model.extend({ /* ... */ });
    Comment.Collection = Backbone.Collection.extend({ /* ... */ });
    Comment.Router = Backbone.Router.extend({ /* ... */ });

    Comment.View = Backbone.View.extend({

        template:Template,

        render:function (done) {

            this.el.innerHTML = this.template;
            return this;
        },
        
        events:{
        	
        	"click #cancelComment":"commentDiv",
        	"click #writeComment":"addCommentDiv"
        },
        
        commentDiv:function(e){
        	$('#addcomments').hide();
        },
        
        addCommentDiv:function(e){
        	$('#addcomments').show();
        }
    });

    // Required, return the module for AMD compliance
    return Comment;

});