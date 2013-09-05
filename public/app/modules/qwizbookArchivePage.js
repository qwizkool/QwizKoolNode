/*!
 * Copyright(c) 2013 Vibrentt
 *
 * Module : QwizbookArchivePage
 *
 *
 */
define([
    "app",
    "modules/header/headerInternal",
    "modules/footer/footer",
    "modules/qwizbookArchiveContent"
],
    function (App, Header,  Footer,  QwizbookArchiveContent) {
        // Create a new module
        var QwizbookArchivePage = App.module();

        QwizbookArchivePage.View = Backbone.View.extend({

            initialize:function () {
            	if (_.isEmpty(this.options.session)) {
                throw "ERROR: Session object is not provided for the view!!"
            		}

            	this.session = this.options.session;
               this.header = new Header.View({session: this.session});
                this.footer = new Footer.View();
				this.archiveQwizbookContent = new QwizbookArchiveContent.View({session: this.session});
				this.archiveQwizbookContent.clear();
            },

            show:function (done) {
                $('#qwizkool-header').html(this.header.render().el);
                $('#qwizkool-footer').html(this.footer.render().el);
                $('#qwizkool-content').html(this.archiveQwizbookContent.render().el);
            },

            remove: function() {
                this.$el.remove();
                this.stopListening();
                this.header.remove();
                this.footer.remove();
                this.archiveQwizbookContent.remove()
                return this;
            }
        });

        return QwizbookArchivePage;

    });
