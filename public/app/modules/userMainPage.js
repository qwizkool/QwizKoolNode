define([
    "app",
    "modules/header",
    "modules/userMainContent",
    "modules/footer",
    "modules/userSettings",
    "modules/qwizbook"
], function (App, Header, UserMainContent, Footer, UserSettings, QwizBook) {

    // Create a new module
    var UserMainPage = new App.module();

    // Top level view for the qwizkool
    UserMainPage.View = Backbone.View.extend({

        initialize:function () {

            this.qwizbookList = new QwizBook.Collection();
            this.header = new Header.View();
            this.userMainContent = new UserMainContent.View({collection:this.qwizbookList});
            this.footer = new Footer.View();
            this.userSettings = new UserSettings.View();
            this.qwizbookList.QwizbookList();
            this.qwizbookList.on("reset", this.updateCollection, this);
        },

        updateCollection:function () {

            $("#qpage-content").html(this.userMainContent.render().el);
            this.userMainContent.reattachEvents();
        },

        // Render all the nested views related to this page
        // and attach it to the DOM.
        show:function (done) {

            $("#qpage-header").html(this.header.render().el);
            $("#qwizkool-user-settings").html(this.userSettings.render().el);
            this.header.renderSettings();
            $("#qpage-footer").html(this.footer.render().el);

        }
    });

    return UserMainPage;
}); 
