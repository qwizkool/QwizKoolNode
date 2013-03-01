define([
    "app",
    "modules/header",
    "modules/userSettings",
    "modules/qwizbookContent",
    "modules/footer"
], function (App, Header, UserSettings ,QwizbookContent, Footer) {

    // Create a new module
    var QwizbookMainPage = new App.module();

    // Top level view for the qwizkool
    QwizbookMainPage.View = Backbone.View.extend({
    	
		
        initialize:function () {
        	this.qbookid = this.options.qwizbookId;
            this.header = new Header.View();
            this.userSettings = new UserSettings.View();
            this.qwizbookContent = new QwizbookContent.View({qwizbookId: this.qbookid });
            this.footer = new Footer.View();
            
           
        },
        
        // Render all the nested views related to this page
        // and attach it to the DOM.
        show:function (done) {
        	$("#qpage-header").html(this.header.render().el);
        	$("#qwizkool-user-settings").html(this.userSettings.render().el);
            this.header.renderSettings();
            $("#qpage-content").html(this.qwizbookContent.render().el);
            $("#qpage-footer").html(this.footer.render().el);
            
			
            

        }
    });

    return QwizbookMainPage;
}); 
