
define([
    "app",
    "modules/qwizbook/qwizbookPageModel",
    ], function (App, QwizbookPage) {

    QwizbookPage.Collection = Backbone.Collection.extend({
        model: QwizbookPage.Model,

        /**
        * 
        * Convinience function to fetch quizbook pages
        */
        getAllPages : function(){
            var jqxhr = this.fetch({
                // specify fetch to reset the collection instead
                // of add/merge using set.
                reset: true,
                error:function (collection, response) {
                    this.isListedPages = false;
                    collection.trigger('list-qwizbook-event');
                },

                success:function (collection, response) {
                    this.isListedPages = true;
                    if (response == null) {
                        collection.trigger('no-qwizbookpage-tolist');
                    }
                    collection.trigger('list-qwizbookpage-event');
                }
            });
        }

    })
    return QwizBookPage;
})