/*!
 * Copyright(c) 2013 Vibrentt
 *
 * Module : IndexPage
 * Index page renders the landing page for the qwizbook.
 *
 */
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

            // Create and associate the user setting view with the tool bar upper
            // view in the Header.
            this.userSettings = new UserSettings.View({session:this.options.session});
            this.header = new Header.View({htbuView:this.userSettings});

            this.footer = new Footer.View();

            this.qwizkoolMain = new QwizkoolMain.View({el:'#qwizkool-content', session:this.options.session });
            this.qwizkoolMain.on("login-attempted", this.logInHandler, this);
            this.qwizkoolMain.on("registration-attempted", this.registrationHandler, this);

        },


        // Render all the nested views related to this page
        // and attach it to the DOM.
        show:function () {

            $("#qwizkool-search").empty();

            this.header.render();
            this.qwizkoolMain.render();
            this.footer.render();

        },

        // Update the view with the status of the log in operation.
        logInHandler:function () {

            $("#qwizkool-content").html(this.qwizkoolMain.renderLogInStatus().el);

        },

        // Update the view with the status of the registration operation.
        registrationHandler:function () {
            $("#qwizkool-content").html(this.qwizkoolMain.renderRegistrationStatus().el);
        }
    });

    return IndexPage;
}); 
