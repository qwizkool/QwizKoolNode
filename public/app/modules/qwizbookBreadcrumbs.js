/*!
 * Copyright(c) 2013 Vibrentt
 *
 * Module : QwizbookBreadcrumbs
 *
 *
 */
define([
    "app",
    "text!templates/qwizbookBreadcrumbs.html"
], function (App, Template) {

    // Create a new module
    var QwizbookBreadcrumbs = App.module();

    // Footer extendings
    QwizbookBreadcrumbs.Model = Backbone.Model.extend({ /* ... */ });
    QwizbookBreadcrumbs.Collection = Backbone.Collection.extend({ /* ... */ });
    QwizbookBreadcrumbs.Router = Backbone.Router.extend({ /* ... */ });

    QwizbookBreadcrumbs.View = Backbone.View.extend({

        template:Template,

        render:function (done) {

            this.el.innerHTML = this.template;
            return this;
        }
    });

    // Required, return the module for AMD compliance
    return QwizbookBreadcrumbs;

});