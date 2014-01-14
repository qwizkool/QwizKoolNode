/**
 * Created by ambalakkat on 12/30/13.
 */
define(function (require, exports, module) {

    /**
     * Module dependencies.
     */
    var App = require('app');
    var Backbone = require('backbone');
    var _ = require('underscore');
    var $ = require('jquery');


    // Create a new module
    var QwizbookTrack = new App.module();

    QwizbookTrack.Model = Backbone.Model.extend({

        initialize: function () {
            this.successCount = 0;
            this.failCount = 0;
            this.hintsUsed = 0;
        },

        trackResult: function(page, result){

            if (result) {
                this.successCount++;
            } else {
                this.failCount++;
            }

        },

        trackHintsUsed: function(page, hint){

                this.hintsUsed++;

        },

        getScore: function() {
            var totalAttempts = this.successCount + this.failCount;
            var score = this.successCount/totalAttempts;
            return { points : score, total : totalAttempts, success: this.successCount , fail:  this.failCount, hintsUsed: this.hintsUsed}
        }

    });


    module.exports = QwizbookTrack;


});