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

            var thisView = this;
            // Attach the tutorial to the DOM

            thisView.header.render(function (el) {
                $("#qpage-header").html(el);

                // Add the user settings template inside header
                thisView.userSettings.render(function (el) {

                    $("#qwizkool-user-settings").html(el);
                    thisView.header.renderSettings();

                });


            });

			thisView.qwizbookContent.render(function (el)
			{
				var qwizbookId = thisView.options.qwizbookId;
				$("#qpage-content").html(el);
			});
			
            thisView.footer.render(function (el) {
            	
                $("#qpage-footer").html(el);
            });

        }
    });

    return QwizbookMainPage;
}); 
