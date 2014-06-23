
define([
    "app",
    "modules/qwizbook/pageReferenceModel",
    ], function (App,PageReference) {
        PageReference.Collection = Backbone.Collection.extend({

            model : PageReference.Model,
            url :"/pageReference/",

            save: function(callback){
                Backbone.sync("create", this, {
                    error:function (collection, response) {
                        collection.trigger('fail-pagerefs-event');
                    },
                    success: function(model, response){
                        callback(model, response);
                    }
                });
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