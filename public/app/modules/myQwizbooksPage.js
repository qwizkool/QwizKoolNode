/*!
 * Copyright(c) 2013 Vibrentt
 *
 * Module : myQwizbooksPage
 * Page container that holds all my qwizbooks.
 *
 */
define([
    "app",
    "modules/header/headerInternal",
    "modules/footer/footer",
    "modules/myQwizbooksContent"
],
    function (App, Header,  Footer,  MyQwizbooksContent) {
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

            remove: function() {

                this.$el.remove();
                this.stopListening();
                this.header.remove();
                this.footer.remove();
                this.myQwizbookPageContent.remove()
                return this;
            }


        });

        return MyQwizbooksPage;

    });
