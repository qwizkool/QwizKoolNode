define([
    "app",
    "modules/header",
    "modules/userMainContent",
    "modules/footer",
    "modules/userSettings",
    "modules/searchFilter",
    "modules/qwizbook"
], function (App, Header, UserMainContent, Footer, UserSettings,Searchfilter, QwizBook) {

    // Create a new module
    var UserMainPage = new App.module();

    // Top level view for the qwizkool
    UserMainPage.View = Backbone.View.extend({

        initialize:function () {

            this.qwizbookList = new QwizBook.Collection();
            this.header = new Header.View();
            this.userMainContent = new UserMainContent.View({collection:this.qwizbookList});
            this.searchfilter = new Searchfilter.View({
                collection:this.qwizbookList
            });
            this.footer = new Footer.View();
            this.userSettings = new UserSettings.View();
            this.qwizbookList.QwizbookList();
            
            this.qwizbookList.on("reset", this.updateCollection, this);
            
            
             this.searchfilter.on("searchorfilter", function (searchfilterdataObj) {

                var searchorfiltercriteria = searchfilterdataObj.listcriteria;
                var qwizbookList = searchfilterdataObj.liston;
                var filterorsearch = searchfilterdataObj.listwithsearchorfilter;

                if (filterorsearch == 'user-search-input') {
                    qwizbookList.qwizbookSearch(searchorfiltercriteria);
                    qwizbookList.QwizbookList();
                }

                if (filterorsearch == 'user-filter-input') {
                    qwizbookList.qwizbookFilter(searchorfiltercriteria);
                    qwizbookList.QwizbookList();
                }

            });
        },

        updateCollection:function () {

            $("#qpage-content").html(this.userMainContent.render().el);
            this.reattachEvents();
        },
        reattachEvents:function () {
            this.searchfilter.reattachEvents();
        },

        // Render all the nested views related to this page
        // and attach it to the DOM.
        show:function (done) {

            $("#qpage-header").html(this.header.render().el);
            $("#qwizkool-user-settings").html(this.userSettings.render().el);
            this.header.renderSettings();
            $("#qpage-search").html(this.searchfilter.render().el);
            this.searchfilter.renderSearch();
            $("#qpage-footer").html(this.footer.render().el);

        }
    });

    return UserMainPage;
}); 
