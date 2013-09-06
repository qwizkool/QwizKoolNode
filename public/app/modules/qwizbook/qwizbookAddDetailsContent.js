
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

    var QwizbookAddDetailsContent = App.module();

    QwizbookAddDetailsContent.View = Backbone.View.extend({

        initialize: function () {
            this.session = this.options.session;
            
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

        },

        updateView : function() {
            $(this.el).find("#qwizbook-create-form").append(this.editQwizbook.render().el);
        },

       events: {
            "click #create-page-btn": "showAuthorForm",
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
            "click .media-hide" : "removeSupportLink",
            "click #delete-all-btn" : "deleteQwizbookPages",
            "click .page-delete" : "deleteQwizbookPage",
            "click .page-edit": "editQwizbookPage"
        },
        
        addSupportLink: function(e){
            var trigger = e.target.parentNode,
                type = $(trigger).attr("class").replace(/(btn |-toggler)/g,""),
                input = $(trigger).parents(".controls").children().first(),
                control = $(".templates .controls."+type).clone(),
                inputId = $(input).attr("id"),
                controlId = inputId + "-" + type;
            if($("#" + controlId).length > 0){
               // $("#" + controlId).parents(".controls.media-controls").remove();
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
            $('#my-qwizbooks-pages-form').removeClass("hidden");

        },
        
        
        showReferenceContainer: function (e) {
            var newRef = $("#reference-description-0").parents(".reference").clone(),
                refCount = parseInt($("#reference-count").val()),
                newId = "reference-description-" + refCount;
            $(newRef).children("label").attr("for",newId);
            $(newRef).find("textarea").attr('id',newId)
                                      .attr('name',newId);
            $(newRef).children(".media-controls").remove();
            $(newRef).find(".refId").val("");
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
                var reference = this._getLinksObject("#reference-description-"+i, true, true);
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
        _getLinksObject : function( elemId, withExternal, objDesc ){
            var obj = {};
            // if($(elemId).next(".refId").length && $(elemId).next(".refId").val()){
            //     obj._id = $(elemId).next(".refId").val();
            // }
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
            var pageId = $(e.target)
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
            var view = this,
                elm = e.target;
            if($(elm).attr("class")!="page-edit"){
                elm = $(elm).parent()[0];
            }
            var pageId = elm.id.replace("edit-page_","");
            var page = view.qwizbookPageCollection.get(pageId).toJSON();
            var objQuestion = page.multiple_choice_question;
            var objAnswer = objQuestion.answers;
            var pageRefCollection = new PageReference.Collection();
            pageRefCollection.url = "/qwizbooks/"+this.qwizbookId+"/pages/"+pageId+"/references";

            // fill fields
            $("#edit-page-id").val(pageId);
            $("#question-type").val(objQuestion.questionType);
            this._editSupportObject("question",objQuestion.question);
            this._editSupportObject("option-a",objAnswer[0].choice);
            this._editSupportObject("option-b",objAnswer[1].choice);
            this._editSupportObject("option-c",objAnswer[2].choice);
            this._editSupportObject("option-d",objAnswer[3].choice);
            
            // Hint
            if(page.hints[0]){
                $("#hint-description").val(page.hints[0].text);
                page.hints[0].imageLinks[0] && $("#hint-image").val(page.hints[0].imageLinks[0].url);
            }

            this._editSupportObject("reinforcement-description",page.reinforce[0]);
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

        _editSupportObject:function(elemId, obj){
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
                this._editSupportLink(elemId,"audio",obj.audioLinks[0].url);
            }
            if(obj.imageLinks && obj.imageLinks[0]){
                this._editSupportLink(elemId,"image",obj.imageLinks[0].url);
            }
            if(obj.videoLinks && obj.videoLinks[0]){
                this._editSupportLink(elemId,"video",obj.videoLinks[0].url);
            }
            if(obj.webLinks && obj.webLinks[0]){
                this._editSupportLink(elemId,"external",obj.webLinks[0].url);
            }
        },

        _editSupportLink: function(elemId,type, value){
            var control = $(".templates .controls."+type).clone(),
                controlId = elemId + "-" + type;
            $(control).children().first().attr("id",controlId);
            $(control).children().first().val(value);
            $("#" + elemId).parents(".control-group").append(control);
        },

        _clearReferences: function(){
            $(".control-group.reference:not(:first)").remove();
            $("#reference-count").val(1);
            $(".control-group.reference").find("textarea").val("");
            $(".control-group.reference").find(".media-controls").remove();
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
            this.el.innerHTML = this.template;
            //$(this.el).find("#qwizbook-create-form").append(this.editQwizbook.render().el);
            return this;
        }
    });

    module.exports = QwizbookAddDetailsContent;

});