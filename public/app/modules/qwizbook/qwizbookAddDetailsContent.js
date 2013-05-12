define([
    "app",
    "modules/qwizbook/qwizbookView",
    "modules/qwizbook/editQwizbook",
    "modules/qwizbook/qwizbookPageModel",
    "modules/qwizbook/pageReferenceCollection",
    "text!templates/qwizbookAddDetailsContent.html"

], function (App, QwizBook, EditQwizbook, QwizBookPage, PageReferenceCollection, Template) {

    var QwizbookAddDetailsContent = App.module();

    QwizbookAddDetailsContent.View = Backbone.View.extend({

        initialize: function () {
            this.session = this.options.session;
            
            if (_.isEmpty(this.options.session)) {
                throw "ERROR: Session object is not provided for the view!!"
                    }
           
            this.qwizbookId         = this.options.qwizbookId;
            this.qwizbookModel      = new QwizBook.Model({_id:this.qwizbookId, session:this.session});
            this.qwizBookPageModel  = new QwizBookPage.Model();
            this.qwizBookPageModel.url = "/qwizbooks/" + this.qwizbookId + "/pages"
            this.qwizbookModel.retreive();
            this.listenTo(this.qwizbookModel, "retreive-qwizbook-success-event", this.updateView);
            this.editQwizbook = new EditQwizbook.View({model: this.qwizbookModel, qwizbookId: this.qwizbookId, session:this.session});

        },

        updateView : function() {
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
            var trigger = e.target.parentNode,
                type = $(trigger).attr("class").replace(/(btn |-toggler)/g,""),
                input = $(trigger).parents(".controls").children().first(),
                control = $(".templates .controls."+type).clone(),
                inputId = $(input).attr("id"),
                controlId = inputId + "-" + type;
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
            var new_description = $('#qwizbook-description').val();
            var view = this;
            var qwizbook = view.qwizbookModel;
            qwizbook.create(new_title, new_description);
        },

        showAuthorForm: function (e) {

            $('#qwizbook-questionnare-content').removeClass("hidden");

        },
        
        
        showReferenceContainer: function (e) {
            var newRef = $("#reference-description-0").parents(".reference").clone(),
                refCount = parseInt($("#reference-count").val()),
                newId = "reference-description-" + refCount;
            $(newRef).children("label").attr("for",newId);
            $(newRef).find("textarea").attr('id',newId)
                                      .attr('name',newId);
            $(newRef).children(".media-controls").remove();
            $(".reference:last").after(newRef);
            $("#reference-count").val( refCount + 1 );
        },
        
        /**
        * 
        * Submit qwizbook page form
        */
        submitAuthorForm: function (e) {
            e.preventDefault();
            var questionType = $("#question-type").val(),
                that = this;

            var multiple_choice_question = {
                questionType : $("#question-type").val(),
                question : that._getLinksObject("#question"),
                answers : that._getMultipleChoiceAnswers()
            };

            // Reinforcement informations
            var reinforce = [this._getLinksObject("#reinforcement-description", true, true)];

            // Page hints
            var hintText    = $.trim($("#hint-description").val());
            var hintImage   = $.trim($("#hint-image").val());
            var hints = [];
            if(hintText || hintImage){
                var hint = {};
                if(hintText){
                    hint.text = hintText;
                }
                if(hintImage){
                    hint.imageLinks = [{ url : hintImage }];
                }
                hints.push(hint);
            }

            // Create reference array
            var pageReferences = [],
                referenceCount = $("#reference-count").val();

            for (var i = 0; i < referenceCount; i++) {
                pageReferences.push(this._getLinksObject("#reference-description-"+i, true, true));
            };

            var qwizbookPage = {
                qwizbookId : this.qwizbookId,
                multiple_choice_question : multiple_choice_question,
                reinforce : reinforce,
                hints : hints
            }

            var qwizkookPageModel = new QwizBookPage.Model({
                qwizbookPage : qwizbookPage,
                pageReference : pageReferences
            });

            qwizkookPageModel.url = "/qwizbooks/" + this.qwizbookId + "/pages";
            qwizkookPageModel.create(function(model, response){
                console.log(model);
            });
            $('#qwizbook-questionnare-content').hide();
        },

        /**
        * Pivate method to get the description and related links
        * of Reference and Re-inforce sections. It avoids creating object attributes
        * that have no values.
        *
        * @param {String} elemId Element id
        * @param {Bool} withExternal If webLink attribute is required.
        */
        _getLinksObject : function( elemId, withExternal, objDesc ){
            var obj = {};
            if( ( description = $.trim($(elemId).val())) !="" ){
                if(objDesc){
                    obj.description = description;
                }
                else{
                    obj.text = description;
                }
            }
            if( ( externalLink = this._getMediaLink($(elemId), "external")) && withExternal ) {
                obj.webLinks = [{ url : externalLink }];
            }
            if( ( videoLink = this._getMediaLink($(elemId), "video")) ){
                obj.videoLinks = [{ url : videoLink }]
            }
            if( ( imageLink = this._getMediaLink($(elemId), "image")) ){
                obj.imageLinks = [{ url : imageLink }]
            }
            if( ( audioLink = this._getMediaLink($(elemId), "audio")) ){
                obj.audioLinks = [{ url : audioLink }]
            }
            return obj;
        },

        /**
        *
        * Private function to get the array of multiple choice answer
        */
        _getMultipleChoiceAnswers : function(){
            var answers = [];
            var that = this;
            var correctAnswer = $("input[name=answer]:checked").val();
            $(".choice").each(function(i, elm){
                var input = $(elm).children("input");
                var answer = {
                    choice : that._getLinksObject(input),
                    correct : ($(input).attr("id") == correctAnswer)
                }
                answers.push(answer);
            })
            return answers;
        },

        /**
        *
        * Private function to get value of media urls
        *  
        * @param {Object} elm  Element
        * @param {String} type Media type
        */
        _getMediaLink : function(elm, type){
            var value = elm.parents(".control-group").find("." + type + "-url").val();
            return $.trim(value) || null;
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