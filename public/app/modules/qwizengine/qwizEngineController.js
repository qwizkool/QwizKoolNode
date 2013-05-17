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
    "modules/qwizengine/qwizQuestionView",
    "modules/qwizengine/qwizClosingView"
], function (App, QwizOpeningView, QwizQuestionView, QwizClosingView) {

    // Create a new module
    var QwizEngine = App.module();

    QwizEngine.Controller = Backbone.View.extend({

        initialize: function () {

            // Need to know about
            // qwizbook
            // qwizbook FSM
            // qwizbook Tracking


            // For testing create and store all the views
            this.viewClassArray = new Array();

            // Starting view
            var view =  this.createView(QwizOpeningView);
            this.setCurrentView(view);

            // Store all view classes
            this.viewClassArray.push(QwizOpeningView);
            this.viewClassArray.push(QwizQuestionView);
            this.viewClassArray.push(QwizClosingView);

            // Initialize view index
            this.viewIndex = 0;


        },

        createView: function(viewClass) {

            var view = new viewClass.View();

            // Handle all possible user interaction events
            // Next, Previous, hint, done
            this.listenTo(view, "qwiz-transition-next", this.goToNextView);
            this.listenTo(view, "qwiz-transition-prev", this.goToPrevView);
            this.listenTo(view, "qwiz-transition-hint", this.goToHintView);
            this.listenTo(view, "qwiz-transition-done", this.goToExit);

            return view;

        },

        setCurrentView: function(view) {

            if (this.currentView) {
                this.stopListening(this.currentView);
                this.currentView.remove();
            }

            this.currentView = view;
            this.trigger('qwiz-transition-view');
            return view;
        },

        // Get the current View object
        getCurrentView: function () {

            return this.currentView;
        },


        // Go to the next View object
        goToNextView: function () {

            this.viewIndex++;
            var view =  this.createView(this.viewClassArray[this.viewIndex]);
            this.setCurrentView(view);

        },

        // Go to the previous View object
        goToPrevView: function () {
            this.viewIndex--;
            var view =  this.createView(this.viewClassArray[this.viewIndex]);
            this.setCurrentView(view);
        },

        // Go to the starting state of the engine.
        goToStartView: function () {

        },

        // Go to the starting state of the engine.
        goToHintView: function () {

        },


        goToExit: function () {
            this.trigger('qwiz-transition-exit');
        },


        remove: function () {

            this.stopListening();
            return this;

        }


    });

    return QwizEngine

});

