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
    "modules/sampleDesign",
    "modules/sampleqwizbookAuthoring",
    "modules/qwizbookAuthoring",
    "modules/qwizbookAddDetails",
    "modules/archiveQwizbooks"
], function (App, Bootstrap, Session, IndexPage, PageNotFoundPage, UserMainPage, QwizbookMainPage, SampleDesign, SampleQwizbookAuthoring, QwizbookAuthoring, QwizbookAddDetails, ArchiveQwizbooks) {

    // Defining the application router, you can attach sub routers here.
    var Router = Backbone.Router.extend({

        routes: {
            '': 'index',
            'notfound': 'pageNotFound',
            'main': 'userMain',
            'qwizbookDetails/:id': 'qwizbookMain',
            'design': 'sampleDesign',
            'sampleAuthorQwizbook': 'sampleAuthorQwizbookDesign',
            'authorQwizbook/:id': 'authorQwizbook',
            'myQwizbooks': 'myQwizbooks',
            'qwizbookArchives': 'qwizbookArchives'
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
            indexPage.show();
        },

        pageNotFound: function (hash) {

            var pageNotFoundPage = new PageNotFoundPage.View({session: this.session});
            pageNotFoundPage.show();
        },

        userMain: function (hash) {

            var userMainPage = new UserMainPage.View({session: this.session});
            userMainPage.show();
        },

        qwizbookMain: function (id) {

            var qwizbookMainPage = new QwizbookMainPage.View({ session: this.session, qwizbookId: id });
            qwizbookMainPage.show()
        },

        sampleDesign: function (hash) {
            var sampleDesign = new SampleDesign.View({session: this.session});
            sampleDesign.show();
        },

        sampleAuthorQwizbookDesign: function (hash) {


            var sampleAuthorQwizbookDesign = new SampleQwizbookAuthoring.View({session: this.session});
            sampleAuthorQwizbookDesign.show();
        },


        myQwizbooks: function (hash) {


            var createQwizbook = new QwizbookAuthoring.View({session: this.session});
            createQwizbook.show();
        },


        authorQwizbook: function (id) {

            var authorQwizbook = new QwizbookAddDetails.View({session: this.session, qwizbookId: id});
            authorQwizbook.show();
        },

        qwizbookArchives: function () {
            var archiveQwizbook = new ArchiveQwizbooks.View({session: this.session});
            archiveQwizbook.show();
        }

    });

    return Router;

});