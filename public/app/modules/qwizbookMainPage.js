define([
    "app",
    "modules/header",
    "modules/qwizbook",
    "modules/comments",
    "modules/userSettings",
    "modules/qwizbookContent",
    "modules/footer"
], function (App, Header, Qwizbook, Comments, UserSettings, QwizbookContent, Footer) {

    // Create a new module
    var QwizbookMainPage = new App.module();

    // Top level view for the qwizkool
    QwizbookMainPage.View = Backbone.View.extend({


        initialize:function () {
            this.qbookid = this.options.qwizbookId;
            
            this.selectedQwizbook = new Qwizbook.Model({id:this.qbookid});
             this.selectedQwizbook.retreive();
            this.selectedQwizbook.on("retreive-qwizbook-success-event", this.getComments, this);
           
            
            this.header = new Header.View();
            this.userSettings = new UserSettings.View();
            
            this.footer = new Footer.View();
            
            },
          
        getComments:function () {
        	var view = this;
        	this.qwizbookData = view.selectedQwizbook;
            this.commentList = new Comments.Collection({qwizbookId:this.qbookid});
            this.commentList.on("reset", this.updateModel, this);
            
            this.commentList.QwizbookComments(this.qbookid);
            
            this.qwizbookContent = new QwizbookContent.View({model:this.qwizbookData,commentmodel:this.commentList,qwizbookId:this.qbookid});
             
          },
        
        updateModel:function () {
        	
        	$("#qpage-content").html(this.qwizbookContent.render().el);
            this.qwizbookContent.reattachEvents();
        },


       // Render all the nested views related to this page
        // and attach it to the DOM.
        show:function (done) {
            $("#qpage-header").html(this.header.render().el);
            $("#qwizkool-user-settings").html(this.userSettings.render().el);
            this.header.renderSettings();
            $("#qpage-footer").html(this.footer.render().el);


        }
    });

    return QwizbookMainPage;
});


