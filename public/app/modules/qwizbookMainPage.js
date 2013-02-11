define([
    "app",
    "modules/header",
    "modules/footer",
    "modules/qwizbookContent",
    "modules/userSettings"
], function (App, Header, Footer,QwizbookContent, UserSettings) {

    // Create a new module
    var QwizbookMainPage = new App.module();

    // Top level view for the qwizkool
    QwizbookMainPage.View = Backbone.View.extend({
    	
		
        initialize:function () {
        	this.qbookid = this.options.qwizbookId;
            this.header = new Header.View();
            this.footer = new Footer.View();
            this.qwizbookContent = new QwizbookContent.View({ qwizbookId: this.qbookid });
            this.userSettings = new UserSettings.View();
        },
        
        // Render all the nested views related to this page
        // and attach it to the DOM.
        show:function (done) {
        	$("#qpage-header").html(this.header.render().el);
            $("#qwizkool-user-settings").html(this.userSettings.render().el);
            this.header.renderSettings();
            $("#qpage-footer").html(this.footer.render().el);
            var thisView = this;
            // Attach the tutorial to the DOM
			thisView.qwizbookContent.render(function (el)
			{
				$("#qpage-content").html(el);
			});
			
            

        }
    });

    return QwizbookMainPage;
}); 
