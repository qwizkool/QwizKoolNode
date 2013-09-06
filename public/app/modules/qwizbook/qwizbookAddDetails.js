/*!
 * Copyright(c) 2013 Vibrentt
 *
 * Module : QwizbookAuthoring
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
    var Header = require('modules/header/headerInternal');
    var QwizbookAddDetailsContent = require('modules/qwizbook/qwizbookAddDetailsContent');
    var Footer = require('modules/footer/footer');


    // Create a new module
    var QwizbookAddContent = App.module();

    QwizbookAddContent.View = Backbone.View.extend({

        initialize: function () {
            if (_.isEmpty(this.options.session)) {
                throw "ERROR: Session object is not provided for the view!!"
            }

            this.session = this.options.session;
            this.qwizbookId = this.options.qwizbookId;
            this.header = new Header.View({session: this.session});
            this.footer = new Footer.View();
            this.qwizbookAddContent = new QwizbookAddDetailsContent.View({qwizbookId: this.qwizbookId, session: this.session});
        },

        // Render all the nested views related to this page
        // and attach it to the DOM.
        show: function () {

            $('#qwizkool-header').html(this.header.render().el);
            $('#qwizkool-footer').html(this.footer.render().el);
            $('#qwizkool-content').html(this.qwizbookAddContent.render().el);

        },

        remove: function () {

            this.$el.remove();
            this.stopListening();
            this.header.remove();
            this.footer.remove();
            this.qwizbookAddContent.remove()
            return this;

        }
    });

    module.exports = QwizbookAddContent;

});
