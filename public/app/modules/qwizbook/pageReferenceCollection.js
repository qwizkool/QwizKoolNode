
define([
    "app",
    "modules/qwizbook/pageReferenceModel",
    ], function (App,PageReference) {
        PageReference.Collection = Backbone.Collection.extend({

            model: PageReference.Model

    })

})