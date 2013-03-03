define([
    // Application.
    "app",

    // Modules
    "modules/user",
    "modules/indexPage",
    "modules/userMainPage",
    "modules/qwizbookMainPage"
], function (App, User, IndexPage, UserMainPage,QwizbookMainPage) {

    // Defining the application router, you can attach sub routers here.
    var Router = Backbone.Router.extend({

        routes:{
            '':'index',
            'main':'userMain',
            'qwizbookDetails/:id':'qwizbookMain'

        },

        initialize:function () {
        },

        index:function (hash) {

            var currentUser = new User.Model();

            if (currentUser.isUserAuthenticated() === true) {
                Backbone.history.navigate("main", true);
                return;
            }

            var indexPage = new IndexPage.View();
            indexPage.show();



        },

        userMain:function (hash) {

            var currentUser = new User.Model();
            if (currentUser.isUserAuthenticated() === false) {
                Backbone.history.navigate("", true);
                return;
            }

            var userMainPage = new UserMainPage.View();
            userMainPage.show();


        },
        
        qwizbookMain:function (id){
        	 var qwizbookMainPage = new QwizbookMainPage.View({ qwizbookId: id });
             qwizbookMainPage.show();
        }

    });

    return Router;

});