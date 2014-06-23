/*!
 * Copyright(c) 2013 Vibrentt
 *
 * Module : QwizbookArchivePage
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
    var QwizbookArchiveContent = require('modules/qwizbookArchiveContent');
    var Footer = require('modules/footer/footer');

    // Create a new module
    var QwizbookArchivePage = App.module();

    QwizbookArchivePage.View = Backbone.View.extend({

        initialize: function () {
            if (_.isEmpty(this.options.session)) {
                throw "ERROR: Session object is not provided for the view!!"
            }

            this.session = this.options.session;
            this.header = new Header.View({session: this.session});
            this.listenTo(this.header, "search", this.refreshSearch);
            this.footer = new Footer.View();
            this.archiveQwizbookContent = new QwizbookArchiveContent.View({session: this.session});
            this.archiveQwizbookContent.clear();
        },

        refreshSearch: function (e) {

            this.archiveQwizbookContent.refreshCollectionForSearchEvent(e);
        },

        show: function (done) {
            $('#qwizkool-header').html(this.header.render().el);
            $('#qwizkool-footer').html(this.footer.render().el);
            $('#qwizkool-content').html(this.archiveQwizbookContent.render().el);
        },

        remove: function () {
            this.$el.remove();
            this.stopListening();
            this.header.remove();
            this.footer.remove();
            this.archiveQwizbookContent.remove()
            return this;
        }
    });

    module.exports = QwizbookArchivePage;

});
