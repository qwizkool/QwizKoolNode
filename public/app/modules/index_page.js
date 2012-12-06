define([
    "app",

    // Libs


    // Modules
    "modules/frontpage",
    "modules/header",
    "modules/qwizkool_main",
    "modules/footer",
], function (namespace, FrontPage, Header, QwizkoolMain, Footer) {

    // Create a new module
    var IndexPage = new namespace.module();

    // Top level view for the qwizkool
    IndexPage.View = Backbone.View.extend({

        initialize:function () {
            this.frontPage = new FrontPage.View();
            this.header = new Header.View();
            this.qwizkoolMain = new QwizkoolMain.View();
            this.footer = new Footer.View();

            this.qwizkoolMain.on("login-attempted", this.logInHandler, this);
            this.qwizkoolMain.on("registration-attempted", this.registrationHandler, this);

        },

        render:function (done) {

            var thisView = this;
            // Attach the tutorial to the DOM
            thisView.frontPage.render(function (el) {
                $("#main").html(el);

                thisView.header.render(function (el) {
                    $("#header").html(el);

                    thisView.header.renderSettings();

                });

                thisView.qwizkoolMain.render(function (el) {
                    $("#qwizkool_main").html(el);
                });


                thisView.footer.render(function (el) {
                    $("#footer").html(el);
                });
            });
        },

        logInHandler:function () {
            this.qwizkoolMain.renderLogInStatus(function (el) {
                $("#qwizkool_main").html(el);
            });
        },

        registrationHandler : function() {
            // alert("registrationHandler");
            // Render the registration view.
            this.qwizkoolMain.renderRegistrationStatus(function(el) {
                $("#qwizkool_main").html(el);
            });

        },
        logOutHandler:function () {
            var thisView = this;
            thisView.signIn.render(function (el) {
                $("#sign_in_form_loc").html(el);
                thisView.signIn.reattachEvents();
            });
        }
    });

    return IndexPage;
}); 
