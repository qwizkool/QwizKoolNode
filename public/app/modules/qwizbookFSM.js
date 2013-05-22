/*!
 * Copyright(c) 2013 Vibrentt
 *
 * Module : QwizBookFSM
 * Represents the state machine data of a qwizbook.
 * 
 * Valid Input Events:
 * - open : open a qwizbook
 * - next : move to next page/item
 * - getHint : get a hint for a question
 * - close : close a qwizbook
 * 
 */

/* ---------- CommonJS wrapper ---------- */
define(function(require, exports, module) {
/* -------------------------------------- */


/**
 * Module dependencies.
 */
var Scion = require('scion');
var Backbone = require('backbone');
var _ = require('underscore');
var $ = require('jquery');

/**
 * Qwizbook FSM constructor.
 *
 * @api public
 * @return {Function} Constructor for FSM type.
 */

var QwizBookFSM = function(scxml) {

    // Mix-in event capability
    _.extend(this, Backbone.Events);

    this.id = 0;
    
    // If an scxml is not provided, create a new one
    if(_.isUndefined(scxml)) {
        this.scXml = '<scxml xmlns="http://www.w3.org/2005/07/scxml" version="1.0" profile="ecmascript"></scxml>';
    } else {
        this.scXml = scxml;
    } 
    
    // Open the scxml as an XMLDoc for editing
    this.xmlDoc = $.parseXML(this.scXml);
    
    this.qwizbookId = null;
    this.interpreter = null;
};

/**
 * Add a state to FSM.
 *
 * @api public
 * @return {Function} Constructor for FSM type.
 */
QwizBookFSM.prototype.addState = function(stateId) {

    var state_el = this.xmlDoc.createElement('state');
    state_el.setAttribute("id", stateId);
    this.xmlDoc.documentElement.appendChild(state_el);
    
    //$(this.xmlDoc).find('scxml').append('<state></state>').attr('id', stateId);
 
    //alert($(this.xmlDoc).find('scxml').text());


};

/**
 * Remove a state in FSM.
 *
 * @api public
 * @return {Function} Constructor for FSM type.
 */
QwizBookFSM.prototype.removeState = function(stateId) {
    $(this.xmlDoc).find( '#' + stateId).remove();
};


/**
 * Add a transition in FSM.
 *
 * @api public
 * @return {Function} Constructor for FSM type.
 */
QwizBookFSM.prototype.addTransition = function(stateId, event, target) {

    var transition_el = this.xmlDoc.createElement('transition');
    transition_el.setAttribute('event', event);
    transition_el.setAttribute('target', target);
    
    var tid = stateId + '-' + event + '-' + target;
    transition_el.setAttribute('id', tid);
    
    var state_el = this.xmlDoc.getElementById(stateId);
    state_el.appendChild(transition_el);
    
    return tid;
};

/**
 * Remove a transition in FSM.
 *
 * @api public
 * @return {Function} Constructor for FSM type.
 */
QwizBookFSM.prototype.removeTransition = function(stateId, event, target) {
    var tid = stateId + '-' + event + '-' + target;
    $(this.xmlDoc).find( '#' + tid).remove();
};

/**
 * Remove a transition by Id.
 *
 * @api public
 * @return {Function} Constructor for FSM type.
 */
QwizBookFSM.prototype.removeTransitionById = function(transitionId) {
    $(this.xmlDoc).find( '#' + transitionId).remove();
};

/**
 * Start FSM.
 *
 * @api public
 * @return {Function} Constructor for FSM type.
 */
QwizBookFSM.prototype.start = function() {

    var self = this;
    
    // Get the latest xml doc
    //this.scXml = $(this.xmlDoc).text();

    //Convert to scion model
    Scion.documentToModel(null, this.xmlDoc, function(err, scModel) {

        if (err) throw err;

        //Instantiate the interpreter
        self.interpreter = new Scion.SCXML(scModel);
        
        //Register the handlers before starting
        self.interpreter.registerListener({
        
            onEntry: function(stateId) {
               //$("#page_body").append("Entering state :" + stateId + "<br/>");
               self.trigger('stateEntry', stateId);
            },
            
            onExit: function(stateId) {
               // $("#page_body").append("Exiting state :" + stateId + "<br/>");
            },
            
            onTransition: function(sourceStateId, targetStateIds) {
               // $("#page_body").append("Transitioning from state :" + sourceStateId + "<br/>");
            }
            
        });

        //start the interpreter
        self.interpreter.start();

        //send the init event
        self.interpreter.gen({
            name: "init",
            data: self.qwizbookId
        });

    });

};

/**
 * Send event to FSM .
 *
 * @api public
 * @return {Function} Constructor for FSM type.
 */

QwizBookFSM.prototype.sendEvent = function(event, evdata) {

    this.interpreter.gen({
        name: event,
        data: evdata
    });
};


/**
 * Get SCXML string
 *
 * @api public
 * @return {Function} Constructor for FSM type.
 */
QwizBookFSM.prototype.getSCXMLStr = function() {

    return (new XMLSerializer()).serializeToString(this.xmlDoc);

};

/**
 * Test FSM
 *
 * @api public
 * @return {Function} Constructor for FSM type.
 */
QwizBookFSM.prototype.testFSM = function() {

	//////////////////////////////
	// Qwizbook Authoring mode //
    //////////////////////////////
    
    alert("Starting Authoring");
    	
    // Create new empty FSM
	var qFSM = new QwizBookFSM();
	
	// Create states
	qFSM.addState('idle');
    qFSM.addState('qwizbooks_0_qwizpages_0');
	qFSM.addState('qwizbooks_0_qwizpages_1');
	qFSM.addState('qwizbooks_0_qwizpages_2');
	qFSM.addState('qwizbooks_0_qwizpages_3');
	
	// Create transitions
	qFSM.addTransition('idle', 'open', 'qwizbooks_0_qwizpages_0');
	qFSM.addTransition('qwizbooks_0_qwizpages_0', 'next', 'qwizbooks_0_qwizpages_1');
	qFSM.addTransition('qwizbooks_0_qwizpages_1', 'next', 'qwizbooks_0_qwizpages_3');
	qFSM.addTransition('qwizbooks_0_qwizpages_2', 'next', 'idle');

    // test for getting the id
	var tid = qFSM.addTransition('qwizbooks_0_qwizpages_3', 'next', 'idle');	
	
	// Test remove
	qFSM.removeState('qwizbooks_0_qwizpages_2');	
	qFSM.removeTransitionById(tid);
	
    // scxml will be stored as qwizbook attribute
	var scxml = qFSM.getSCXMLStr();	
	alert("Authored SCXML :" + scxml);		
	
	
	//////////////////////////////
	// Qwizbook Navigation mode //
    //////////////////////////////
    
    alert("Starting FSM navigation");
        
    // Create new FSM
    // scxml will be obtained from qwizbook attribute
	var qFSM = new QwizBookFSM(scxml);
    
    // Install event listener
	qFSM.on ('stateEntry', function (stateid) {
		alert("Entered state :" + stateid);
        });

    // Start FSM
    qFSM.start();
    
    // Send events
	qFSM.sendEvent('open');
	qFSM.sendEvent('next');	
	qFSM.sendEvent('next');	
		

};
        



/**
 * Exports.
 * Return the singleton instance
 */

module.exports = exports = QwizBookFSM;

/* ---------- CommonJS wrapper ---------- */
});
/* -------------------------------------- */

