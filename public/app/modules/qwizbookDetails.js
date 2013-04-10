/*!
 * Copyright(c) 2013 Vibrentt
 *
 * Module : QwizbookDetails
 *
 *
 */
define([
    "app",
    "modules/qwizbook",
    "modules/comments",
    "modules/qwizbookrating",
    "modules/qwizbookUserRating",
    "text!templates/qwizbookDetails.html"
],
    function (App, QwizBook, Comments, QwizBookRating, QwizbookUserRating, Template) {
        // Create a new module
        var QwizbookDetails = App.module();

        QwizbookDetails.View = Backbone.View.extend({

            initialize: function () {

                if (_.isEmpty(this.options.session)) {
                    throw "ERROR: Session object is not provided for the view!!"
                }

                this.session = this.options.session;

                this.qwizbookId = this.options.qwizbookId;

                var currentUserEmail = this.session.get('email');
                this.qwizbookRating = new QwizBookRating.Model({userEmail: currentUserEmail});


                this.qwizbookRating.on("qwizbookrating-add-event", function (response) {
                    var rating = response.rating;
                    var qId = response.qId;
                    var count = response.count;
                    var avg = response.avgRating;
                    avg = Math.ceil(avg);
                    var html = '';

                    var i = 1;
                    if (rating) {
                        for (i = 1; i <= rating; i++) {
                            html += '<li id="rating-' + i + '" class="rated" name="rating-' + i + '" value="' + i + '">R</li>';
                        }
                        if (i <= 5) {
                            for (j = i; j <= 5; j++) {
                                html += '<li id="rating-' + j + '" name="rating-' + j + '" value="' + j + '">R</li>';
                            }
                        }
                    }
                    else {
                        for (j = 1; j <= 5; j++) {
                            html += '<li id="rating-' + j + '" name="rating-' + j + '" value="' + j + '">R</li>';
                        }
                    }


                    var avgHtml = '';
                    i = 1;
                    if (avg) {
                        for (i = 1; i <= avg; i++) {
                            avgHtml += '<li  class="rated" name="rating-' + i + '" value="' + i + '">R</li>';
                        }
                        if (i <= 5) {
                            for (j = i; j <= 5; j++) {
                                avgHtml += '<li  name="rating-' + j + '" value="' + j + '">R</li>';
                            }
                        }
                    }
                    else {
                        for (j = 1; j <= 5; j++) {
                            avgHtml += '<li  name="rating-' + j + '" value="' + j + '">R</li>';
                        }
                    }
                    $('#ratingCount').html(count + ' ratings ');
                    $('#qwizbookUserrating').html(html);
                    $('#average-rating').html(avgHtml);

                });


            },

            template: Template,

            render: function (done) {

                var view = this;
                var qbook_itemdetail_template;
                console.log(this.model);
                qbook_itemdetail_template = _.template(this.template, this.model.toJSON());
                view.el.innerHTML = qbook_itemdetail_template;
              
                var avgRating = $(view.el.innerHTML).find("#book_avgRating").val();
                var userRating = $(view.el.innerHTML).find("#book_userrating").val();
                avgRating = Math.ceil(avgRating);
                var avgHtml = '';
                var i = 1;
                if (avgRating) {
                    for (i = 1; i <= avgRating; i++) {
                        avgHtml += '<li  class="rated" name="rating-' + i + '" value="' + i + '">R</li>';
                    }
                    if (i <= 5) {
                        for (j = i; j <= 5; j++) {
                            avgHtml += '<li  name="rating-' + j + '" value="' + j + '">R</li>';
                        }
                    }
                }
                else {
                    for (j = 1; j <= 5; j++) {
                        avgHtml += '<li  name="rating-' + j + '" value="' + j + '">R</li>';
                    }
                }


                var ratingHtml = '';
                i = 1;
                if (userRating) {
                    for (i = 1; i <= userRating; i++) {
                        ratingHtml += '<li id="rating-' + i + '" class="rated" name="rating-' + i + '" value="' + i + '">R</li>';
                    }
                    if (i <= 5) {
                        for (j = i; j <= 5; j++) {
                            ratingHtml += '<li id="rating-' + j + '" name="rating-' + j + '" value="' + j + '">R</li>';
                        }
                    }
                }
                else {
                    for (j = 1; j <= 5; j++) {
                        ratingHtml += '<li id="rating-' + j + '" name="rating-' + j + '" value="' + j + '">R</li>';
                    }
                }
                $(view.el).find("#average-rating").append(avgHtml);
                $(view.el).find("#qwizbookUserrating").append(ratingHtml);
                $(view.el).find("#qwizbook-content-container").append(view.el.innerHTML);
                return this;

            },

            events: {
                "click #rating-1": "setRating1",
                "click #rating-2": "setRating2",
                "click #rating-3": "setRating3",
                "click #rating-4": "setRating4",
                "click #rating-5": "setRating5"
            },


            addRating: function (ratingdataObj) {

                var ratingvalue = ratingdataObj.ratingval;
                var qbookId = this.qwizbookId;
                var qwizbookratingmodel = ratingdataObj.ratingmodel;
                qwizbookratingmodel.addRating(qbookId, ratingvalue);

            },

            setRating1: function () {

                this.addRating({ratingval: $('#rating-1').val(), ratingmodel: this.qwizbookRating});
            },

            setRating2: function () {
                this.addRating({ratingval: $('#rating-2').val(), ratingmodel: this.qwizbookRating});
            },

            setRating3: function () {
                this.addRating({ratingval: $('#rating-3').val(), ratingmodel: this.qwizbookRating});
            },

            setRating4: function () {
                this.addRating({ratingval: $('#rating-4').val(), ratingmodel: this.qwizbookRating});
            },

            setRating5: function () {
                this.addRating({ratingval: $('#rating-5').val(), ratingmodel: this.qwizbookRating});
            }

        });

        return QwizbookDetails;

    });