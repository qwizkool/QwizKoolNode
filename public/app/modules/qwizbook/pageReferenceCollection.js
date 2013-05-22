
define([
    "app",
    "modules/qwizbook/pageReferenceModel",
    ], function (App,PageReference) {
        PageReference.Collection = Backbone.Collection.extend({

            model : PageReference.Model,
            url :"/pageReference/",

            save: function(options){
                Backbone.sync("create", this, options);
            },

            getAll: function(callback){
                var jqxhr = this.fetch({
                reset: true,
                error:function (collection, response) {
                    collection.trigger('fail-pagerefs-event');
                },

                success:function (collection, response) {
                    if (response == null) {
                        collection.trigger('no-pagerefs-tolist');
                    }
                    else{
                        collection.trigger('list-pagerefs-event'); 
                        callback(collection);
                    }
                }
            });
            }

    })

    return PageReference;

})