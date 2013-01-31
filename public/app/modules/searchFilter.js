define(["app", "modules/qwizbook", "modules/searchFilter"], function (App, QwizBook, Searchfilter) {

    // Create a new module
    var Searchfilter = App.module();

    Searchfilter.View = Backbone.View.extend({

        template:"app/templates/searchFilter.html",

        initialize:function () {

        },

        render:function (done) {

            var view = this;

            // Fetch the template, render it to the View element and call done.
            App.fetchTemplate(this.template, function (tmpl) {
                view.el.innerHTML = tmpl();

                // If a done function is passed, call it with the element
                if (_.isFunction(done)) {
                    done(view.el);
                }

            });
        },

        events:{
            "keydown #user-search-input":"setsearchParams",
            "change #user-filter-input":"setfilterParams"
        },

        reattachEvents:function () {
            this.undelegateEvents();
            this.delegateEvents(this.events);
        },

        setsearchParams:function () {

            //triggering usermaincontent.js event to get the input value and change the URL
            this.trigger('searchorfilter', {listcriteria:$('#user-search-input').val(), listwithsearchorfilter:'user-search-input', liston:this.options.collection});

        },

        setfilterParams:function () {

            //triggering usermaincontent.js event to get the dropdown value and change the URL
            this.trigger('searchorfilter', {listcriteria:$('#user-filter-input').val(), listwithsearchorfilter:'user-filter-input', liston:this.options.collection});

        }
    });

    // Required, return the module for AMD compliance
    return Searchfilter;

});
