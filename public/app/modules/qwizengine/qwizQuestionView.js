/*!
 * Copyright(c) 2013 Vibrentt
 *
 * Module : QwizQuestionView
 *
 *
 */

define([
    "app",
    "text!modules/qwizengine/templates/qwizQuestionView.html"
], function (App, Template) {

    // Create a new module
    var QwizQuestionView = App.module();

    QwizQuestionView.View = Backbone.View.extend({

        template: Template,

        initialize: function () {

        },

        render: function () {
            this.$el.html(_.template(this.template, this.model));
            return this;

        },


        events: {
            "click #qwiz-control-prev": "goToPrevView",
            "click #qwiz-control-next": "goToNextView",
            "click #qwiz-control-hint": "goToHintView",
            "click .qwiz-control-done": "goToDoneView"
        },

        goToNextView: function(e) {
            this.trigger('qwiz-transition-next');
        },
        goToPrevView: function(e) {
            this.trigger('qwiz-transition-prev');
        },
        goToHintView: function(e) {
            this.trigger('qwiz-transition-hint');
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

    return QwizQuestionView;

});
