define([
    "app",
    "text!templates/footer.html"
], function (App,Template) {

    // Create a new module
    var Footer = App.module();

    // Footer extendings
    Footer.Model = Backbone.Model.extend({ /* ... */ });
    Footer.Collection = Backbone.Collection.extend({ /* ... */ });
    Footer.Router = Backbone.Router.extend({ /* ... */ });

    Footer.View = Backbone.View.extend({

        template:Template,

        render:function (done) {

            this.el.innerHTML = this.template;
            return this;
        }
    });

    // Required, return the module for AMD compliance
    return Footer;

});