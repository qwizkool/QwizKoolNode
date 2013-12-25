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
var App = require("app");
var QwizOpeningView = require("modules/qwizengine/qwizOpeningView");
var QwizLoadingView = require("modules/qwizengine/qwizLoadingView");
var QwizQuestionView = require("modules/qwizengine/qwizQuestionView");
var QwizClosingView = require("modules/qwizengine/qwizClosingView");
var QwizbookModel = require("modules/qwizbook/qwizbookModel");
var QwizbookFSM = require("modules/qwizbookFSM");
//var QwizbookTrack = require("modules/qwizbookTrack"); TODO

/**
 * QwizEngineController constructor.
 */
var QwizEngineController = function(userSession, qwizbookId) {

    this.userSession = userSession;
    this.qwizbookId = qwizbookId;
    this.qwizbookModel = null;
    this.currentChapter = null;
    this.pages = null;
    this.currentPage = null;
    this.viewClassArray = [];


    // Mix-in event capability
    _.extend(this, Backbone.Events);


    this.viewClassArray.push(QwizLoadingView);
    // Initialize view index
    this.viewIndex = 0;
    var view =  this.createView(QwizLoadingView);
    this.setCurrentView(view);


};



/**
 * QwizEngineController initialize.
 */
QwizEngineController.prototype.initialize =  function () {


    // Create and start the FSM
   	//this.qwizbookFSM = new QwizBookFSM(this.qwizbookModel.get("FSM"));
    
    // Install FSM event listener
  /*  var self = this;
	this.qwizbookFSM.on ('stateEntry', function (chapterid) {
	    
	    // read through qwizbook model so that any sub-model loads 
	    // can be opimized there
	    self.pages = self.qwizbookModel.get("pages");
	    self.currentPage = pages[0];
	            
	});*/

    // Start FSM. Will trigger the first chapter event
   // this.qwizbookFSM.start();
    
    
    // Create and open qwizbook tracking for the user
    // TODO

    // For testing create and store all the views


    // Store all view classes
    this.viewClassArray.push(QwizOpeningView);
    this.viewClassArray.push(QwizQuestionView);
    this.viewClassArray.push(QwizClosingView);

    // Starting view
     this.goToNextView();

};


/**
 * QwizEngineController method.
 */
QwizEngineController.prototype.createView = function(viewClass) {

    var view = new viewClass.View();

    // Handle all possible user interaction events
    // Next, Previous, hint, done
    this.listenTo(view, "qwiz-transition-next", this.goToNextView);
    this.listenTo(view, "qwiz-transition-prev", this.goToPrevView);
    this.listenTo(view, "qwiz-transition-hint", this.goToHintView);
    this.listenTo(view, "qwiz-transition-done", this.goToExit);

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

    this.viewIndex++;
    var view =  this.createView(this.viewClassArray[this.viewIndex]);
    this.setCurrentView(view);

};


/**
 * QwizEngineController method.
 */
QwizEngineController.prototype.goToPrevView = function () {
    this.viewIndex--;
    var view =  this.createView(this.viewClassArray[this.viewIndex]);
    this.setCurrentView(view);
};


/**
 * QwizEngineController method.
 */
QwizEngineController.prototype.goToStartView = function () {

};


/**
 * QwizEngineController method.
 */
QwizEngineController.prototype.goToHintView = function () {

};



/**
 * QwizEngineController method.
 */
QwizEngineController.prototype.goToExit = function () {
    this.trigger('qwiz-transition-exit');
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

