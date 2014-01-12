
define(function (require, exports, module) {

    /**
     * Module dependencies.
     */
    var App = require('app');
    var Backbone = require('backbone');
    var _ = require('underscore');
    var $ = require('jquery');
    var QwizBook = require('modules/qwizbook/qwizbookView');
    var EditQwizbook = require('modules/qwizbook/editQwizbook');
    var QwizBookPage = require('modules/qwizbook/qwizbookPageCollection');
    var PageReference = require('modules/qwizbook/pageReferenceCollection');
    var Template =  require("text!templates/qwizbookAddDetailsContent.html");
    var TmplPageListItem =  require("text!templates/qwizbookPageListItem.html");
    var AnswerMediaOptionsTmpl = require("text!modules/qwizbook/templates/answerOption.html");
    var QwizbookAddDetailsContent = App.module();

    QwizbookAddDetailsContent.View = Backbone.View.extend({

        initialize: function () {
            this.session = this.options.session;
            this.MAX_HINTS_SUPPORTED = 4;
            this.MAX_REFERENCES_SUPPORTED=4;
            
            if (_.isEmpty(this.options.session)) {
                throw "ERROR: Session object is not provided for the view!!"
                    }
           
            this.qwizbookId         = this.options.qwizbookId;
            this.qwizbookModel      = new QwizBook.Model({_id:this.qwizbookId, session:this.session});
            this.qwizbookPageCollection = new QwizBookPage.Collection();
            this.qwizbookPageModel = new QwizBookPage.Model();
            this.qwizbookPageCollection.url = "/qwizbooks/" + this.qwizbookId + "/pages";
            this.qwizbookModel.retreive();
            this.listenTo(this.qwizbookPageCollection, "list-qwizbookpage-event", this.updateQwizbookPageListing)
            this.listenTo(this.qwizbookPageCollection, "remove", this.updateQwizbookPageListing);
            this.listenTo(this.qwizbookModel, "retreive-qwizbook-success-event", this.updateView);
            this.editQwizbook = new EditQwizbook.View({model: this.qwizbookModel, qwizbookId: this.qwizbookId, session:this.session});

            _.declarePartial('answerMediaOptions', AnswerMediaOptionsTmpl);

        },

        updateView : function() {
            $(this.el).find("#qwizbook-create-form").append(this.editQwizbook.render().el);
        },

       events: {
            "click #create-page-btn": "showAuthorForm",
             //"click #qwizbook-questionnare-form a": "showOrhideImageAudioVideoDiv",
           
            //Show reference container
            "click #add-more-references": "showReferenceContainer",
            "click #add-more-hints": "showHintContainer",
            //Submit Form
            "click #btn-qwizbook-author-submit": "submitAuthorForm",
            //Cancel Form
            "click #btn-qwizbook-author-cancel": "cancelAuthorForm",
            
            //edit qwizbook
            "click #btn-save-qwizbook" : "editBook",
            "click .form-group .media-btn-group button" : "addMediaSupportLink",
            "click .media-hide" : "removeSupportLink",
            "click #delete-all-btn" : "deleteQwizbookPages",
            "click .page-delete" : "deleteQwizbookPage",
            "click .page-edit": "editQwizbookPage",
           "click .hint-hide" : "removeHintBlock",
           "click .reference-hide" : "removeReferenceBlock",
           "click .reinforce-hide" : "removeReinforceBlock"
       },

        addMediaSupportLink: function (e) {
            if (e.currentTarget.type == "button") {
                var trigger = e.currentTarget,
                    type = $(trigger).attr("name").replace(/(-toggler)/g, ""),
                    input = $(trigger).parents(".form-group"),
                    control = $(".templates .form-group." + type).clone(),
                    inputId = $(input).children().eq(1).attr("id"),
                    controlId = inputId + "-" + type,
                    controlInsertId = inputId + "-" + "urls";
                if ($("#" + controlId).length > 0) {
                    // $("#" + controlId).parents(".controls.media-controls").remove();
                }
                else {
                    $(control).children().first().attr("id", controlId)
                    $("#" + controlInsertId).append(control);
                }
            }
        },

        removeSupportLink: function(e){
            var trigger = e.currentTarget;
            $(trigger).parents(".form-group.media-controls").remove();
        },

        removeReinforceBlock: function(e){
            $("#reinforcement-media-elements-urls").empty();
            $("#reinforcement-description").val('');
        },
        removeHintBlock: function(e){
            var refCount = parseInt($("#hint-count").val());
            var trigger = e.currentTarget;
            $(trigger).closest(".hint").remove();
            $("#hint-count").val( refCount - 1 );


        },
        removeReferenceBlock: function(e){
            var refCount = parseInt($("#reference-count").val());
            var trigger = e.currentTarget;
            $(trigger).closest(".reference").remove();
            $("#reference-count").val( refCount - 1 );
        },

        editBook :function ()
        {
            var new_title = $('#qwizbook-title').val();
            var new_sub_title = $('#qwizbook-sub-title').val();
            var new_description = $('#qwizbook-description').val();
            var view = this;
            var qwizbook = view.qwizbookModel;
            qwizbook.create(new_title, new_sub_title, new_description);
        },

        showAuthorForm: function (e) {
            $('#my-qwizbooks-pages-form').removeClass("hidden");

        },

        createGuid: function()
    {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
            var r = Math.random()*16|0, v = c === 'x' ? r : (r&0x3|0x8);
            return v.toString(16);
        });
    },


        showReferenceContainer: function (e) {
            var target = e.currentTarget;
            var refCount = parseInt($("#reference-count").val());

            if (refCount >= this.MAX_REFERENCES_SUPPORTED) {
                var $msgModal = $('#qwiz-creation-error').modal({
                    backdrop: true,
                    show: false,
                    keyboard: false
                });

                this.showMsg($msgModal,"Error","Cannot have more than "+ this.MAX_REFERENCES_SUPPORTED + " references per Question.","close")
            }

            var newRef = $(".reference").clone();
            var uuid = this.createGuid();
            var newId = "reference-description-" + uuid;
            var newIdMedia = "reference-media-elements-" + uuid;

            $(newRef).find("label").attr("for",newId);
            $(newRef).find("label").text("Reference");
            $(newRef).find("textarea").attr('id',newId)
                .attr('name',newId);

            $(newRef).find("#reference-media-elements-X-urls").empty();
            $(newRef).find("#reference-media-elements-X").attr("for",newIdMedia)
                .attr('id',newIdMedia);
            $(newRef).find("#reference-media-elements-X-urls").attr('id',newIdMedia+'-urls');


            $(newRef).find(".refId").val("");
            $(target).parent().before(newRef);

            $("#reference-count").val( refCount + 1 );
        },

        showHintContainer: function (e) {
            var target = e.currentTarget;
            var refCount = parseInt($("#hint-count").val());

            if (refCount >= this.MAX_HINTS_SUPPORTED) {
                var $msgModal = $('#qwiz-creation-error').modal({
                    backdrop: true,
                    show: false,
                    keyboard: false
                });

                this.showMsg($msgModal,"Error","Cannot have more than "+ this.MAX_HINTS_SUPPORTED + " hints per Question.","close")
            }

            var newRef = $(".hint").clone();
            var uuid = this.createGuid();
            var newId = "hint-description-" + uuid;
            var newIdMedia = "hint-media-elements-" + uuid;

            $(newRef).find("label").attr("for",newId);
            $(newRef).find("label").text("Hint");
            $(newRef).find("textarea").attr('id',newId)
                .attr('name',newId);

            $(newRef).find("#hint-media-elements-X-urls").empty();
            $(newRef).find("#hint-media-elements-X").attr("for",newIdMedia)
                .attr('id',newIdMedia);
            $(newRef).find("#hint-media-elements-X-urls").attr('id',newIdMedia+'-urls');


            $(newRef).find(".refId").val("");
            $(target).parent().before(newRef);

            $("#hint-count").val( refCount + 1 );
        },

        showMsg: function ($msgModal, header, body, btnSubmitText, callback) {
            $msgModal
                .find('.modal-header > h3').text(header).end()
                .find('.modal-body').html(body).end()
                .find('.callback-btn').html(btnSubmitText).end()
                .find('.callback-btn').off('click.callback')
                .on('click.callback',function () {
                    callback;
                    $msgModal.modal('hide');
                }).end()
                .modal('show');
        },
        /**
        * 
        * Submit qwizbook page form
        */
        submitAuthorForm: function (e) {
            e.preventDefault();
            that = this;
            var questionType =  $("#question-type").val();
            var answers = that._getMultipleChoiceAnswers();

            if (!_.isArray(answers)) {
                console.log(answers.message);
                var $msgModal = $('#qwiz-creation-error').modal({
                    backdrop: true,
                    show: false,
                    keyboard: false
                });

                this.showMsg($msgModal,"Error",answers.message,"close")

                return
            }
            var question = that._getLinksObject("#question","#question-media-elements-urls");


            var multiple_choice_question = {
                questionType :questionType,
                question : question,
                answers : answers
            };

            // Reinforcement informations
            var reinforce = [this._getLinksObject("#reinforcement-description","#reinforcement-media-elements-urls", true, true)];


            var hints = [];
            for (var i = 0; i < this.MAX_HINTS_SUPPORTED; i++) {
                var hint = this._getLinksObject("#hint-description-"+i,"#hint-media-elements-"+i, true, true);
                if (!_.isEmpty(hint) && !_.isEmpty(hint.description) ){
                    hints.push(hint);
                }

            }



            // Create reference array
            var pageReferences = [],
                referenceCount = $("#reference-count").val();

            for (var i = 0; i < referenceCount; i++) {
                var reference = this._getLinksObject("#reference-description-"+i, "", true, true);
                if(!$.isEmptyObject(reference)){
                    pageReferences.push(reference);
                }
            };

            var qwizbookPage = {
                qwizbookId : this.qwizbookId,
                multiple_choice_question : multiple_choice_question,
                reinforce : reinforce,
                hints : hints
            }
            
            if($("#edit-page-id").val()!=''){
                var pageId = $("#edit-page-id").val();
                var pageModel = this.qwizbookPageCollection.get(pageId);
                pageModel.set({"multiple_choice_question" : multiple_choice_question});
                pageModel.set({"reinforce" : reinforce});
                pageModel.set({"hints" : hints});
                pageModel.url = "/qwizbooks/" + this.qwizbookId + "/pages/" + pageId;
                //pageModel.update();
                this.qwizbookPageCollection.getAllPages();
                console.log(pageReferences);
                var pageRefCollection = new PageReference.Collection(pageReferences);
                pageRefCollection.url = "/qwizbooks/" + this.qwizbookId + "/pages/" + pageId +"/references";
                pageRefCollection.save(function(model, response){
                    if(model){
                        pageModel.set({"referenceIds" : model});
                        console.log(model);
                        pageModel.update();
                    }
                });
                //console.log(pageRefCollection);
            }
            else{
                var qwizkookPageRefModel = new QwizBookPage.PageRefModel({
                    qwizbookPage : qwizbookPage,
                    pageReference : pageReferences
                });

                qwizkookPageRefModel.url = "/qwizbooks/" + this.qwizbookId + "/pages";
                qwizkookPageRefModel.create(function(model, response){
                    that.qwizbookPageCollection.getAllPages();
                });
            }

            $("#qwizbook-questionnare-form form")[0].reset();
            $("#qwizbook-questionnare-form .media-controls").remove();
            $('#my-qwizbooks-pages-form').addClass("hidden");
        },

        /**
        * Pivate method to get the description and related links
        * of Reference and Re-inforce sections. It avoids creating object attributes
        * that have no values.
        *
        * @param {String} elemId Element id
        * @param {Bool} withExternal If webLink attribute is required.
        */
        _getLinksObject : function( elemId,mediaElemId, withExternal, objDesc ){
            var obj = {};
            // if($(elemId).next(".refId").length && $(elemId).next(".refId").val()){
            //     obj._id = $(elemId).next(".refId").val();
            // }
            if (!_.isEmpty(elemId)) {
                if (( description = $.trim($(elemId).val())) != "") {
                    if (objDesc) {
                        obj.description = description;
                    }
                    else {
                        obj.text = description;
                    }
                }
            }



            if (!_.isEmpty(mediaElemId))
            {
                if (( externalLink = this._getMediaLink($(mediaElemId), "external")) && withExternal) {
                    obj.webLinks = [
                        { url: externalLink }
                    ];
                }
                if (( videoLink = this._getMediaLink($(mediaElemId), "video"))) {
                    obj.videoLinks = [
                        { url: videoLink }
                    ]
                }
                if (( imageLink = this._getMediaLink($(mediaElemId), "image"))) {
                    obj.imageLinks = [
                        { url: imageLink }
                    ]
                }
                if (( audioLink = this._getMediaLink($(mediaElemId), "audio"))) {
                    obj.audioLinks = [
                        { url: audioLink }
                    ]
                }
            }
            return obj;
        },

        /**
        *
        * Private function to get the array of multiple choice answer
        */
        _getMultipleChoiceAnswers : function(){
            var answers = [];
            var error = {}
            var atleastOneAnswerCorrect = false;

            for (var i = 0; i < 4; i++) {
                var item_id = String.fromCharCode('A'.charCodeAt() + i);
                var option_name= "option-"+item_id;
                var correct_option_checkbox_name = "answer-option-"+item_id;
                var input_item_val = $('input[name='+option_name+']').val();
                var input_item_checked = $('input[name='+correct_option_checkbox_name+']').is(":checked");

                if (input_item_checked) {
                    atleastOneAnswerCorrect = true;
                }

                if (_.isEmpty(input_item_val)) {
                    error.message ="Answer option cannot be empty."
                    answers = error;
                    return answers;
                }
                var mediaObject = that._getLinksObject("","#answer-media-elements-"+item_id+"-urls");

                var answer = {
                    choice : {text : input_item_val} ,
                    correct : input_item_checked
                }

                if (!_.isEmpty(mediaObject)) {
                    _.extend(answer.choice, mediaObject);
                }
                answers.push(answer);
            }

            // Return empty array if atleast once option not marked as correct
            if (!atleastOneAnswerCorrect) {
                error.message ="Atleast one Answer option should be marked correct.Please use the check box on the right side of the answer."
                answers = error;
                return answers;
            }

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
            var value = elm.parents(".form-group").find("." + type + "-url").val();
            return $.trim(value) || null;
        },

        cancelAuthorForm: function (e) {
            e.preventDefault();
            $("#qwizbook-questionnare-form form")[0].reset();
            $("#qwizbook-questionnare-form .media-controls").remove();
            $('#my-qwizbooks-pages-form').addClass("hidden");
            this._clearReferences();
        },

        /**
        *
        * Delete quizbook page
        */
        deleteQwizbookPage: function(e){
            //e.preventDefault();
            var pageId = $(e.currentTarget)
                            .attr("id")
                            .trim()
                            .replace("delete-page_","");
            var page = this.qwizbookPageCollection.get(pageId);
            page.delete();
        },

        /**
        *
        * Delete quizbook pages
        */
        deleteQwizbookPages: function(e){
            var view = this;
            e.preventDefault();
            var checked = $(".page-item input[type=checkbox]:checked");
            _.each(checked, function(item){
                var idAttr = $(item).attr("id")
                var pageId = idAttr.trim().replace("qwizbookpage-item_","");
                var page = view.qwizbookPageCollection.get(pageId);
                page.delete();
            })
        },

        editQwizbookPage: function(e){
           // e.preventDefault();
            this._clearReferences();
            var view = this;
            var   elm = e.currentTarget;
            var pageId = elm.id.replace("edit-page_","");
            var page = view.qwizbookPageCollection.get(pageId).toJSON();
            var objQuestion = page.multiple_choice_question;
            var objAnswer = objQuestion.answers;
            var pageRefCollection = new PageReference.Collection();
            pageRefCollection.url = "/qwizbooks/"+this.qwizbookId+"/pages/"+pageId+"/references";

            // fill fields
            $("#edit-page-id").val(pageId);
            $("#question-type").val(objQuestion.questionType);
            this._editSupportObject("question","question-media-elements",objQuestion.question);

            // Fill in the answer media elements
            for (var i = 0; i < 4; i++) {
                var item_id = String.fromCharCode('A'.charCodeAt() + i);
                this._editSupportObject("option-" + item_id, "answer-media-elements-" + item_id, objAnswer[i].choice);
                var correct_option_checkbox_name = "answer-option-"+item_id;
                // Update the answer select checkbox
                $('input[name='+correct_option_checkbox_name+']').attr('checked', objAnswer[i].correct);
            }



            // Hint
            if(page.hints[0]){
                $("#hint-description").val(page.hints[0].text);
                page.hints[0].imageLinks[0] && $("#hint-image").val(page.hints[0].imageLinks[0].url);
            }

            this._editSupportObject("reinforcement-description","reinforcement-media-elements",page.reinforce[0]);


            pageRefCollection.getAll(function(collection){
                pageRefCollection.forEach(function(model,index){
                    var elemId = "reference-description-" + index;
                    if(index>0){
                        view.showReferenceContainer();
                    }
                    view._editSupportObject(elemId, model.toJSON());
                });
            });

            $('#my-qwizbooks-pages-form').removeClass("hidden");

        },

        _editSupportObject:function(elemId, mediaElemId, obj){
            if(obj._id){
                var idElem = '<input type="hidden" class="refId" value="'+obj._id+'">';
                $(idElem).insertAfter("#"+elemId);
            }
            if(obj.text){
                $("#"+elemId).val(obj.text);
            }
            else if(obj.description){
                $("#"+elemId).val(obj.description);
            }
            if(obj.audioLinks && obj.audioLinks[0]){
                this._editSupportLink(mediaElemId,"audio",obj.audioLinks[0].url);
            }
            if(obj.imageLinks && obj.imageLinks[0]){
                this._editSupportLink(mediaElemId,"image",obj.imageLinks[0].url);
            }
            if(obj.videoLinks && obj.videoLinks[0]){
                this._editSupportLink(mediaElemId,"video",obj.videoLinks[0].url);
            }
            if(obj.webLinks && obj.webLinks[0]){
                this._editSupportLink(mediaElemId,"external",obj.webLinks[0].url);
            }
        },

        _editSupportLink: function(elemId,type, value){
            var control = $(".templates .form-group."+type).clone(),
              controlId = elemId + "-" + type,
                controlInsertId=elemId + "-" + "urls";

            $(control).children().first().attr("id",controlId);
            $(control).children().find('.'+type+'-url').val(value);
            $("#"+controlInsertId).append(control);
        },

        _clearReferences: function(){
            $(".form-group.reference:not(:first)").remove();
            $("#reference-count").val(1);
            $(".form-group.reference").find("textarea").val("");
            $(".form-group.reference").find(".media-controls").remove();
        },

        /**
        *
        * Update quizbook page listing view
        */
        updateQwizbookPageListing: function(e){
            var view = this;
            $("#qwizbookpage-list").html("");
            view.qwizbookPageCollection.forEach(function(model){
                var templ = _.template(
                        TmplPageListItem, 
                        {
                            id: model.get("_id"),
                            question:model.get("multiple_choice_question").question.text
                        }
                    )
                $("#qwizbookpage-list").append(templ);
            })
        },

        template: Template,

        render: function () {
            var view = this;
            view.qwizbookPageCollection.getAllPages();
            this.$el.html(_.template(this.template));

            //$(this.el).find("#qwizbook-create-form").append(this.editQwizbook.render().el);
            return this;
        }
    });

    module.exports = QwizbookAddDetailsContent;

});