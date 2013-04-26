/*!
 * Copyright(c) 2013 Vibrentt
 *
 * Module : myQwizbooksPage
 * Page container that holds all my qwizbooks.
 *
 */
define([
    "app",
    "modules/header",
    "modules/userSettings",
    "modules/footer",
    "modules/appToolbar",
    "modules/myQwizbooksContent"
],
    function (App, Header, UserSettings, Footer,AppToolbar,  MyQwizbooksContent) {
        // Create a new module
        var QwizbookAuthoring = App.module();

        QwizbookAuthoring.View = Backbone.View.extend({

            initialize:function () {
            	if (_.isEmpty(this.options.session)) {
                throw "ERROR: Session object is not provided for the view!!"
            		}

            	this.session = this.options.session;
            	this.userSettings = new UserSettings.View({session: this.session});
            	this.appToolbar = new AppToolbar.View({session: this.session});
            	this.header = new Header.View({htbuView:this.userSettings,htblView:this.appToolbar});
           	    this.footer = new Footer.View();
				this.qwizbookAuthoringContent = new MyQwizbooksContent.View({ el: '#qwizkool-content',session: this.session});
				//this.qwizbookAuthoringContent.clear();
            },

            show:function (done) {
        		this.header.render();
           		this.footer.render();
           		this.qwizbookAuthoringContent.render();
            }
            
           
        });

        return QwizbookAuthoring;

    });