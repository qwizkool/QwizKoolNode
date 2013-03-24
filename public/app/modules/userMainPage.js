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
            this.userMainContent = new UserMainContent.View({collection:this.qwizbookList, el : '#qwizkool-content'});
            this.searchfilter = new Searchfilter.View({
                collection:this.qwizbookList
            });
            this.footer = new Footer.View();
            this.userSettings = new UserSettings.View();
            this.qwizbookList.QwizbookList();
            
            this.qwizbookList.on("reset", this.updateCollection, this);
            this.qwizbookList.on("no-qwizbook-tolist", this.noQwizbook, this);
            
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
		noQwizbook:function()
		{
			
			 $("#qwizbook-no-result-found").show();
		},
        updateCollection:function () {

            this.userMainContent.render()
        },

        // Render all the nested views related to this page
        // and attach it to the DOM.
        show:function (done) {

            $("#qwizkool-header").html(this.header.render().el);
            $("#qwizkool-htbu").html(this.userSettings.render().el);
            this.header.renderSettings();
            $("#qwizkool-search").html(this.searchfilter.render().el);
            $("#qwizkool-footer").html(this.footer.render().el);

        }
    });

    return UserMainPage;
}); 
