define([
    "app",
    "modules/qwizbook",
    "modules/qwizbookBreadcrumbs",
    "modules/qwizbookDetails",
    "modules/qwizbookComments",
    "modules/comments",
    "text!templates/qwizbookContent.html"

], function (App, QwizBook, Breadcrumb, QwizbookDetails, QwizbookComments, Comments, Template) {

    // Create a new module
    var QwizbookContent = App.module();


    QwizbookContent.View = Backbone.View.extend({


        initialize:function () {
        
            this.breadcrumb = new Breadcrumb.View();
            this.qwizbookId = this.options.qwizbookId;
            this.qwizbookdetailmodel = this.model;
            this.commentmodel = this.options.commentmodel;
            
            this.qwizbookDetails = new QwizbookDetails.View({model:this.qwizbookdetailmodel,qwizbookId:this.qwizbookId});
            
            this.commentList = this.options.commentmodel;
			
			this.commentDetail = new Comments.ListView({model:this.commentList});
			
			//this.selectedQwizbookCommentModel = new Comments.Model();
			
			//this.selectedQwizbookcommentList = new Comments.Collection({qwizbookId:this.qbookid});
            //this.commentDetail = new Comments.ListView({model:this.qwizbookcommentList});
            this.selectedQwizbookAddcomment = new QwizbookComments.View({qwizbookcontentmodel:this.qwizbookdetailmodel,qwizbookId:this.qwizbookId});
             
            this.selectedQwizbookAddcomment.on("add-qwizbookcomment-event", function (commentadddataObj) {

               
                var selectedQwizbookCommentModel = new Comments.Model();
                var addedcomment = commentadddataObj.addComment;
                var qbookId = commentadddataObj.qwizbookId;
                var qwizbookContentModel = commentadddataObj.qwizbookContentModel;
                var view = this;
                
                if (addedcomment != '') {
                	
                    selectedQwizbookCommentModel.addQwizbookComments(addedcomment, qbookId);
                    selectedQwizbookCommentModel.on("add-qwizbookcomment-success-event", function () {
                    	
                        var commentList = new Comments.Collection({qwizbookId:this.qwizbookId});
                        commentList.QwizbookComments(qbookId);
                        commentList.on("retreive-qwizbookcomment-success",function () {
                        
                        
                        var selectedQwizbookcommentDetail = new Comments.ListView({model:commentList});
                        var commentDetail = selectedQwizbookcommentDetail;
                        var qwizbookContent = new QwizbookContent.View({model:qwizbookContentModel,commentmodel:commentList,qwizbookId:qbookId});
                        
                        $("#qwizkool-content").html(qwizbookContent.render().el);
                        //view.reattachEvents();
                        //return view;

                        });
                        	
                       // view.reattachEvents();
            
                        });
                        
                       view.reattachEvents();
                       return false;
                }
               
               });
			
			
			
			this.qwizbookDetails.on("addrating", function (ratingdataObj) {

			var ratingvalue = ratingdataObj.ratingval;
			var qbookId = this.qwizbookId;
			var qwizbookratingmodel = ratingdataObj.ratingmodel;
			qwizbookratingmodel.addqwizbookrating(qbookId, ratingvalue);

			});
			
			
           },
        
        


        updateCollection:function () {

            $(this.el).find("#review-content-container").append(this.commentDetail.render().el);


        },
        
        commentHandler:function() {
        	
        	alert("In comment handler");
        	
        	this.commentList = new Comments.Collection({qwizbookId:this.qwizbookId});
            this.commentList.on("retreive-qwizbookcomment-success", this.updateModel, this);
            
            this.commentList.QwizbookComments(this.qbookid);
            
            //this.qwizbookContent = new QwizbookContent.View({model:this.qwizbookData,commentmodel:this.commentList,qwizbookId:this.qbookid});
            
            
            //this.qwizbookContent = new QwizbookContent.View({model:this.qwizbookData,commentmodel:this.qwizbookcommentList,qwizbookId:this.qId});
            //this.qwizbookContent = new QwizbookContent.View({model:this.qwizbookData,commentmodel:this.qwizbookcommentList,qwizbookId:this.qId});
            $("#qwizkool-content").html(this.qwizbookContent.render().el);
            this.qwizbookContent.reattachEvents();
         
        },
        
        updateModel:function () {
        	 alert("in update model");
        	 $("#qwizkool-content").html(this.qwizbookContent.render().el);
             this.qwizbookContent.reattachEvents();	
         	
          },

        reattachEvents:function () {
        	
        	this.selectedQwizbookAddcomment.reattachEvents();
        },

        template:Template,

        render:function (done) {
            this.el.innerHTML = this.template;
            $(this.el).find("#qwizbook-content-container").append(this.qwizbookDetails.render().el);
            $(this.el).find("#review-content-header").append(this.selectedQwizbookAddcomment.render().el);
            //this.selectedQwizbookAddcomment.renderSearch();
            $(this.el).find("#review-content-container").append(this.commentDetail.render().el);

            return this;

        }
    });

    // Required, return the module for AMD compliance
    return QwizbookContent;

});


