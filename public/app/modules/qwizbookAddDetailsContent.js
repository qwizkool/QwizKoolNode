/*!
 * Copyright(c) 2013 Vibrentt
 *
 * Module : QwizbookAuthoringContent
 *
 *
 */
define([
    "app",
    "modules/qwizbook",
    "text!templates/qwizbookAddDetailsContent.html"

], function (App, QwizBook, Template) {

    var QwizbookAddDetailsContent = App.module();

    QwizbookAddDetailsContent.View = Backbone.View.extend({

        initialize: function () {

            this.qwizbookModel = new QwizBook.Model();
            if (_.isEmpty(this.options.session)) {
                throw "ERROR: Session object is not provided for the view!!"
            		}

            this.session = this.options.session;
            
            /*this.on("createqwizbook", function (createQwizbookObj) {
					
					var qbooktitle = createQwizbookObj.qbooktitle;
					var qbookdescription = createQwizbookObj.qbookdesc;
					var qwizbookratingmodel = createQwizbookObj.qwizbookmodel;
					qwizbookratingmodel.create(qbooktitle, qbookdescription);

					});*/


        },

       events: {
            "click #icon-author-content": "showAuthorForm",
            // Show image, audio & video Div for Question
            "click #icon-image-question": "showQuestionImageDiv",
            "click #icon-audio-question": "showQuestionAudioDiv",
            "click #icon-video-question": "showQuestionVideoDiv",
            // Show image, audio & video Div for Option A
            "click #icon-image-Option-A": "showOptionAImageDiv",
            "click #icon-audio-Option-A": "showOptionAAudioDiv",
            "click #icon-video-Option-A": "showOptionAVideoDiv",
            // Show image, audio & video Div for Option B
            "click #icon-image-Option-B": "showOptionBImageDiv",
            "click #icon-audio-Option-B": "showOptionBAudioDiv",
            "click #icon-video-Option-B": "showOptionBVideoDiv",
            // Show image, audio & video Div for Option C
            "click #icon-image-Option-C": "showOptionCImageDiv",
            "click #icon-audio-Option-C": "showOptionCAudioDiv",
            "click #icon-video-Option-C": "showOptionCVideoDiv",
            // Show image, audio & video Div for Option D
            "click #icon-image-Option-D": "showOptionDImageDiv",
            "click #icon-audio-Option-D": "showOptionDAudioDiv",
            "click #icon-video-Option-D": "showOptionDVideoDiv",
            
            "click #btn-qwizbook-author-submit": "submitAuthorForm",
            "click #btn-qwizbook-author-cancel": "cancelAuthorForm"

        },

        showAuthorForm: function (e) {

            $('#qwizbook-questionnare-content').show();

        },
        
        showQuestionImageDiv: function (e) {

            $('#image-question-container').show();

        },
        
        showQuestionAudioDiv: function (e) {

            $('#audio-question-container').show();

        },
        
        showQuestionVideoDiv: function (e) {

            $('#video-question-container').show();

        },
        
        showOptionAImageDiv: function (e) {

            $('#image-optionA-container').show();

        },
        
        showOptionAAudioDiv: function (e) {

            $('#audio-optionA-container').show();

        },
        
        showOptionAVideoDiv: function (e) {

            $('#video-optionA-container').show();

        },



		showOptionBImageDiv: function (e) {

            $('#image-optionB-container').show();

        },
        
        showOptionBAudioDiv: function (e) {

            $('#audio-optionB-container').show();

        },
        
        showOptionBVideoDiv: function (e) {

            $('#video-optionB-container').show();

        },
        
        showOptionCImageDiv: function (e) {

            $('#image-optionC-container').show();

        },
        
        showOptionCAudioDiv: function (e) {

            $('#audio-optionC-container').show();

        },
        
        showOptionCVideoDiv: function (e) {

            $('#video-optionC-container').show();

        },
        
        showOptionDImageDiv: function (e) {

            $('#image-optionD-container').show();

        },
        
        showOptionDAudioDiv: function (e) {

            $('#audio-optionD-container').show();

        },
        
        showOptionDVideoDiv: function (e) {

            $('#video-optionD-container').show();

        },
        submitAuthorForm: function (e) {
            $('#qwizbook-questionnare-content').hide();
            //$('#qwizbook-title').val('');
            //$('#qwizbook-description').val('');
        },

        cancelAuthorForm: function (e) {

            $('#qwizbook-questionnare-content').hide();
            //$('#qwizbook-title').val('');
            //$('#qwizbook-description').val('');

        },

        template: Template,

        render: function () {

            this.el.innerHTML = this.template;
            //$(this.el).find("#searchfilter-container").append(this.searchfilter.render().el);
            // $(this.el).find("#qwizbooklist-container").append(this.qwizbooklistview.render().el);

            return this;
        }
    });

    return QwizbookAddDetailsContent;

});
