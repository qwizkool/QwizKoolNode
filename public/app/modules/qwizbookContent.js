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
            //this.qwizbookDetails = new QwizbookDetails.View({qwizbookId:this.qwizbookId});
            //this.qwizbookDetails = new QwizbookDetails.View({model:this.qwizbookdetailmodel});
            this.qwizbookDetails = new QwizbookDetails.View({model:this.qwizbookdetailmodel,qwizbookId:this.qwizbookId});
            
           
            this.commentList = new Comments.Collection({qwizbookId:this.qwizbookId});
            this.commentList.QwizbookComments(this.qwizbookId);
            this.commentList.on("reset", this.updateCollection, this);
            
            this.addComments = new QwizbookComments.View({qwizbookId:this.qwizbookId});
            this.commentDetail = new Comments.ListView({model:this.commentList});

            //this.qwizbookDetails = new QwizbookDetails.View({qwizbookId:this.qwizbookId});
            //this.qwizbookDetails = new QwizbookDetails.View({model:this.qwizbookDetails});
            this.qwizbookDetails.on("addrating", function (ratingdataObj) {

                var ratingvalue = ratingdataObj.ratingval;
                var qbookId = this.qwizbookId;
                var qwizbookratingmodel = ratingdataObj.ratingmodel;
                qwizbookratingmodel.addqwizbookrating(qbookId, ratingvalue);

            });
            
            //this.commentadded.on("add-qwizbookcomment-success", this.checkadd, this);
        },

        updateCollection:function () {

            $(this.el).find("#review-content-container").append(this.commentDetail.render().el);


        },
        
        checkadd:function () {
        alert("Hello");	
        	
        },
        
        reattachEvents:function () {
            this.addComments.reattachEvents();
        },

        template:Template,

        render:function (done) {
        	//alert("Hello");
            this.el.innerHTML = this.template;
            $(this.el).find("#qwizbook-content-container").append(this.qwizbookDetails.render().el);
            $(this.el).find("#review-content-header").append(this.addComments.render().el);

            return this;

        }
    });

    // Required, return the module for AMD compliance
    return QwizbookContent;

});