/*!
 * Copyright(c) 2013 Vibrentt
 *
 * Module : qwizEngineController
 *
 */
 
/* ---------- CommonJS wrapper ---------- */
define(function(require, exports, module) {
/* -------------------------------------- */


/**
 * Module dependencies.
 */
var QwizLoadingView = require("modules/qwizengine/qwizLoadingView");
var QwizEngineFSM = require("modules/qwizengine/qwizEngineFSM");

/**
 * QwizEngineController constructor.
 */
var QwizEngineController = function(userSession, qwizbookId) {

    this.qwizbookId = qwizbookId;
    this.qwizbookModel = null;

    // Mix-in event capability
    _.extend(this, Backbone.Events);

    // default loading view.
    var view =  this.createView(QwizLoadingView,{});
    this.setCurrentView(view);

};



/**
 * QwizEngineController initialize.
 */
QwizEngineController.prototype.initialize =  function (qwizbook) {

    // Associate with the qwizbook to be used.
    this.qwizbookModel = qwizbook;

    // Create and start the FSM
   	this.qwizEngineFSM = new QwizEngineFSM(qwizbook);
    this.qwizEngineFSM.initialize();
    

    // Start the opening view
    var nextViewObject = this.qwizEngineFSM.getOpeningViewObject();
    var view =  this.createView(nextViewObject.view,nextViewObject.options);
    this.setCurrentView(view);


};


/**
 * QwizEngineController method.
 */
QwizEngineController.prototype.createView = function(viewClass,options) {

    var view = new viewClass.View(options);

    // Handle all possible user interaction events

    // generic navigation Next, Previous, done
    this.listenTo(view, "qwiz-transition-next", this.goToNextView);
    this.listenTo(view, "qwiz-transition-prev", this.goToPrevView);
    this.listenTo(view, "qwiz-transition-done", this.goToExit);

    // Hint, reference etc are different levels of views
    this.listenTo(view, "qwiz-transition-hint", this.goToHintView);
    this.listenTo(view, "qwiz-transition-reinforce", this.goToReinforceView);

    // Once entered different level, use this event to come to the previous level
    // generic events like Next, Previous,  done are used to navigate in any level
    this.listenTo(view, "qwiz-transition-prev-level", this.changeToPreviousViewLevel);

    return view;

};


/**
 * QwizEngineController method.
 */
QwizEngineController.prototype.setCurrentView = function(view) {

    if (this.currentView) {
        this.stopListening(this.currentView);
        this.currentView.remove();
    }

    this.currentView = view;
    this.trigger('qwiz-transition-view');
    return view;
};


/**
 * QwizEngineController method.
 */
QwizEngineController.prototype.getCurrentView = function () {

    return this.currentView;
};


/**
 * QwizEngineController method.
 */
QwizEngineController.prototype.goToNextView = function () {

    var nextViewObject = this.qwizEngineFSM.getNextViewObject();
    var view =  this.createView(nextViewObject.view,nextViewObject.options);
    this.setCurrentView(view);

};


/**
 * QwizEngineController method.
 */
QwizEngineController.prototype.goToPrevView = function () {
    var nextViewObject = this.qwizEngineFSM.getPreviousViewObject();
    var view =  this.createView(nextViewObject.view,nextViewObject.options);
    this.setCurrentView(view);

};


/**
 * QwizEngineController method.
 */
QwizEngineController.prototype.goToStartView = function () {

    // Start the opening view
    var nextViewObject = this.qwizEngineFSM.getOpeningViewObject();
    var view =  this.createView(nextViewObject.view,nextViewObject.options);
    this.setCurrentView(view);

};


/**
 * QwizEngineController method.
 */
QwizEngineController.prototype.goToHintView = function () {

    this.qwizEngineFSM.changeToHintViewLevel();
    var nextViewObject = this.qwizEngineFSM.getNextViewObject();
    var view =  this.createView(nextViewObject.view,nextViewObject.options);
    this.setCurrentView(view);
};

QwizEngineController.prototype.goToReinforceView = function () {

    this.qwizEngineFSM.changeToReinforceViewLevel();
    var nextViewObject = this.qwizEngineFSM.getNextViewObject();
    var view =  this.createView(nextViewObject.view,nextViewObject.options);
    this.setCurrentView(view);
};

/**
 * QwizEngineController method.
 */
QwizEngineController.prototype.goToExit = function () {
    this.trigger('qwiz-transition-exit');
};

QwizEngineController.prototype.changeToPreviousViewLevel = function () {
    this.qwizEngineFSM.changeToPreviousViewLevel();
    var nextViewObject = this.qwizEngineFSM.getNextViewObject();
    var view =  this.createView(nextViewObject.view,nextViewObject.options);
    this.setCurrentView(view);
};



    /**
 * QwizEngineController method.
 */
QwizEngineController.prototype.remove = function () {

    this.stopListening();
    return this;

};


/**
 * Exports.
 * Return the constructor function
 */
module.exports = exports = QwizEngineController;


/* ---------- CommonJS wrapper ---------- */
});
/* -------------------------------------- */

