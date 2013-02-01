define([
    "app",
    "modules/qwizbook",
    "modules/breadcrumbs",
    "modules/searchFilter",
    "text!templates/userMainContent.html"

], function (App, QwizBook, Breadcrumbs, Searchfilter, Template) {

    var UserMainContent = App.module();

    UserMainContent.View = Backbone.View.extend({

        initialize:function () {

            this.qwizbookList = this.collection;
            // TODO: breadcrumb view
            //this.breadcrumbs = new Breadcrumbs.View();
            this.searchfilter = new Searchfilter.View({
                collection:this.qwizbookList
            });
            this.qwizbooklistview = new QwizBook.ListView({
                model:this.qwizbookList
            });

            // Register for events from subviews
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

        reattachEvents:function () {
            this.searchfilter.reattachEvents();
        },

        template:Template,

        render:function () {

            this.el.innerHTML = this.template;
            $(this.el).find("#searchfilter-container").append(this.searchfilter.render().el);
            $(this.el).find("#qwizbooklist-container").append(this.qwizbooklistview.render().el);

            return this;
        }
    });

    return UserMainContent;

});
