define([
    "app",
    "modules/breadcrumbs"
], function (App, Breadcrumbs) {

    // Create a new module
    var Breadcrumbs = App.module();

    Breadcrumbs.View = Backbone.View.extend({

        template:"app/templates/breadcrumbs.html",

        render:function (done) {

            var view = this;

            // Fetch the template, render it to the View element and call done.
            App.fetchTemplate(this.template, function (tmpl) {
                view.el.innerHTML = tmpl();
                alert(view);
                return view;

            });
        }

    });

    // Required, return the module for AMD compliance
    return Breadcrumbs;

});
