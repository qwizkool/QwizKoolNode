define([
    "app",
    "modules/header",
    "modules/indexMainContent",
    "modules/footer",
    "modules/userSettings"
], function (App, Header, QwizkoolMain, Footer, UserSettings) {

    // Create a new module
    var IndexPage = new App.module();

    // Landing page for the qwizkool.
    IndexPage.View = Backbone.View.extend({

        initialize:function () {

            this.header = new Header.View();
            this.qwizkoolMain = new QwizkoolMain.View();
            this.footer = new Footer.View();
            this.userSettings = new UserSettings.View();

            this.qwizkoolMain.on("login-attempted", this.logInHandler, this);
            this.qwizkoolMain.on("registration-attempted", this.registrationHandler, this);

        },


        // Render all the nested views related to this page
        // and attach it to the DOM.
        show:function (done) {

            $("#qwizkool-header").html(this.header.render().el);
            $("#qwizkool-search").empty();

            $("#qwizkool-htbu").html(this.userSettings.render().el);
            this.header.renderSettings();

            $("#qpage-content").html(this.qwizkoolMain.render().el);
            $("#qpage-footer").html(this.footer.render().el);

        },

        // Update the view with the status of the log in operation.
        logInHandler:function () {

            $("#qpage-content").html(this.qwizkoolMain.renderLogInStatus().el);
            this.qwizkoolMain.reattachEvents();

        },

        // Update the view with the status of the registration operation.
        registrationHandler:function () {
            $("#qpage-content").html(this.qwizkoolMain.renderRegistrationStatus().el);
            this.qwizkoolMain.reattachEvents();

        }
    });

    return IndexPage;
}); 
