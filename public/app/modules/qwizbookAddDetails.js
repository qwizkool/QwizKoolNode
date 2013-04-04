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
    "modules/qwizbookAddDetailsContent"
],
    function (App, Header, UserSettings, Footer, QwizbookAddDetailsContent) {
        // Create a new module
        var QwizbookAddContent = App.module();

        QwizbookAddContent.View = Backbone.View.extend({

            initialize:function () {
            	if (_.isEmpty(this.options.session)) {
                throw "ERROR: Session object is not provided for the view!!"
            		}

            	this.session = this.options.session;
            	this.userSettings = new UserSettings.View({session: this.session});
            	this.header = new Header.View({htbuView:this.userSettings});
           	    this.footer = new Footer.View();
				this.qwizbookAddContent = new QwizbookAddDetailsContent.View({ el: '#qwizkool-content',session: this.session});
				
            },

            show:function (done) {
        		this.header.render();
           		this.footer.render();
                this.qwizbookAddContent.render();
            }
        });

        return QwizbookAddContent;

    });