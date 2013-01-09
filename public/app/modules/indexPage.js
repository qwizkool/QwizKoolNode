define([
    "app",

    // Modules
    "modules/header",
    "modules/indexMainContent",
    "modules/footer",
    "modules/userSettings"
], function (App, Header, QwizkoolMain, Footer, UserSettings) {

    // Create a new module
    var IndexPage = new App.module();

    // Top level view for the qwizkool
    IndexPage.View = Backbone.View.extend({

        initialize:function () {
            this.header = new Header.View();
            this.qwizkoolMain = new QwizkoolMain.View();
            this.footer = new Footer.View();
            this.userSettings = new UserSettings.View();
            //          this.userSettings.on("logout-attempted", this.renderSettings, this);

            this.qwizkoolMain.on("login-attempted", this.logInHandler, this);
            this.qwizkoolMain.on("registration-attempted", this.registrationHandler, this);

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

            thisView.qwizkoolMain.render(function (el) {
                $("#qpage-content").html(el);
            });


            thisView.footer.render(function (el) {
                $("#qpage-footer").html(el);
            });

        },

        // Update the view with the status of the log in operation.
        logInHandler:function () {
            this.qwizkoolMain.renderLogInStatus(function (el) {
                $("#qpage-content").html(el);
            });
        },

        // Update the view with the status of the registration operation.
        registrationHandler:function () {
            this.qwizkoolMain.renderRegistrationStatus(function (el) {
                $("#qpage-content").html(el);
            });

        }
    });

    return IndexPage;
}); 
