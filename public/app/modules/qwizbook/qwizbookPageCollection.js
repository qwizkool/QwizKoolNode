
define([
    "app",
    "modules/qwizbook/qwizbookPageModel",
    ], function (App, QwizbookPage) {

        QwizbookPage.Collection = Backbone.Collection.extend({

            model: QwizbookPage.Model

    })
    return QwizBookPage;
})