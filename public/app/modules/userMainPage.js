/*!
 * Copyright(c) 2013 Vibrentt
 *
 * Module : UserMainPage
 *
 *
 */

define([
    "app",
    "modules/header",
    "modules/userMainContent",
    "modules/footer",
    "modules/userSettings",
    "modules/appToolbar"
], function (App, Header, UserMainContent, Footer, UserSettings, AppToolbar) {

    // Create a new module
    var UserMainPage = new App.module();

    // Top level view for the qwizkool
    UserMainPage.View = Backbone.View.extend({

        initialize: function () {

            if (_.isEmpty(this.options.session)) {
                throw "ERROR: Session object is not provided for the view!!"
            }

            this.session = this.options.session;

            // Create and associate the user setting view with the tool bar upper
            // view in the Header.
            this.userSettings = new UserSettings.View({session: this.session});

            // Create and associate the app tool bar view with the tool bar lower
            // view in the Header.
            this.appToolbar = new AppToolbar.View({session: this.session});

            // Create the header view
            this.header = new Header.View({htbuView: this.userSettings, htblView: this.appToolbar});

            this.footer = new Footer.View();

            this.userMainContent = new UserMainContent.View({
                el: '#qwizkool-content', session: this.session});

            this.userMainContent.clear();


        },


        // Render all the nested views related to this page
        // and attach it to the DOM.
        show: function (done) {

            // render the static components.
            this.header.render();
            this.footer.render();
            this.userMainContent.render();

        }
    });

    return UserMainPage;
}); 
