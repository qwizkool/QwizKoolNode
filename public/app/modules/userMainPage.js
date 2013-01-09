define([
    "app",
    "tabs",
    // Modules
    "modules/header",
    "modules/userMainContent",
    "modules/footer",
    "modules/userSettings"
], function (App, Tabs, Header, UserMainContent, Footer, UserSettings) {

    // Create a new module
    var UserMainPage = new App.module();

    // Top level view for the qwizkool
    UserMainPage.View = Backbone.View.extend({

        initialize:function () {
            this.header = new Header.View();
            this.userMainContent = new UserMainContent.View();
            this.footer = new Footer.View();
            this.userSettings = new UserSettings.View();
            //           this.userSettings.on("logout-attempted", this.renderSettings, this);
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

            thisView.userMainContent.render(function (el) {
                $("#qpage-content").html(el);
            });


            thisView.footer.render(function (el) {
                $("#qpage-footer").html(el);
            });

        }
    });

    return UserMainPage;
}); 
