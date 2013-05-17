/*!
 * Copyright(c) 2013 Vibrentt
 *
 * Module : qwizEngineController
 *
 *
 */

define([
    "app",
    "modules/qwizengine/qwizOpeningView",
    "modules/qwizengine/qwizClosingView"
], function (App, QwizOpeningView, QwizClosingView) {

    // Create a new module
    var QwizEngine = App.module();

    QwizEngine.Controller = Backbone.View.extend({

        initialize: function () {

            // Need to know about
            // qwizbook
            // qwizbook FSM
            // qwizbook Tracking

            var view =  this.createView(QwizOpeningView);
            this.setCurrentView(view);

        },

        createView: function(viewClass) {
            var view = new viewClass.View();

            // Handle all possible user interaction events
            // Next, Previous, hint, done
            this.listenTo(view, "qwiz-transition-next", this.goToNextState);
            this.listenTo(view, "qwiz-transition-prev", this.goToPrevState);
            this.listenTo(view, "qwiz-transition-hint", this.goToHintState);
            this.listenTo(view, "qwiz-transition-done", this.goToEndState);

            return view;

        },

        setCurrentView: function(view) {

            if (this.currentObject) {
                this.stopListening(this.currentObject);
                this.currentObject.remove();
            }

            this.currentObject = view;
            this.trigger('qwiz-transition-view');
            return view;
        },

        // Get the current View object
        getCurrentView: function () {

            return this.currentObject;
        },


        // Go to the next View object
        goToNextState: function () {


            var view =  this.createView(QwizClosingView);
            this.setCurrentView(view);

            return view;
        },

        // Go to the previous View object
        goToPrevState: function () {
            var view =  this.createView(QwizOpeningView);
            this.setCurrentView(view);
            return view;

        },

        // Go to the starting state of the engine.
        goToStartState: function () {

        },

        // Go to the starting state of the engine.
        goToHintState: function () {

        },

        // Go to the latest state of the engine.
        goToEndState: function () {
            this.trigger('qwiz-transition-exit');
        },


        remove: function () {

            this.stopListening();
            return this;

        }


    });

    return QwizEngine

});

