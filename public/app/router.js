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
    "modules/qwizbookAuthoring"
], function (App, Bootstrap, Session, IndexPage, PageNotFoundPage, UserMainPage, QwizbookMainPage, SampleDesign, SampleQwizbookAuthoring, QwizbookAuthoring) {

    // Defining the application router, you can attach sub routers here.
    var Router = Backbone.Router.extend({

        routes: {
            '': 'index',
            'notfound': 'pageNotFound',
            'main': 'userMain',
            'qwizbookDetails/:id': 'qwizbookMain',
            'design': 'sampleDesign',
            'sampleAuthorQwizbook': 'sampleAuthorQwizbookDesign',
            'authorQwizbook': 'authorQwizbook'


        },

        initialize: function () {
            if (_.isEmpty(this.session)) {
                this.session = new Session.Model();
           }

            // Global error handler.
            $(document).ajaxError(function (event, xhr) {
                // Unauthorized
                if (xhr.status == 401)
                    Backbone.history.navigate("", true);
                // forbidden
                if (xhr.status == 403)
                    Backbone.history.navigate("", true);
                // page not found
                if (xhr.status == 404)
                    Backbone.history.navigate("notfound", true);
            });

        },

        index: function (hash) {

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


            var sampleAuthorQwizbookDesign = new SampleQwizbookAuthoring.View();
            sampleAuthorQwizbookDesign.show();
        },

        authorQwizbook: function (hash) {


            var authorQwizbook = new QwizbookAuthoring.View();
            authorQwizbook.show();
        }

    });

    return Router;

});