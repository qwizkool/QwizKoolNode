define([
    "app",
    "modules/qwizbook/qwizbookView",
    "modules/editQwizbook",
    "modules/qwizbook/qwizbookPageModel",
    "text!templates/qwizbookAddDetailsContent.html"

], function (App, QwizBook, EditQwizbook, QwizBookPage, Template) {

    var QwizbookAddDetailsContent = App.module();

    QwizbookAddDetailsContent.View = Backbone.View.extend({

        initialize: function () {
            this.session = this.options.session;
            
            if (_.isEmpty(this.options.session)) {
                throw "ERROR: Session object is not provided for the view!!"
                    }
           
            this.qwizbookId = this.options.qwizbookId;
            this.qwizbookModel = new QwizBook.Model({_id:this.qwizbookId, session:this.session});
            this.qwizBookPageModel = new QwizBookPage.Model();
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
            var questionType = $("#question-type").val();
            var that = this;

            var multiple_choice_question = {
                questionType : $("#question-type").val(),
                question : {
                    text : $("#question").val(),
                    videoLinks : [{ url : that._getMediaLink($("#question"), "video")}],
                    imageLinks : [{ url : that._getMediaLink($("#question"), "image")}],
                    audioLinks : [{ url : that._getMediaLink($("#question"), "audio")}]
                },
                answers : that._getMultipleChoiceAnswers()
            };

            // Reinforcement informations
            var reinforce = [{
                description : $.trim($("#reinforcement-description").val()),
                webLinks   : [{ url : that._getMediaLink($("#reinforcement-description"), "external")}],
                videoLinks : [{ url : that._getMediaLink($("#reinforcement-description"), "video")}],
                imageLinks : [{ url : that._getMediaLink($("#reinforcement-description"), "image")}],
                audioLinks : [{ url : that._getMediaLink($("#reinforcement-description"), "audio")}]
            }];

            // Page hints
            var hints = [{
                text : $("#hint-description").val(),
                imageLinks : [{
                    url : $("#hint-image").val()
                }]
            }];


            // Create reference array
            var pageReferences = [],
                referenceCount = $("#reference-count").val();

            for (var i = 0; i < referenceCount; i++) {
                var reference = {
                    description : $("#reference-description-"+i).val(),
                    webLinks   : [{ url : that._getMediaLink($("#reference-description-"+i), "external")}],
                    videoLinks : [{ url : that._getMediaLink($("#reference-description-"+i), "video")}],
                    imageLinks : [{ url : that._getMediaLink($("#reference-description-"+i), "image")}],
                    audioLinks : [{ url : that._getMediaLink($("#reference-description-"+i), "audio")}]
                };
                pageReferences.push(reference);
            };

            var qwizbookPage = {
                qwizbookId : this.qwizbookId,
                multiple_choice_question : multiple_choice_question,
                reinforce : reinforce,
                hints : hints
            }
            var qwizkookPageModel = new QwizBookPage.Model(qwizbookPage);
            qwizkookPageModel.url = "/qwizbooks/" + this.qwizbookId + "/pages";
            qwizkookPageModel.create(function(model, response){
                var pageId = response.id;
                console.log(pageId);
                _.each(pageReferences, function(item){
                    item.pageId = pageId;
                })
                console.log(pageReferences);
            });
            //$('#qwizbook-questionnare-content').hide();
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
                    choice : {
                        text: $(input).val(),
                        videoLinks : [{ url : that._getMediaLink($(input), "video")}],
                        imageLinks : [{ url : that._getMediaLink($(input), "image")}],
                        audioLinks : [{ url : that._getMediaLink($(input), "audio")}],
                    },
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