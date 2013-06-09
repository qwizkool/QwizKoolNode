/*!
 * Copyright(c) 2013 Vibrentt
 *
 * Module : QwizQuestionView
 *
 *
 */

define([
    "app",
    "text!modules/qwizengine/templates/qwizQuestionView.html",
    "text!modules/qwizengine/templates/imageLinks.html",
    "text!modules/qwizengine/templates/audioLinks.html",
    "text!modules/qwizengine/templates/videoLinks.html"
], function (App, Template,ImageLinkTmpl,AudioLinkTmpl, VideoLinkTmpl) {

    // Create a new module
    var QwizQuestionView = App.module();

    QwizQuestionView.View = Backbone.View.extend({

        template: Template,

        initialize: function () {

            _.declarePartial('imageLinks', ImageLinkTmpl);
            _.declarePartial('audioLinks', AudioLinkTmpl);
            _.declarePartial('videoLinks', VideoLinkTmpl);

        },

        render: function () {

            this.$el.html(_.template(this.template, this.options.model.toJSON()));
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
