define([
    "app",
    // Modules
    "modules/qwizbook"
], function (namespace, QwizBook) {

    // Create a new module
    var UserMainContent = namespace.module();

    // This will fetch the tutorial template and render it.
    UserMainContent.View = Backbone.View.extend({
        template:"app/templates/userMainContent.html",

        render:function (done) {
            var view = this;

            // Fetch the template, render it to the View element and call done.
            namespace.fetchTemplate(this.template, function (tmpl) {
                view.el.innerHTML = tmpl();

                // If a done function is passed, call it with the element
                if (_.isFunction(done)) {
                    done(view.el);
                }

            });
        }
    });

    // Required, return the module for AMD compliance
    return UserMainContent;

});
