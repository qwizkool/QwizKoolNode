define([
    "app",
    "text!templates/qwizbookBreadcrumbs.html"
], function (App,Template) {

    // Create a new module
    var Breadcrumb = App.module();

    // Footer extendings
    Breadcrumb.Model = Backbone.Model.extend({ /* ... */ });
    Breadcrumb.Collection = Backbone.Collection.extend({ /* ... */ });
    Breadcrumb.Router = Backbone.Router.extend({ /* ... */ });

    Breadcrumb.View = Backbone.View.extend({

        template:Template,

        render:function (done) {

            this.el.innerHTML = this.template;
            return this;
        }
    });

    // Required, return the module for AMD compliance
    return Breadcrumb;

});