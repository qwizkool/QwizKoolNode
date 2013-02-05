define([
    "app",
    "modules/header",
    "modules/footer",
    "modules/userSettings"
], function (App, Header, Footer, UserSettings) {

    // Create a new module
    var QwizbookMainPage = new App.module();

    // Top level view for the qwizkool
    QwizbookMainPage.View = Backbone.View.extend({
    	
		
        initialize:function () {
        	this.qbookid = this.options.someData;
            this.header = new Header.View();
            this.footer = new Footer.View();
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


            thisView.footer.render(function (el) {
            	//console.log('zxzx'+this.qbookid);
            	$("#qpage-content").html('sdsds'+this.qbookid);
                $("#qpage-footer").html(el);
            });

        }
    });

    return QwizbookMainPage;
}); 
