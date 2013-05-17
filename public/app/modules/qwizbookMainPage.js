/*!
 * Copyright(c) 2013 Vibrentt
 *
 * Module : QwizbookMainPage
 *
 *
 */
define([
    "app",
    "modules/header",
    "modules/qwizbook",
    "modules/comments",
    "modules/userSettings",
    "modules/qwizbookContent",
    "modules/qwizbookComments",
    "modules/footer"
], function (App, Header, Qwizbook, Comments, UserSettings, QwizbookContent, QwizbookComments, Footer) {

    // Create a new module
    var QwizbookMainPage = new App.module();

    // Top level view for the qwizkool
    QwizbookMainPage.View = Backbone.View.extend({


        initialize:function () {

            if (_.isEmpty(this.options.session)) {
                throw "ERROR: Session object is not provided for the view!!"
            }

            this.session = this.options.session;

            // Create and associate the user setting view with the tool bar upper
            // view in the Header.
            this.userSettings = new UserSettings.View({session:this.session});

            this.header = new Header.View({htbuView:this.userSettings});

            this.footer = new Footer.View();


            this.qbookid = this.options.qwizbookId;
            this.qwizbookContent = new QwizbookContent.View({qwizbookId:this.qbookid, session:this.session});

        },



        // Render all the nested views related to this page
        // and attach it to the DOM.
        show: function () {

            $('#qwizkool-header').html(this.header.render().el);
            $('#qwizkool-footer').html(this.footer.render().el);
            $('#qwizkool-content').html(this.qwizbookContent.render().el);

        },

        remove: function() {

            this.$el.remove();
            this.stopListening();
            this.header.remove();
            this.footer.remove();
            this.qwizbookContent.remove()
            return this;

        }
    });

    return QwizbookMainPage;
});

