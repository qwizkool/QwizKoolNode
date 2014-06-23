/*!
 * Copyright(c) 2013 Vibrentt
 *
 * Module : PageNotFoundPage
 * PageNotFoundPage renders the broken link or page not found page of the qwizkool.
 *
 */
define([
    "app",
    "modules/header/headerInternal",
    "modules/pageNotFoundContent",
    "modules/footer/footer"
], function (App, Header, PageNotFound, Footer) {

    // Create a new module
    var PageNotFoundPage = new App.module();

    // Landing page for the qwizkool.
    PageNotFoundPage.View = Backbone.View.extend({

        initialize:function () {

            this.session = this.options.session;
            this.header = new Header.View({session: this.session});
            this.footer = new Footer.View();
            this.PageNotFound = new PageNotFound.View();

        },


        // Render all the nested views related to this page
        // and attach it to the DOM.
        show: function () {

            $('#qwizkool-header').html(this.header.render().el);
            $('#qwizkool-footer').html(this.footer.render().el);
            $('#qwizkool-content').html(this.PageNotFound.render().el);

        },

        remove: function() {

            this.$el.remove();
            this.stopListening();
            this.header.remove();
            this.footer.remove();
            this.PageNotFound.remove()
            return this;

        }
    });

    return PageNotFoundPage;
});
