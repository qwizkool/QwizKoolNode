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
 * @param scxml If provided, should be a valid SCXML document.
 *              If not provided, the constructor will create a scxml template
 *              which may be further edited with other APIs
 *
 * @return {Function} Constructor for QwizBookFSM type.
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
 * Set the initial state.
 *
 * @param stateId  Id string of the initial state. 
 *
 * @return 
 */
QwizBookFSM.prototype.setInitialState = function(stateId) {

    var scxml_el = this.xmlDoc.getElementsByTagName('scxml')[0];
     scxml_el.setAttribute('initial', stateId);
};


/**
 * Add a state to FSM.
 *
 * @param stateId  Unique id string for this state. The id should follow the XML/HTML tag rules:
 *                 It must begin with a letter ([A-Za-z]) and may be followed by any number 
 *                 of letters, digits ([0-9]), hyphens ("-") and underscores ("_").
 *
 * @return 
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
 * TODO: Error check to see if the state is not referred by any other state
 *
 * @param stateId The id of the state that needs to be deleted from the FSM
 *
 * @return 
 */
QwizBookFSM.prototype.removeState = function(stateId) {
    $(this.xmlDoc).find( '#' + stateId).remove();
};


/**
 * Add a transition in FSM.
 * Transitions between states are triggered by events and conditionalized via guard conditions.
 *
 * @param src_stateId The origin (source) stateId. This state must exist before calling addTransition 
 * @param target_stateId The destination (target) stateId
 * @param event The transition event. Can be later delivered to the FSM using sendEvent.
 * @param condition A condition that will be evaluated. 'true' will enable transition. (TODO)
 *
 * @return transitionId The unique Id of the transition element
 */
QwizBookFSM.prototype.addTransition = function(src_stateId, event, target_stateId, condition) {

    var transition_el = this.xmlDoc.createElement('transition');
    transition_el.setAttribute('event', event);
    transition_el.setAttribute('target', target_stateId);
    
    var tid = src_stateId + '-' + event + '-' + target_stateId;
    transition_el.setAttribute('id', tid);
    
    var state_el = this.xmlDoc.getElementById(src_stateId);
    state_el.appendChild(transition_el);
    
    return tid;
};

/**
 * Remove a transition in FSM.
 *
 * @param src_stateId The origin (source) stateId. 
 * @param target_stateId The destination (target) stateId
 * @param event The transition event. 
 *
 * @return
 */
QwizBookFSM.prototype.removeTransition = function(src_stateId, event, target_stateId) {
    var tid = src_stateId + '-' + event + '-' + target_stateId;
    $(this.xmlDoc).find( '#' + tid).remove();
};

/**
 * Remove a transition by Id.
 *
 * @param transitionId The transition element Id.
 *
 * @return 
 */
QwizBookFSM.prototype.removeTransitionById = function(transitionId) {
    $(this.xmlDoc).find( '#' + transitionId).remove();
};


/**
 * Register event listener.
 * The event listener is mixed in using Backbone events.
 * The API is described here for completion.
 * For details, see Backbone's event documentation
 *
 * @param event The event to listen for
 * @param callback Callback function 
 * @param context This object will be transparently returned in the callback
 * @return 
 */

//QwizBookFSM.prototype.on = function(event, callback, context) {
//
//}



/**
 * UnRegister event listener.
 * The event listener is mixed in using Backbone events.
 * The API is described here for completion.
 * For details, see Backbone's event documentation
 *
 * @param event The event to listen for
 * @param callback Callback function 
 * @param context This object will be transparently returned in the callback
 * @return 
 */

//QwizBookFSM.prototype.off = function(event, callback, context) {
//
//}



/**
 * Start FSM.
 * Start the SCXML interpreter. 
 *
 * @return 
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
 * Send event to FSM.
 * 
 * @param event The event that needs to be delivered to the FSM
 * @evdata Optional event data (TODO)
 *
 * @return 
 */

QwizBookFSM.prototype.sendEvent = function(event, evdata) {

    this.interpreter.gen({
        name: event,
        data: evdata
    });
};


/**
 * Get SCXML string
 * Once the SCXML is created and edited, use this API to get the SCXML document
 *
 * @return SCXML string 
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
    qFSM.addState('qwizbooks_0_qwizpages_0');
	qFSM.addState('qwizbooks_0_qwizpages_1');
	qFSM.addState('qwizbooks_0_qwizpages_2');
	qFSM.addState('qwizbooks_0_qwizpages_3');
	qFSM.addState('idle');
	
    qFSM.setInitialState('idle');
	
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
 * Return the constructor function
 */

module.exports = exports = QwizBookFSM;

/* ---------- CommonJS wrapper ---------- */
});
/* -------------------------------------- */

