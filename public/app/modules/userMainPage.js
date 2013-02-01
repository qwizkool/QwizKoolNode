define([
    "app",
    "tabs",
    "modules/header",
    "modules/userMainContent",
    "modules/footer",
    "modules/userSettings",
    "modules/qwizbook"
], function (App, Tabs, Header, UserMainContent, Footer, UserSettings, QwizBook) {

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
            //           this.userSettings.on("logout-attempted", this.renderSettings, this);
        },

        updateCollection:function () {
            var thisView = this;

            thisView.userMainContent.render(function (el) {
                $("#qpage-content").html(el);
                thisView.userMainContent.reattachEvents();
            });

        },

        // Render all the nested views related to this page
        // and attach it to the DOM.
        show:function (done) {

            var thisView = this;

            $("#qpage-header").html(this.header.render().el);
            $("#qwizkool-user-settings").html(this.userSettings.render().el);
            this.header.renderSettings();


           // thisView.userMainContent.render(function (el) {
           //     $("#qpage-content").html(el);
            //});


            thisView.footer.render(function (el) {
                $("#qpage-footer").html(el);
            });

        }
    });

    return UserMainPage;
}); 
