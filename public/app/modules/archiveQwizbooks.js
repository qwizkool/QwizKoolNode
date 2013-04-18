/*!
 * Copyright(c) 2013 Vibrentt
 *
 * Module : QwizbookAuthoring
 *
 *
 */
define([
    "app",
    "modules/header",
    "modules/userSettings",
    "modules/footer",
    "modules/archiveQwizbookContent"
],
    function (App, Header, UserSettings, Footer,  ArchiveQwizbookContent) {
        // Create a new module
        var ArchiveQwizbook = App.module();

        ArchiveQwizbook.View = Backbone.View.extend({

            initialize:function () {
            	if (_.isEmpty(this.options.session)) {
                throw "ERROR: Session object is not provided for the view!!"
            		}

            	this.session = this.options.session;
            	this.userSettings = new UserSettings.View({session: this.session});
            	this.header = new Header.View({htbuView:this.userSettings});
           	    this.footer = new Footer.View();
				this.archiveQwizbookContent = new ArchiveQwizbookContent.View({ el: '#qwizkool-content',session: this.session});
				this.archiveQwizbookContent.clear();
            },

            show:function (done) {
        		this.header.render();
           		this.footer.render();
                this.archiveQwizbookContent.render();
            }
        });

        return ArchiveQwizbook;

    });