/*!
 * Copyright(c) 2013 Vibrentt
 *
 * Module : Router
 * Top level url router.
 *
 */
define([
    // Application.
    "app",
    "bootstrap",
    "modules/session",
    "modules/indexPage",
    "modules/pageNotFoundPage",
    "modules/userMainPage",
    "modules/qwizbookMainPage",
    "modules/myQwizbooksPage",
    "modules/qwizbookAddDetails",
    "modules/qwizbookArchivePage"
], function (App, Bootstrap, Session, IndexPage, PageNotFoundPage, UserMainPage, QwizbookMainPage,MyQwizbooksPage, QwizbookAddDetails, QwizbooksArchivePage) {

    // Defining the application router, you can attach sub routers here.
    var Router = Backbone.Router.extend({

        routes: {
            '': 'index',
            'notfound': 'pageNotFound',
            'qwizkool-home': 'userHome',
            'qwizbookDetails/:id': 'qwizbookMain',
            'authorQwizbook/:id': 'authorQwizbook',
            'my-qwizbooks': 'myQwizbooks',
            'my-qwizbooks-archive': 'qwizbookArchives'
        },

        initialize: function () {

            var that = this;

            if (_.isEmpty(this.session)) {
                this.session = new Session.Model();
            }

            // Global error handler.
            $(document).ajaxError(function (event, xhr) {

                if (xhr.status == 401) {
                    // Unauthorized

                    // cleanup the session
                    that.session.clearLocal();

                    Backbone.history.navigate("", true);
                } else if (xhr.status == 403) {
                    // forbidden
                    Backbone.history.navigate("", true);
                } else if (xhr.status == 404) {
                    // page not found
                    Backbone.history.navigate("notfound", true);
                }
                //TODO: need to handle other errors
            });

        },


        index: function (hash) {

            if (this.session.isUserAuthenticated() === true) {
                Backbone.history.navigate("main", true);
                return;
            }

            var indexPage = new IndexPage.View({session: this.session});
            this.showView(indexPage)
        },

        pageNotFound: function (hash) {

            var pageNotFoundPage = new PageNotFoundPage.View({session: this.session});
            this.showView(pageNotFoundPage)
        },

        userHome: function (hash) {

            var userMainPage = new UserMainPage.View({session: this.session});
            this.showView(userMainPage)

        },

        qwizbookMain: function (id) {

            var qwizbookMainPage = new QwizbookMainPage.View({ session: this.session, qwizbookId: id });
            this.showView(qwizbookMainPage)
        },

        myQwizbooks: function (hash) {


            var createQwizbook = new MyQwizbooksPage.View({session: this.session});
            this.showView(createQwizbook);
        },


        authorQwizbook: function (id) {

            var authorQwizbook = new QwizbookAddDetails.View({session: this.session, qwizbookId: id});
            this.showView(authorQwizbook)
        },

        qwizbookArchives: function () {
            var archiveQwizbook = new QwizbooksArchivePage.View({session: this.session});
            this.showView(archiveQwizbook);
        },

        showView: function(view) {
            if (this.currentView) {
                this.currentView.remove();
            }

            this.currentView = view;
            this.currentView.show();
            return view;
        }

    });

    return Router;

});