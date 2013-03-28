define([
    "app",
    "modules/user",
    "text!templates/searchFilter.html"
], function (App, User, Template) {

    // Create a new module
    var Searchfilter = App.module();

    Searchfilter.View = Backbone.View.extend({

        template:Template,

        initialize:function () {
				this.model = new User.Model();
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
            this.trigger('search', {criteria:$('#user-search-input').val()});
        },

        setfilterParams:function () {
            this.trigger('filter', {criteria:$('#user-filter-input option:selected').text()});

        }
    });

    return Searchfilter;

});
