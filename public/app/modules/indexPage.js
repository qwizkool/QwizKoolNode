/*!
 * Copyright(c) 2013 Vibrentt
 *
 * Module : IndexPage
 * Index page renders the landing page for the qwizbook.
 *
 */
define([
    "app",
    "modules/header/headerMain",
    "modules/indexMainContent",
    "modules/footer",
    "modules/signIn"
], function (App, Header, QwizkoolMain, Footer, UserSettings) {

    // Create a new module
    var IndexPage = new App.module();

    // Landing page for the qwizkool.
    IndexPage.View = Backbone.View.extend({

        initialize:function () {

            if (_.isEmpty(this.options.session)) {
                throw "ERROR: Session object is not provided for the view!!"
            }

            this.session = this.options.session;

            // Create and associate the user setting view with the tool bar upper
            // view in the Header.
            this.userSettings = new UserSettings.View({session:this.session});
            this.header = new Header.View({htbuView:this.userSettings});

            this.footer = new Footer.View();

            this.qwizkoolMain = new QwizkoolMain.View({session:this.session });

            if (this.session) {
                this.listenTo(this.session, "session-login-event", this.userLoginEvent);
            }

        },

        userLoginEvent:function (e) {
        	
        	if (this.session) {
                if (e.valid === true) {
                   Backbone.history.navigate("#qwizkool-home", true);
                }
            }

        },

        // Render all the nested views related to this page
        // and attach it to the DOM.
        show: function () {

            $('#qwizkool-header').html(this.header.render().el);
            $('#qwizkool-footer').html(this.footer.render().el);
            $('#qwizkool-content').html(this.qwizkoolMain.render().el);

        },

        remove: function() {

            this.$el.remove();
            this.stopListening();
            this.header.remove();
            this.footer.remove();
            this.qwizkoolMain.remove()
            return this;

        }
    });

    return IndexPage;
}); 
