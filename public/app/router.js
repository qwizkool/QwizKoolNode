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
            if (_.isEmpty(this.session)) {
                this.session = new Session.Model();
                this.session.isSessionValid();
            }

        },

        index:function (hash) {
            if (this.session.isUserAuthenticated() === true) {
                Backbone.history.navigate("main", true);
                return;
            }

            var indexPage = new IndexPage.View({session: this.session});
            indexPage.show();
        },

        userMain:function (hash) {
            if (this.session.isUserAuthenticated() === false) {
                Backbone.history.navigate("", true);
                return;
            }
            var userMainPage = new UserMainPage.View({session: this.session});
            userMainPage.show();
        },

        qwizbookMain:function (id) {
            if (this.session.isUserAuthenticated() === false) {
                Backbone.history.navigate("", true);
                return;
            }
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