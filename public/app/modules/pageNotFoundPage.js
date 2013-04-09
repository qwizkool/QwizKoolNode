/*!
 * Copyright(c) 2013 Vibrentt
 *
 * Module : PageNotFoundPage
 * PageNotFoundPage renders the broken link or page not found page of the qwizkool.
 *
 */
define([
    "app",
    "modules/header",
    "modules/pageNotFoundContent",
    "modules/footer"
], function (App, Header, PageNotFound, Footer) {

    // Create a new module
    var PageNotFoundPage = new App.module();

    // Landing page for the qwizkool.
    PageNotFoundPage.View = Backbone.View.extend({

        initialize:function () {

            this.session = this.options.session;
            this.header = new Header.View();
            this.footer = new Footer.View();

            this.PageNotFound = new PageNotFound.View({el:'#qwizkool-content'});

        },


        // Render all the nested views related to this page
        // and attach it to the DOM.
        show:function () {

            this.header.render();
            this.PageNotFound.render();
            this.footer.render();

        }
    });

    return PageNotFoundPage;
});
