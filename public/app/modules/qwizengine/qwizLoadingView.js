/*!
 * Copyright(c) 2013 Vibrentt
 *
 * Module : QwizLoadingView
 *
 *
 */

define([
    "app",
    "text!modules/qwizengine/templates/qwizLoadingView.html"
], function (App, Template) {

    // Create a new module
    var QwizLoadingView = App.module();

    QwizLoadingView.View = Backbone.View.extend({

        template: Template,

        initialize: function () {

        },

        render: function () {
            //  Todo: FINAL CODE ,to be enabled once model is passed
            // this.$el.html(_.template(this.template, this.options.model.toJSON()));

            // Todo : --TEST STUB START--
            var data = {
                 "message" : "Loading qwizbook, Please Wait .."
            }


            this.$el.html(_.template(this.template, data));
            // -- TEST STUB END--
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

    return QwizLoadingView;

});
