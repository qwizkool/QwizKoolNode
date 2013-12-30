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
    //var QwizbookFSM = require("modules/qwizbookFSM");
    //var QwizbookTrack = require("modules/qwizbookTrack"); TODO


    var QwizEngineFSM = function (qwizbook) {
        this.qwizbook = qwizbook;
        this.pageIndex =0;
        this.pageHintIndex =0;
        this.inHintViewLevel =0;
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

        if (this.inHintViewLevel) {}
        else
        {
            if (this.pageIndex < this.qwizbook.get("pages").length) {

                viewObject = this.createViewObject(QwizQuestionView,{ model: this.qwizbook, page: this.pageIndex })
                this.pageIndex++;
            } else {
                // go to final view
                this.pageIndex = 0;
                viewObject = this.createViewObject(QwizClosingView,{ model: this.qwizbook})


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
            viewObject = this.createViewObject(QwizQuestionView,{ model: this.qwizbook, page: this.pageIndex })
        }

        return viewObject;
    };

    QwizEngineFSM.prototype.changeToPreviousViewLevel = function () {

        this.pageHintIndex =0;
        this.inHintViewLevel =0;


    };


    QwizEngineFSM.prototype.changeToHintViewLevel = function (page) {
        this.inHintViewLevel =1;
    };


    /**
     * Exports.
     * Return the constructor function
     */
    module.exports = exports = QwizEngineFSM;


    /* ---------- CommonJS wrapper ---------- */
});
/* -------------------------------------- */

