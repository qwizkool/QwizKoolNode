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

            this.session = this.options.session;

            // Create and associate the user setting view with the tool bar upper
            // view in the Header.
            this.userSettings = new UserSettings.View({session:this.session});
            this.header = new Header.View({htbuView:this.userSettings});

            this.footer = new Footer.View();

            this.qwizkoolMain = new QwizkoolMain.View({el:'#qwizkool-content', session:this.session });

            if (this.session) {
                this.session.on('session-login-event', this.userLoginEvent, this);
            }

        },

        userLoginEvent:function (e) {
        	
        	if (this.session) {
                if (e.valid === true) {
                   Backbone.history.navigate("#main", true);
                }
            }

        },

        // Render all the nested views related to this page
        // and attach it to the DOM.
        show:function () {

            $("#qwizkool-search").empty();

            this.header.render();
            this.qwizkoolMain.render();
            this.footer.render();

        }
    });

    return IndexPage;
}); 
