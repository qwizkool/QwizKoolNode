define([
    "app",
     "text!templates/searchFilter.html"
], function (App, Template) {

    // Create a new module
    var Searchfilter = App.module();

    Searchfilter.View = Backbone.View.extend({

        template: Template,

        initialize:function () {

        },

        render:function () {

            this.el.innerHTML = this.template;
            return this;

        },

        events:{
            "keyup #user-search-input":"setsearchParams",
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

    return Searchfilter;

});
