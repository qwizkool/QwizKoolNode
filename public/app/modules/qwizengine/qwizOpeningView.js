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
            this.qwizbook= this.options.model;
        },

        render: function () {

            var data = this.convertToViewData();
            this.$el.html(_.template(this.template, data));
            return this;

        },

        // Translation from qwizbook data format to whats required by this
        // view. allow flexibility and loose coupling.
        convertToViewData: function () {


            console.log(JSON.stringify(this.qwizbook,null,2));

            var data = {
                "title": this.qwizbook.get("title"),
                "chapterTitle" : this.qwizbook.get("subtitle"),
                "description" : this.qwizbook.get("description")
            }

            return data;
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
