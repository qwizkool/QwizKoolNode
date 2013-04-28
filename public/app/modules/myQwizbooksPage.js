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
    function (App, Header, UserSettings, Footer, AppToolbar, MyQwizbooksContent) {
        // Create a new module
        var MyQwizbooksPage = App.module();

        MyQwizbooksPage.View = Backbone.View.extend({

            initialize: function () {
                if (_.isEmpty(this.options.session)) {
                    throw "ERROR: Session object is not provided for the view!!"
                }

                this.session = this.options.session;
                this.userSettings = new UserSettings.View({session: this.session});
                this.appToolbar = new AppToolbar.View({session: this.session});
                this.header = new Header.View({htbuView: this.userSettings, htblView: this.appToolbar});
                this.footer = new Footer.View();
                this.myQwizbookPageContent = new MyQwizbooksContent.View({session: this.session});
            },

            show: function (done) {

                this.header.render();
                this.footer.render();

                $('#qwizkool-content').html(this.myQwizbookPageContent.render().el);

            },

            remove: function() {

                this.$el.remove();
                this.stopListening();

                this.myQwizbookPageContent.remove()
                return this;
            }


        });

        return MyQwizbooksPage;

    });