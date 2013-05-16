/*!
 * Copyright(c) 2013 Vibrentt
 *
 * Module : QwizPageView
 * The top level page that renders the qwiz.
 *
 */

define([
    "app",
    "modules/qwizengine/qwizEngineView"
], function (App, QwizEngineView) {

    // Create a new module
    var QwizPage = new App.module();

    QwizPage.View = Backbone.View.extend({

        initialize: function () {
            if (_.isEmpty(this.options.session)) {
                throw "ERROR: Session object is not provided for the view!!"
            }

            this.session = this.options.session;

            this.qwizEngineView = new QwizEngineView.View({session: this.session});
        },

        show: function (done) {

            $('#qwizkool-content').html(this.qwizEngineView.render().el);

        },

        remove: function() {

            this.$el.remove();
            this.stopListening();

            this.qwizEngineView.remove()
            return this;
        }


    });

    return QwizPage;
});
