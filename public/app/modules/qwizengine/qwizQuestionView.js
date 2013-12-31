/*!
 * Copyright(c) 2013 Vibrentt
 *
 * Module : QwizQuestionView
 *
 *
 */

define([
    "app",
    "text!modules/qwizengine/templates/qwizQuestionView.html",
    "text!modules/qwizengine/templates/qwizHeader.html",
    "text!modules/qwizengine/templates/imageLinks.html",
    "text!modules/qwizengine/templates/audioLinks.html",
    "text!modules/qwizengine/templates/videoLinks.html"
], function (App, Template, QwizHeaderTmpl, ImageLinkTmpl,AudioLinkTmpl, VideoLinkTmpl) {

    // Create a new module
    var QwizQuestionView = App.module();

    QwizQuestionView.View = Backbone.View.extend({

        template: Template,

        initialize: function () {

            this.qwizbook= this.options.model;
            this.page= this.options.page;
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

            var x=this.qwizbook.get("pages")[this.page];

            var data = {
                "title": this.qwizbook.get("title"),
                "chapterTitle" : this.qwizbook.get("subtitle"),
                "multiple_choice_question": x.multiple_choice_question
            };

            return data;
        },

        events: {
            "click #qwiz-control-prev": "goToPrevView",
            "click #qwiz-control-next": "goToNextView",
            "click #qwiz-control-hint": "goToHintView",
            "click .qwiz-control-done": "goToDoneView",
            "click [type='checkbox']":  "optionSelected"
        },

        optionSelected: function(e) {
            $(".qwiz-question-warning").addClass("hidden");
        },

        goToNextView: function(e) {

            // Check if atleast one option is selected
            // if selected , update the tracker
            var checkedAnswers =  $('input[name="qwizAnswer[]"]:checked');
            if (checkedAnswers.length)
            {
                var answeredCorrectly = true;

                // Check for answers, if any selected is false
                // then the answer is considered false
                $(checkedAnswers).each(function(){
                    if (this.getAttribute("data-correct") == "false"){
                        answeredCorrectly = false;
                    }
                });

                this.tracker.trackResult(this.page, answeredCorrectly);
                console.log("Answered : " + answeredCorrectly)
                this.trigger('qwiz-transition-next');
            } else {

                $(".qwiz-question-warning").toggleClass("hidden");

            }

        },
        goToPrevView: function(e) {
            this.trigger('qwiz-transition-prev');
        },
        goToHintView: function(e) {
            this.trigger('qwiz-transition-hint');
        },
        goToDoneView: function(e) {
            this.trigger('qwiz-transition-done');
        },

        remove: function() {

            this.$el.remove();
            this.stopListening();

            return this;

        }


    });

    return QwizQuestionView;

});
