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
    "modules/editQwizbook",
    "text!templates/qwizbookAddDetailsContent.html"

], function (App, QwizBook, EditQwizbook , Template) {

    var QwizbookAddDetailsContent = App.module();

    QwizbookAddDetailsContent.View = Backbone.View.extend({

        initialize: function () {
            this.session = this.options.session;
            
            if (_.isEmpty(this.options.session)) {
                throw "ERROR: Session object is not provided for the view!!"
                    }
           
            this.qwizbookId = this.options.qwizbookId;
            this.qwizbookModel = new QwizBook.Model({_id:this.qwizbookId, session:this.session});
            this.qwizbookModel.retreive();
            this.listenTo(this.qwizbookModel, "retreive-qwizbook-success-event", this.updateView);
            this.editQwizbook = new EditQwizbook.View({model: this.qwizbookModel, qwizbookId: this.qwizbookId, session:this.session});

        },
         updateView : function()
        {
            $(this.el).find("#qwizbook-create-form").append(this.editQwizbook.render().el);
        },

       events: {
            "click #icon-author-content": "showAuthorForm",
             //"click #qwizbook-questionnare-form a": "showOrhideImageAudioVideoDiv",
           
            //Show reference container
            "click #add-more-references": "showReferenceContainer",
            //Submit Form
            "click #btn-qwizbook-author-submit": "submitAuthorForm",
            //Cancel Form
            "click #btn-qwizbook-author-cancel": "cancelAuthorForm",
            
            //edit qwizbook
            "click #btn-save-qwizbook" : "editBook",
            "click .media-group a" : "addSupportLink",
            "click .media-hide" : "removeSupportLink"

        },
        
        addSupportLink: function(e){
            var trigger     = e.target.parentNode,
                type        = $(trigger).attr("class").replace(/(btn |-toggler)/g,""),
                input       = $(trigger).parents(".controls").children().first(),
                control     = $(".templates .controls."+type).clone(),
                inputId     = $(input).attr("id"),
                controlId   = inputId + "-" + type;

            if($("#" + controlId).length > 0){
                $("#" + controlId).parents(".controls.media-controls").remove();
            }
            else{
                $(control).children().first().attr("id",controlId)
                $(input).parents(".control-group").append(control);
            }
        },
       
        removeSupportLink: function(e){
            var trigger = e.target.parentNode
            $(trigger).parents(".controls.media-controls").remove();
        },
        
        editBook :function ()
        {
            var new_title = $('#qwizbook-title').val();
            var new_description =  $('#qwizbook-description').val();
            var view = this;
            var qwizbook = view.qwizbookModel;
            qwizbook.create(new_title, new_description);
        },

        showAuthorForm: function (e) {

            $('#qwizbook-questionnare-content').removeClass("hidden");

        },
        
        
        showReferenceContainer: function (e) {
            var newRef      = $("#reinforcement-description-0").parents(".reinforcement").clone(),
                refCount    = parseInt($("#reference-count").val()),
                newId       = "reinforcement-description-" + refCount;
            $(newRef).children("label").attr("for",newId);
            $(newRef).find("textarea").attr('id',newId)
                                      .attr('name',newId);
            $(newRef).children(".media-controls").remove();
            console.log($(".reinforcement:last").after(newRef))
        },
        
        submitAuthorForm: function (e) {
            e.preventDefault();
            var questionType    = $("#question-type").val();

            var question        = $("#question").val();

            var optionA         = $("#option-A").val();
            var optionB         = $("#option-B").val();
            var optionC         = $("#option-C").val();
            var optionD         = $("#option-D").val();

            var questionImage   = $("#image-question_input").val();
            var questionAudio   = $('#audio-question_input').val();
            var questionVideo   = $('#video-question_input').val();

            var optionAImage    = $('#image-optionA_input').val();
            var optionAAudio    = $('#audio-optionA_input').val();
            var optionAVideo    = $('#video-optionA_input').val();

            var optionBImage    = $('#image-optionB_input').val();
            var optionBAudio    = $('#audio-optionB_input').val();
            var optionBVideo    = $('#video-optionB_input').val();

            var optionCImage    = $('#image-optionC_input').val();
            var optionCAudio    = $('#audio-optionC_input').val();
            var optionCVideo    = $('#video-optionC_input').val();

            var optionDImage    = $('#image-optionD_input').val();
            var optionDAudio    = $('#audio-optionD_input').val();
            var optionDVideo    = $('#video-optionD_input').val();

            var hintDescription = $('#hint-description').val();
            
            var riDescription   = $('#reinforcement-description').val();
            var riLink          = $('#reinforcement-link_input').val();
            var riImage         = $('#reinforcement-image_input').val();
            var riAudio         = $('#reinforcement-audio_input').val();
            var riVideo         = $('#reinforcement-video_input').val();

            var refDescription  = $('#reference_description').val();
            var refLink         = $('#reference-link_input').val();
            var refImage        = $('#reference-image_input').val();
            var refAudio        = $('#reference-audio_input').val();
            var refvideo        = $('#reference-video_input').val();

            var referenceCount  =  $('#reference_count').val();

            var referenceArray  = [];
            for ( var i = 0; i < referenceCount ; i++ ) {
                var count = (i == 0) ? "" : i;
                referenceArray[i] = {
                    description  : $( '#reference_description' + count ).val(),
                    refLink         : $('#reference-link-' + count + '_input').val(),
                    refImage        : $('#reference-image-' + count + '_input').val(),
                    refAudio        : $('#reference-audio-' + count + '_input').val(),
                    refvideo        : $('#reference-video-' + count + '_input').val()
                };
            }

            console.log(referenceArray);

            //$('#qwizbook-questionnare-content').hide();
        },

        cancelAuthorForm: function (e) {
            e.preventDefault();
            $('#qwizbook-questionnare-content').addClass("hidden");

        },

        template: Template,

        render: function () {

            this.el.innerHTML = this.template;
            //$(this.el).find("#qwizbook-create-form").append(this.editQwizbook.render().el);
            return this;
        }
    });

    return QwizbookAddDetailsContent;

});