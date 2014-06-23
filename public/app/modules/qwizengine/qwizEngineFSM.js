/*!
 * Copyright(c) 2013 Vibrentt
 *
 * Module : QwizEngineFSM
 *
 */

/* ---------- CommonJS wrapper ---------- */
define(function (require, exports, module) {
    /* -------------------------------------- */

    var QwizOpeningView = require("modules/qwizengine/qwizOpeningView");
    var QwizLoadingView = require("modules/qwizengine/qwizLoadingView");
    var QwizQuestionView = require("modules/qwizengine/qwizQuestionView");
    var QwizClosingView = require("modules/qwizengine/qwizClosingView");
    var QwizHintView = require("modules/qwizengine/qwizHintView");
    var QwizReinforceView = require("modules/qwizengine/qwizReinforceView");
    var QwizbookTrack = require("modules/qwizbook/qwizbookTrack");


    //var QwizbookFSM = require("modules/qwizbookFSM");


    var QwizEngineFSM = function (qwizbook) {
        this.qwizbook = qwizbook;
        this.pageIndex =0;
        this.pageHintIndex =0;
        this.inHintViewLevel =0;
        this.pageReinforceIndex =0;
        this.inReinforceViewLevel =0;

        this.tracker = new QwizbookTrack.Model();
    };


    QwizEngineFSM.prototype.initialize = function () {

// Create and start the FSM
        //this.qwizbookFSM = new QwizbookFSM(this.qwizbookModel.get("FSM"));

        // Install FSM event listener
        /*var self = this;
         this.qwizbookFSM.on ('stateEntry', function (chapterid) {

         // read through qwizbook model so that any sub-model loads
         // can be opimized there
         self.pages = self.qwizbookModel.get("pages");
         self.currentPage = pages[0];

         });*/

        // Start FSM. Will trigger the first chapter event
        //this.qwizbookFSM.start();

        //JSON.stringify(this.currentPage,null,2)
    };

    QwizEngineFSM.prototype.createViewObject= function (view, options) {

        var viewObject = {};
        viewObject.view = view;
        viewObject.options = options;

        return viewObject;
    }

    QwizEngineFSM.prototype.getOpeningViewObject = function () {

        // If needed this view can be a custom view. now
        // just use the next view object.
        var viewObject = this.getNextViewObject();
        return viewObject;

    };

    QwizEngineFSM.prototype.getClosingViewObject = function () {
    };

    QwizEngineFSM.prototype.getNextViewObject = function () {
        var viewObject;
        var pages = this.qwizbook.get("pages");

        if (this.inHintViewLevel) {

            var pageIndex = (this.pageIndex == 0)? 0:(this.pageIndex-1);
            var hints = pages[pageIndex].hints;
            var maxHints = hints.length;

            if (this.pageHintIndex >= maxHints) {
                this.changeToPreviousViewLevel();
                viewObject = this.createViewObject(QwizQuestionView,{ model: this.qwizbook, page: this.pageIndex, tracker: this.tracker })
            } else {
                viewObject = this.createViewObject(QwizHintView,{ model: this.qwizbook, page: pageIndex, hint: this.pageHintIndex, tracker: this.tracker })
            }

            this.pageHintIndex++;
        } else if (this.inReinforceViewLevel) {

            var pageIndex = (this.pageIndex == 0)? 0:(this.pageIndex-1);
            var reinforce = pages[pageIndex].reinforce;
            var maxReinforce = reinforce.length;
            if (this.pageReinforceIndex >= maxReinforce) {
                this.changeToNextQuestionViewLevel();
                viewObject = this.createViewObject(QwizQuestionView,{ model: this.qwizbook, page: this.pageIndex, tracker: this.tracker })
            } else {
                viewObject = this.createViewObject(QwizReinforceView,{ model: this.qwizbook, page: pageIndex, reinforce: this.pageReinforceIndex, tracker: this.tracker });
                this.pageReinforceIndex++;
            }
        }
        else
        {
            if (this.pageIndex < pages.length) {

                viewObject = this.createViewObject(QwizQuestionView,{ model: this.qwizbook, page: this.pageIndex, tracker: this.tracker })
                this.pageIndex++;
            }
            else
            {
                // go to final view
                this.pageIndex = 0;
                viewObject = this.createViewObject(QwizClosingView,{ model: this.qwizbook, tracker: this.tracker })
            }

        }

        return viewObject;
    };

    QwizEngineFSM.prototype.getPreviousViewObject = function () {
        var viewObject;

        if (this.inHintViewLevel) {}
        else
        {
            this.pageIndex--;
            viewObject = this.createViewObject(QwizQuestionView,{ model: this.qwizbook, page: this.pageIndex, tracker: this.tracker })
        }

        return viewObject;
    };

    QwizEngineFSM.prototype.changeToPreviousViewLevel = function () {

        if(this.inHintViewLevel){
            this.pageHintIndex =0;
            this.inHintViewLevel =0;
            this.pageIndex--;
            return;
        }
        if(this.inReinforceViewLevel){
            this.pageReinforceIndex =0;
            this.inReinforceViewLevel =0;
            return;
        }

    };


    QwizEngineFSM.prototype.changeToHintViewLevel = function (page) {
        this.inHintViewLevel =1;
    };

    QwizEngineFSM.prototype.changeToReinforceViewLevel = function (page) {
        this.inReinforceViewLevel =1;
    };


    /**
     * Exports.
     * Return the constructor function
     */
    module.exports = exports = QwizEngineFSM;


    /* ---------- CommonJS wrapper ---------- */
});
/* -------------------------------------- */

