define([
    "app",
    "modules/header",
    "modules/qwizbook",
    "modules/userSettings",
    "modules/qwizbookContent",
    "modules/footer"
], function (App, Header, Qwizbook, UserSettings, QwizbookContent, Footer) {

    // Create a new module
    var QwizbookMainPage = new App.module();

    // Top level view for the qwizkool
    QwizbookMainPage.View = Backbone.View.extend({


        initialize:function () {
            this.qbookid = this.options.qwizbookId;
            
            this.selectedQwizbook = new Qwizbook.Model({id:this.qbookid});
            
            this.selectedQwizbook.on("retreive-qwizbook-success-event", this.show, this);
            
            this.header = new Header.View();
            this.userSettings = new UserSettings.View();
            //this.qwizbookContent = new QwizbookContent.View({qwizbookId:this.qbookid});
            this.qwizbookContent = new QwizbookContent.View({model:this.selectedQwizbook,qwizbookId:this.qbookid});
            this.footer = new Footer.View();
            this.selectedQwizbook.retreive();
            this.selectedQwizbook.on("retreive-qwizbook-success-event", this.updateModel, this);

        },
        
        updateModel:function () {
           $("#qpage-content").html(this.qwizbookContent.render().el);
            this.show();
        },


       // Render all the nested views related to this page
        // and attach it to the DOM.
        show:function (done) {
        	alert('hello hello');
            $("#qpage-header").html(this.header.render().el);
            $("#qwizkool-user-settings").html(this.userSettings.render().el);
            $("#qpage-content").html(this.qwizbookContent.render().el);
            this.header.renderSettings();
            //$("#qpage-content").html(this.qwizbookContent.render().el);
            $("#qpage-footer").html(this.footer.render().el);


        }
    });

    return QwizbookMainPage;
}); 
