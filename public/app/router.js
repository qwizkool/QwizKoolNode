define([
    // Application.
    "app",
    "bootstrap",
    // Modules
    "modules/user",
    "modules/qwizbook",
    "modules/indexPage",
    "modules/userMainPage",
    "modules/qwizbookMainPage",
    "modules/sampleDesign",
    "modules/sampleqwizbookAuthoring",
    "modules/qwizbookAuthoring"
], function (App, Bootstrap, User, Qwizbook, IndexPage, UserMainPage,QwizbookMainPage, SampleDesign, SampleQwizbookAuthoring, QwizbookAuthoring) {

    // Defining the application router, you can attach sub routers here.
    var Router = Backbone.Router.extend({

        routes:{
            '':'index',
            'main':'userMain',
            'qwizbookDetails/:id':'qwizbookMain',
            'design' : 'sampleDesign',
            'sampleAuthorQwizbook' : 'sampleAuthorQwizbookDesign',
            'authorQwizbook' : 'authorQwizbook'

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

             // Fetch the specified qwizbook and then trigger all the view creation.
             var selectedQwizbook = new Qwizbook.Model({id:id});

        	 var qwizbookMainPage = new QwizbookMainPage.View({ qwizbookId: id });
             qwizbookMainPage.show();
        },
        
        sampleDesign : function(hash)  {
        	

            var sampleDesign = new SampleDesign.View();
            sampleDesign.show();
        },
        
        sampleAuthorQwizbookDesign : function(hash)  {
        	

            var sampleAuthorQwizbookDesign = new SampleQwizbookAuthoring.View();
            sampleAuthorQwizbookDesign.show();
        },
        
        authorQwizbook : function(hash)  {
        	

            var authorQwizbook = new QwizbookAuthoring.View();
            authorQwizbook.show();
        }

    });
 
    return Router;

});