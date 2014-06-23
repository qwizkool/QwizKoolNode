/*!
 * Copyright(c) 2013 Vibrentt
 *
 * Module : QwizkoolHomePage
 *
 *
 */

define(function (require, exports, module) {

    /**
     * Module dependencies.
     */
    var App = require('app');
    var    Backbone = require('backbone');
    var     _ = require('underscore');
    var     $ = require('jquery');
    var     Header = require('modules/header/headerInternal');
    var    QwizkoolHomeContent = require('modules/qwizkoolHomeContent');
    var     Footer = require('modules/footer/footer');



    // Create a new module
    var QwizkoolHomePage = new App.module();

    // Top level view for the qwizkool
    QwizkoolHomePage.View = Backbone.View.extend({

        initialize: function () {

            if (_.isEmpty(this.options.session)) {
                throw "ERROR: Session object is not provided for the view!!"
            }

            this.session = this.options.session;

            // Create the header view
            this.header = new Header.View({session: this.session});
            this.listenTo(this.header, "search", this.refreshSearch);

            this.footer = new Footer.View();

            this.qwizkoolHomeContent = new QwizkoolHomeContent.View({session: this.session});




        },

        refreshSearch: function (e) {

           this.qwizkoolHomeContent.refreshCollectionForSearchEvent(e);
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




    module.exports = QwizkoolHomePage;


});


