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

            if (_.isEmpty(this.options.session)) {
                throw "ERROR: Session object is not provided for the view!!"
            }

            this.session = this.options.session;

            // Create and associate the user setting view with the tool bar upper
            // view in the Header.
            this.userSettings = new UserSettings.View({session:this.session});
            this.searchfilter = new Searchfilter.View({
                collection:this.qwizbookCollection
            });

            this.header = new Header.View({htbuView:this.userSettings, htblView:this.searchfilter});

            this.footer = new Footer.View();


            this.qwizbookCollection = new QwizBook.Collection();

            this.userMainContent = new UserMainContent.View({
                collection:this.qwizbookCollection,
                el : '#qwizkool-content', session:this.session});
            this.userMainContent.clear();

            this.searchfilter = new Searchfilter.View({
                collection:this.qwizbookCollection
            });

            this.qwizbookCollection.getAllBooks();
            
            this.qwizbookCollection.on("reset", this.refreshCollectionView, this);

             this.searchfilter.on("searchorfilter", function (searchfilterdataObj) {

                var searchorfiltercriteria = searchfilterdataObj.listcriteria;
                var qwizbookList = searchfilterdataObj.liston;
                var filterorsearch = searchfilterdataObj.listwithsearchorfilter;

                if (filterorsearch == 'user-search-input') {
                    qwizbookList.qwizbookSearch(searchorfiltercriteria);
                    qwizbookList.getAllBooks();
                }

                if (filterorsearch == 'user-filter-input') {
                    qwizbookList.qwizbookFilter(searchorfiltercriteria);
                    qwizbookList.getAllBooks();
                }

            });
        },

        refreshCollectionView:function () {

            this.userMainContent.render()
        },

        // Render all the nested views related to this page
        // and attach it to the DOM.
        show:function (done) {

            this.header.render();
            this.footer.render();
        }
    });

    return UserMainPage;
}); 
