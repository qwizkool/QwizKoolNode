/*!
 * Copyright(c) 2013 Vibrentt
 *
 * Module : QwizbookMainPage
 *
 *
 */

define(function (require, exports, module) {

    /**
     * Module dependencies.
     */
    var App = require('app');
    var Backbone = require('backbone');
    var _ = require('underscore');
    var $ = require('jquery');
    var BootstrapRating = require('bootstrapRating');
    var Header = require('modules/header/headerInternal');
    var QwizbookContent = require('modules/qwizbookContent');
    var Footer = require('modules/footer/footer');

    // Create a new module
    var QwizbookMainPage = new App.module();

    // Top level view for the qwizkool
    QwizbookMainPage.View = Backbone.View.extend({

        initialize: function () {

            if (_.isEmpty(this.options.session)) {
                throw "ERROR: Session object is not provided for the view!!"
            }

            this.session = this.options.session;

            this.header = new Header.View({session: this.session, search: false});
            this.footer = new Footer.View();

            this.qbookid = this.options.qwizbookId;
            this.qwizbookContent = new QwizbookContent.View({qwizbookId: this.qbookid, session: this.session});

        },

        // Render all the nested views related to this page
        // and attach it to the DOM.
        show: function () {

            $('#qwizkool-header').html(this.header.render().el);
            $('#qwizkool-footer').html(this.footer.render().el);
            $('#qwizkool-content').html(this.qwizbookContent.render().el);

        },

        remove: function () {

            this.$el.remove();
            this.stopListening();
            this.header.remove();
            this.footer.remove();
            this.qwizbookContent.remove()
            return this;

        }
    });

    module.exports = QwizbookMainPage;

});

