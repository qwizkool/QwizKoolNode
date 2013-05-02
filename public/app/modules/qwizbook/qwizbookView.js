    
define([
    "app",
    "module/qwizbook/qwizbookModel",
    "text!templates/qwizbookListItem.html"
], function(App, QwizBook, TmplQwizbookItem){

    QwizBook.View = Backbone.View.extend({

        template:TmplQwizbookItem,

        initialize:function () {


            if (_.isEmpty(this.options.session)) {
                throw "ERROR: Session object is not provided for the view!!"
            }

            this.session = this.options.session;

            var currentUserEmail = this.session.get('email');
            this.qwizbookRating = new QwizBookRating.Model({userEmail : currentUserEmail});
            this.listenTo(this.qwizbookRating, "qwizbookrating-add-event", function (response) {
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
                var userrating = 'rat_' + qId;
                var ratingCount = 'count_' + qId;
                var averageRating = 'avg_' + qId;
                $('#' + ratingCount).html(count + ' ratings ');
                $('#' + userrating).html(html);
                $('#' + averageRating).html(avgHtml);

            });
        },

        render:function (done) {

            var view = this;

            view.el.innerHTML  = _.template(this.template, view.model.toJSON());

            var avgRating = $(view.el.innerHTML).find(".book_avgRating").val();
            var userRating = $(view.el.innerHTML).find(".book_userrating").val();
            var bookId = $(view.el.innerHTML).find(".book_id").val();
            avgRating = Math.ceil(avgRating);
            var avgHtml = '';
            var i = 1;
            avgHtml += '<ul id="avg_' + bookId + '" class="rating-w-fonts" style="margin: 10px">';
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
            avgHtml += '</ul>';


            var ratingHtml = '';
            i = 1;
            ratingHtml += '<ul id="rat_' + bookId + '" class="rating-w-fonts" style="margin: 10px">';
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
            ratingHtml += '</ul>';
            $(view.el).find("#qbookaverage_rating").append(avgHtml);
            $(view.el).find("#book_userRating").append(ratingHtml);
            return this;
        },
        
        

        events:{
            "click button":"openQwizbook",
            "click #rating-1":"setRating1",
            "click #rating-2":"setRating2",
            "click #rating-3":"setRating3",
            "click #rating-4":"setRating4",
            "click #rating-5":"setRating5"
        },

        openQwizbook:function (e) {
            var clickedEl = $(e.currentTarget);
            var id = clickedEl.attr("id");
            Backbone.history.navigate("#qwizbookDetails/" + id, true);

            //this.trigger('getQwizbook', {qwizbookCriteria: id, openDescription:this.options.collection});
        },

        setRating1:function (e) {
            var ul_id = e.target.parentNode.id;
            var split_id = ul_id.split("_");
            var qBook_id = split_id[1];
            var ratingval = $('#rating-1').val();
            this.qwizbookRating.addRating(qBook_id, ratingval);
        },

        setRating2:function (e) {
            var ul_id = e.target.parentNode.id;
            var split_id = ul_id.split("_");
            var qBook_id = split_id[1];
            var ratingval = $('#rating-2').val();
            this.qwizbookRating.addRating(qBook_id, ratingval);
        },

        setRating3:function (e) {
            var ul_id = e.target.parentNode.id;
            var split_id = ul_id.split("_");
            var qBook_id = split_id[1];
            var ratingval = $('#rating-3').val();
            this.qwizbookRating.addRating(qBook_id, ratingval);
        },

        setRating4:function (e) {
            var ul_id = e.target.parentNode.id;
            var split_id = ul_id.split("_");
            var qBook_id = split_id[1];
            var ratingval = $('#rating-4').val();
            this.qwizbookRating.addRating(qBook_id, ratingval);
        },

        setRating5:function (e) {
            var ul_id = e.target.parentNode.id;
            var split_id = ul_id.split("_");
            var qBook_id = split_id[1];
            var ratingval = $('#rating-5').val();
            this.qwizbookRating.addRating(qBook_id, ratingval);
        }
    });

    return QwizBook;
});