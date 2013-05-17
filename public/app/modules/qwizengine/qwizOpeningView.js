/*!
 * Copyright(c) 2013 Vibrentt
 *
 * Module : QwizOpeningView
 *
 *
 */

define([
    "app",
    "text!modules/qwizengine/templates/qwizOpeningView.html"
], function (App, Template) {

    // Create a new module
    var QwizOpeningView = App.module();

    QwizOpeningView.View = Backbone.View.extend({

        template: Template,

        initialize: function () {

        },

        render: function () {
            this.$el.html(_.template(this.template, this.model));
            return this;

        },

        events: {
            "click .qwiz-control-done": "goToDoneView",
            "click #qwiz-control-next": "goToNextView"
        },

        goToNextView: function(e) {

            this.trigger('qwiz-transition-next');

        },
        goToDoneView: function(e) {
            this.trigger('qwiz-transition-done');
        },

        remove: function() {

            this.$el.remove();
            this.stopListening();

            return this;

        }


    });

    return QwizOpeningView;

});
