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
    "modules/appToolbar",
    "modules/userSettings",
    "modules/footer",
    "modules/qwizbook/qwizbookAddDetailsContent",
     "text!templates/myQwizbooksContent.html"
],
    function (App, Header, AppToolbar, UserSettings, Footer, QwizbookAddDetailsContent,Template) {
        // Create a new module
        var QwizbookAddContent = App.module();

        QwizbookAddContent.View = Backbone.View.extend({

            initialize:function () {
            	if (_.isEmpty(this.options.session)) {
                throw "ERROR: Session object is not provided for the view!!"
            		}

            	this.session = this.options.session;
            	this.qwizbookId = this.options.qwizbookId;
            	this.userSettings = new UserSettings.View({session: this.session});
                this.appToolbar = new AppToolbar.View({session: this.session, location: "my-qwizbooks"});
            	this.header = new Header.View({htbuView: this.userSettings, htblView: this.appToolbar});
           	    this.footer = new Footer.View();
				this.qwizbookAddContent = new QwizbookAddDetailsContent.View({ el: '#qwizkool-content',qwizbookId:this.qwizbookId,session: this.session});
            },

            // Render all the nested views related to this page
            // and attach it to the DOM.
            show: function () {

                $('#qwizkool-header').html(this.header.render().el);
                $('#qwizkool-footer').html(this.footer.render().el);
                $('#qwizkool-content').html(this.qwizbookAddContent.render().el);

            },

            remove: function() {

                this.$el.remove();
                this.stopListening();
                this.header.remove();
                this.footer.remove();
                this.qwizbookAddContent.remove()
                return this;

            }
        });

        return QwizbookAddContent;

    });