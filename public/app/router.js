define([
    // Application.
    "app",
    "bootstrap",
    "modules/session",
    "modules/indexPage",
    "modules/userMainPage",
    "modules/qwizbookMainPage",
    "modules/sampleDesign"
], function (App, Bootstrap, Session, IndexPage, UserMainPage,
             QwizbookMainPage, SampleDesign) {

    // Defining the application router, you can attach sub routers here.
    var Router = Backbone.Router.extend({

        routes:{
            '':'index',
            'main':'userMain',
            'qwizbookDetails/:id':'qwizbookMain',
            'design':'sampleDesign'

        },

        initialize:function () {

            this.session = new Session.Model();
        },

        index:function (hash) {
            var indexPage = new IndexPage.View({session: this.session});
            indexPage.show();
        },

        userMain:function (hash) {

            var userMainPage = new UserMainPage.View({session: this.session});
            userMainPage.show();

        },

        qwizbookMain:function (id) {

            var qwizbookMainPage = new QwizbookMainPage.View({ session: this.session, qwizbookId:id });
            qwizbookMainPage.show()

        },

        sampleDesign:function (hash) {

            var sampleDesign = new SampleDesign.View({session: this.session});
            sampleDesign.show();
        }

    });

    return Router;

});