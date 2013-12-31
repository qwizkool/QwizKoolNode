/*!
 * Copyright(c) 2013 Vibrentt
 *
 * Module : QwizClosingView
 *
 *
 */

define([
    "app",
    "text!modules/qwizengine/templates/qwizClosingView.html"
], function (App, Template) {

    // Create a new module
    var QwizClosingView = App.module();

    QwizClosingView.View = Backbone.View.extend({

        template: Template,

        initialize: function () {
            this.qwizbook= this.options.model;
            this.tracker= this.options.tracker;
        },

        render: function () {

            var data = this.convertToViewData();
            this.$el.html(_.template(this.template, data));
            return this;

        },

        convertToViewData: function () {

            var data = {
                "title": this.qwizbook.get("title"),
                "chapterTitle" : this.qwizbook.get("subtitle"),
                "score" : this.tracker.getScore()
             };

            return data;
        },



        events: {
            "click #qwiz-control-prev": "goToPrevView",
            "click .qwiz-control-done": "goToDoneView"
        },

        goToDoneView: function(e) {
            this.trigger('qwiz-transition-done');
        },

        goToPrevView: function(e) {
            this.trigger('qwiz-transition-prev');
        },

        remove: function() {

            this.$el.remove();
            this.stopListening();

            return this;

        }


    });

    return QwizClosingView;

});
