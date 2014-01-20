/*!
 * Copyright(c) 2013 Vibrentt
 *
 * Module : QwizReinforceView
 *
 *
 */

define(function (require, exports, module) {

    /**
     * Module dependencies.
     */
    var App = require('app');
    var    Backbone = require('backbone');
    var     _ = require('underscore');
    var     $ = require('jquery');
    var     Template = require('text!modules/qwizengine/templates/qwizReinforceView.html');
    var    QwizHeaderTmpl = require('text!modules/qwizengine/templates/qwizHeader.html');
    var     ImageLinkTmpl = require('text!modules/qwizengine/templates/imageLinks.html');
    var     AudioLinkTmpl = require('text!modules/qwizengine/templates/audioLinks.html');
    var     VideoLinkTmpl = require('text!modules/qwizengine/templates/videoLinks.html');


    // Create a new module
    var QwizReinforceView = App.module();

    QwizReinforceView.View = Backbone.View.extend({

        template: Template,

        initialize: function () {

            this.qwizbook= this.options.model;
            this.page= this.options.page;
            this.reinforce= this.options.reinforce;
            this.tracker= this.options.tracker;

            if (_.isEmpty(this.options.model)) {
                throw "ERROR: qwizbook is not provided for this view!!"
            }

            if (_.isEmpty(this.options.tracker)) {
                throw "ERROR: tracker is not provided for this view!!"
            }

            _.declarePartial('imageLinks', ImageLinkTmpl);
            _.declarePartial('audioLinks', AudioLinkTmpl);
            _.declarePartial('videoLinks', VideoLinkTmpl);
            _.declarePartial('qwizHeader', QwizHeaderTmpl);

        },
        render: function () {
            var data = this.convertToViewData();
            this.$el.html(_.template(this.template, data));

            return this;
        },

        convertToViewData: function () {

            var page=this.qwizbook.get("pages")[this.page];
            var reinforce = page.reinforce[this.reinforce];
            var lastOne = (this.reinforce >= (page.reinforce.length-1)) ? true:false;

            var data = {
                "title": this.qwizbook.get("title"),
                "chapterTitle" : this.qwizbook.get("subtitle"),
                "reinforce": reinforce,
                "lastOne":lastOne
            };

            return data;
        },

        events: {
              "click #qwiz-control-next": "goToNextView"
        },

        goToNextView: function(e) {
            this.trigger('qwiz-transition-prev-level');
        },

        remove: function() {

            this.$el.remove();
            this.stopListening();

            return this;

        }


    });

    module.exports = QwizReinforceView;


});
