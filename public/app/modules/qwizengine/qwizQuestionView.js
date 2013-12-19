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
    "text!modules/qwizengine/templates/imageLinks.html",
    "text!modules/qwizengine/templates/audioLinks.html",
    "text!modules/qwizengine/templates/videoLinks.html"
], function (App, Template,ImageLinkTmpl,AudioLinkTmpl, VideoLinkTmpl) {

    // Create a new module
    var QwizQuestionView = App.module();

    QwizQuestionView.View = Backbone.View.extend({

        template: Template,

        initialize: function () {

            _.declarePartial('imageLinks', ImageLinkTmpl);
            _.declarePartial('audioLinks', AudioLinkTmpl);
            _.declarePartial('videoLinks', VideoLinkTmpl);

        },

        render: function () {

            //  Todo: FINAL CODE ,to be enabled once model is passed
            // this.$el.html(_.template(this.template, this.options.model.toJSON()));

            // Todo : --TEST STUB START--
            var data = {
                "title": "The Drunken Botanist: The Plants That Create the World's Great Drinks",
                "chapterTitle" : "Syrups, Infusions and Garnishes",
                "multiple_choice_question": {

                    "question":{"text":"where is my dog?",
                        "imageLinks" : [
                            {
                                "url" : "http://www.innz.net.nz/wp-content/uploads/2013/01/hello.jpg",
                                "_id" : "AAA",
                                "description": "Hello"
                            },
                            {
                                "url" : "http://static4.wikia.nocookie.net/__cb20131020211558/freerealmswarriorcats/images/4/48/15340193-peace-symbol.jpg",
                                "_id" : "BBB",
                                "description": "Peace"
                            }
                        ],
                        "audioLinks" : [
                            {
                                "url" : " <iframe width='100%' height='166' scrolling='no' frameborder='no' src='https://w.soundcloud.com/player/?url=http%3A%2F%2Fapi.soundcloud.com%2Ftracks%2F47319680'></iframe>",
                                "description": "Hello"
                            },
                            {
                                "url" :" <iframe width='100%' height='166' scrolling='no' frameborder='no' src='https://w.soundcloud.com/player/?url=http%3A%2F%2Fapi.soundcloud.com%2Ftracks%2F47319680'></iframe>",
                                "_id" : "BBB",
                                "description": "pulo"
                            }
                        ],  "videoLinks" : [
                            {
                                "url" : "<iframe class='youtube-player' type='text/html' width='420' height='315' src='http://www.youtube.com/embed/k6U-i4gXkLM' frameborder='0'></iframe>",
                                "_id" : "AAA",
                                "description": "Hello"
                            },
                            {
                                "url" : "<iframe src='http://player.vimeo.com/video/66177806' width='500' height='213' frameborder='0' webkitAllowFullScreen mozallowfullscreen allowFullScreen></iframe> <p><a href='http://vimeo.com/66177806'>Cul-de-Sac</a> from <a href='http://vimeo.com/connorsimpson'>Connor Simpson</a> on <a href='http://vimeo.com'>Vimeo</a>.</p>",
                                "_id" : "BBB",
                                "description": "pulo"
                            }
                        ]
                    },
                    "answers" : [
                        {
                            "correct" : true,
                            "_id" : "51b3da48092d9c921600001f",
                            "choice" : {
                                "text" : "rock",
                                "audioLinks" : [ ],
                                "imageLinks" : [ ],
                                "videoLinks" : [ ]
                            }
                        },
                        {
                            "correct" : false,
                            "_id" : "51b3da48092d9c921600001e",
                            "choice" : {
                                "text" : "scissors",
                                "audioLinks" : [ ],
                                "imageLinks" : [ ],
                                "videoLinks" : [ ]
                            }
                        },
                        {
                            "correct" : false,
                            "_id" : "51b3da48092d9c921600001d",
                            "choice" : {
                                "text" : "solid",
                                "audioLinks" : [ ],
                                "imageLinks" : [ ],
                                "videoLinks" : [ ]
                            }
                        },
                        {
                            "correct" : false,
                            "_id" : "51b3da48092d9c921600001c",
                            "choice" : {
                                "text" : "bottom",
                                "audioLinks" : [ ],
                                "imageLinks" : [ ],
                                "videoLinks" : [ ]
                            }
                        }
                    ]
                }
            };


            this.$el.html(_.template(this.template, data));
            // -- TEST STUB END--

            return this;
        },


        events: {
            "click #qwiz-control-prev": "goToPrevView",
            "click #qwiz-control-next": "goToNextView",
            "click #qwiz-control-hint": "goToHintView",
            "click .qwiz-control-done": "goToDoneView"
        },

        goToNextView: function(e) {
            this.trigger('qwiz-transition-next');
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
