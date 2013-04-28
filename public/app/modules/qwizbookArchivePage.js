/*!
 * Copyright(c) 2013 Vibrentt
 *
 * Module : QwizbookArchivePage
 *
 *
 */
define([
    "app",
    "modules/header",
    "modules/userSettings",
    "modules/footer",
    "modules/appToolbar",
    "modules/qwizbookArchiveContent"
],
    function (App, Header, UserSettings, Footer, AppToolbar, QwizbookArchiveContent) {
        // Create a new module
        var QwizbookArchivePage = App.module();

        QwizbookArchivePage.View = Backbone.View.extend({

            initialize:function () {
            	if (_.isEmpty(this.options.session)) {
                throw "ERROR: Session object is not provided for the view!!"
            		}

            	this.session = this.options.session;
            	this.userSettings = new UserSettings.View({session: this.session});
                this.appToolbar = new AppToolbar.View({session: this.session});
                this.header = new Header.View({htbuView: this.userSettings, htblView: this.appToolbar});
                this.footer = new Footer.View();
				this.archiveQwizbookContent = new QwizbookArchiveContent.View({ el: '#qwizkool-content',session: this.session});
				this.archiveQwizbookContent.clear();
            },

            show:function (done) {
        		this.header.render();
           		this.footer.render();
                this.archiveQwizbookContent.render();
            }
        });

        return QwizbookArchivePage;

    });