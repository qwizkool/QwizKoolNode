/*!
 * Copyright(c) 2013 Vibrentt
 *
 * Module : UserMainPage
 *
 *
 */

define([
    "app",
    "modules/header/headerInternal",
    "modules/qwizkoolHomeContent",
    "modules/footer/footer"
], function (App, Header, QwizkoolHomeContent, Footer) {

    // Create a new module
    var UserMainPage = new App.module();

    // Top level view for the qwizkool
    UserMainPage.View = Backbone.View.extend({

        initialize: function () {

            if (_.isEmpty(this.options.session)) {
                throw "ERROR: Session object is not provided for the view!!"
            }

            this.session = this.options.session;

            // Create the header view
            this.header = new Header.View({session: this.session});

            this.footer = new Footer.View();

            this.qwizkoolHomeContent = new QwizkoolHomeContent.View({session: this.session});

        },


        // Render all the nested views related to this page
        // and attach it to the DOM.
        show: function () {

            $('#qwizkool-header').html(this.header.render().el);
            $('#qwizkool-footer').html(this.footer.render().el);
            $('#qwizkool-content').html(this.qwizkoolHomeContent.render().el);

        },

        remove: function() {

            this.$el.remove();
            this.stopListening();
            this.header.remove();
            this.footer.remove();
            this.qwizkoolHomeContent.remove()
            return this;

        }

    });

    return UserMainPage;
}); 
