/*!
 * Copyright(c) 2013 Vibrentt
 *
 * Module : myQwizbooksPage
 * Page container that holds all my qwizbooks.
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
    var MyQwizbooksContent = require('modules/myQwizbooksContent');
    var Footer = require('modules/footer/footer');

    // Create a new module
    var MyQwizbooksPage = App.module();

    MyQwizbooksPage.View = Backbone.View.extend({

        initialize: function () {
            if (_.isEmpty(this.options.session)) {
                throw "ERROR: Session object is not provided for the view!!"
            }

            this.session = this.options.session;
            this.header = new Header.View({session: this.session});
            this.footer = new Footer.View();
            this.myQwizbookPageContent = new MyQwizbooksContent.View({session: this.session});
        },

        show: function (done) {

            $('#qwizkool-header').html(this.header.render().el);
            $('#qwizkool-footer').html(this.footer.render().el);
            $('#qwizkool-content').html(this.myQwizbookPageContent.render().el);

        },

        remove: function () {

            this.$el.remove();
            this.stopListening();
            this.header.remove();
            this.footer.remove();
            this.myQwizbookPageContent.remove()
            return this;
        }


    });

    module.exports = MyQwizbooksPage;

});
