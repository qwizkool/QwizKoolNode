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
            //  Todo: FINAL CODE ,to be enabled once model is passed
            // this.$el.html(_.template(this.template, this.options.model.toJSON()));

            // Todo : --TEST STUB START--
            var data = {
                "title": "The Drunken Botanist: The Plants That Create the World's Great Drinks",
                "chapterTitle" : "Syrups, Infusions and Garnishes",
                "description" : "Every great drink starts with a plant and of course, this is obviously true. Beer starts from barley or other grains; wine, from grapes or other fruit. Vodka comes from grains or potatoes. Whisk(e)y arises from barley, corn, rye, or other grains."
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

    return QwizOpeningView;

});
