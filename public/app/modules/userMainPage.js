define([
    "app",
    "modules/header",
    "modules/userMainContent",
    "modules/footer",
    "modules/userSettings",
    "modules/searchFilter",
    "modules/qwizbook"
], function (App, Header, UserMainContent, Footer, UserSettings, Searchfilter, QwizBook) {

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

            // Create and associate the user search filter view with the tool bar lower
            // view in the Header.
            this.searchfilter = new Searchfilter.View({});
            this.searchfilter.on("search", this.refreshCollectionForSearchEvent, this);
            this.searchfilter.on("filter", this.refreshCollectionForFilterEvent, this);

            // Create the header view
            this.header = new Header.View({htbuView: this.userSettings, htblView: this.searchfilter});

            this.footer = new Footer.View();


            // Create qwizbook collection and associate with its list view.
            // TODO: convert and rename userMainContent to a generic qwizbook
            // summary list view
            this.qwizbookCollection = new QwizBook.Collection();
            this.qwizbookCollection.on("reset", this.refreshCollectionView, this);

            this.userMainContent = new UserMainContent.View({
                collection: this.qwizbookCollection,
                el: '#qwizkool-content', session: this.session});
            this.userMainContent.clear();


        },

        refreshCollectionForSearchEvent: function (e) {

           var criteria = e.criteria;

            if(!_.isEmpty(criteria)) {
                this.qwizbookCollection.setSearchParams(criteria);
                this.qwizbookCollection.getAllBooks();
            }

        },

        refreshCollectionForFilterEvent: function (e) {

            var criteria = e.criteria;

            if(!_.isEmpty(criteria)) {
                this.qwizbookCollection.setFilterParams(criteria);
                this.qwizbookCollection.getAllBooks();
            }

        },

        refreshCollectionView: function () {

            this.userMainContent.render()
        },

        // Render all the nested views related to this page
        // and attach it to the DOM.
        show: function (done) {

            // render the static components.
            this.header.render();
            this.footer.render();

            // retrieve the collection and trigger
            // rendering of the list view.
            this.qwizbookCollection.getAllBooks();

        }
    });

    return UserMainPage;
}); 
