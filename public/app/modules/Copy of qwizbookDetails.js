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
            
            initialize:function () {
            this.qwizbookId = this.options.qwizbookId;	
            /*
            this.userCommentmodel = new QwizBookRating.Model({id:this.qwizbookId});
                var jqxhr = this.userCommentmodel.fetch({

                    error:function (model, response) {
                        console.log("Failed to get QwizBook!");
                    },

                    success:function (model, response) {

                        if (response == '') {
                            var rating = '';

                        }
                        else {
                            var rating = response[0].rating;
                        }

                        var html = '';
                        var i = 1;
                        html += '<h5>Click to rate:</h5> <ul  class="rater rating-w-fonts">';
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

                        html += '</ul>';

                        this.userRating = html;
                    }

                });
                
                this.qwizbookratingmodel = new QwizBookRating.Model();
                this.qwizbookratingmodel.on("add-qwizbookrating-event", function (rating) {

                    var html = '';

                    var i = 1;
                    html += '<h5>Click to rate:</h5> <ul  class="rater rating-w-fonts">';
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

                    html += '</ul>';

                    $("#qwizbookUserrating").html(html);

                });
                */

            }
            ,
            
            
            
            template:Template,

            render:function (done) {

                var view = this;
                var qbook_itemdetail_template;
                var qbookdet = Array();
                qbookdet = view.model.toJSON();
                //alert(qbookdet.title);
                qbook_itemdetail_template = _.template(this.template, view.model.toJSON());
                //alert(qbook_itemdetail_template);
                view.el.innerHTML = qbook_itemdetail_template;
                //console.log(view.el.innerHTML);
                $(view.el).find("#qwizbook-content-container").append(view.el.innerHTML );
                //$(view.el).find("#qwizbookUserrating").append(this.userRating);
                //$(view.el).find("#average-rating").append(this.averageRating);


                return this;

            },

            events:{
            	"click #rating-1":"setRating1",
                "click #rating-2":"setRating2",
                "click #rating-3":"setRating3",
                "click #rating-4":"setRating4",
                "click #rating-5":"setRating5"
            },

            
            setRating1:function () {

                this.trigger('addrating', {ratingval:$('#rating-1').val(), ratingmodel:this.qwizbookratingmodel});
            },

            setRating2:function () {
                this.trigger('addrating', {ratingval:$('#rating-2').val(), ratingmodel:this.qwizbookratingmodel});
            },

            setRating3:function () {
                this.trigger('addrating', {ratingval:$('#rating-3').val(), ratingmodel:this.qwizbookratingmodel});
            },

            setRating4:function () {
                this.trigger('addrating', {ratingval:$('#rating-4').val(), ratingmodel:this.qwizbookratingmodel});
            },

            setRating5:function () {
                this.trigger('addrating', {ratingval:$('#rating-5').val(), ratingmodel:this.qwizbookratingmodel});
            }

        });

        return QwizbookDetails;

    });