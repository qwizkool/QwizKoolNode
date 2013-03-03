define([
    "app",
    "text!templates/breadcrumbs.html"
], function (App,  Templates) {

    // Create a new module
    var Breadcrumbs = App.module();

    Breadcrumbs.View = Backbone.View.extend({

        template:Templates,

        render:function (done) {

            var view = this;

            view.el.innerHTML = this.template;

            return view
        }

    });


    return Breadcrumbs;

});
