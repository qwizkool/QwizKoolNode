define([
    "app",
    "modules/qwizbook/qwizbookrating",
    "modules/qwizbook/qwizbookCollection",
    "text!modules/qwizbook/templates/qwizbookListItem.html"
], function (App, QwizBookRating, QwizBook, TmplQwizbookItem) {

    QwizBook.View = Backbone.View.extend({

        template: TmplQwizbookItem,

        initialize: function () {


            if (_.isEmpty(this.options.session)) {
                throw "ERROR: Session object is not provided for the view!!"
            }

            this.session = this.options.session;

            var currentUserEmail = this.session.get('email');
            this.qwizbookRating = new QwizBookRating.Model({userEmail: currentUserEmail});
            this.listenTo(this.qwizbookRating, "qwizbookrating-add-event", function (response) {
                    var rating = response.rating;
                    var qId = response.qId;
                    var count = response.count;
                    var avg = response.avgRating;
                    avg = Math.ceil(avg);
                    var html = '';
                    for (i = 1; i <= avg; i++) {
                        html += '<i class="fa fa-star text-primary"></i>';
                    }

                    if (count > 1)  {
                        html += '<p  class="text-muted" >'+ count +  ' ratings</p>';
                    } else {
                        html += '<p  class="text-muted" >'+ count +  ' rating</p>';
                    }

                    var ratingElement = 'qwizbook-rating-container_' + qId;
                    $('#' + ratingElement + ' span').html(html);

            });
        },

        render: function (done) {

            var view = this;

            view.el.innerHTML = _.template(this.template, view.model.toJSON());

            return this;
        },


        events: {
            "click button": "openQwizbook",
            "click .rating-input": "updateQwizbookRating"
        },

        updateQwizbookRating: function (e) {

            var id = $(e.currentTarget).closest('div').find("input[name='qwizbook-rating']").attr('id');

            if (id) {
                var split_id = id.split("_");
                var qId = split_id[1];
                var starValue = $(e.currentTarget).closest('div').find("input[name='qwizbook-rating']").val();
                if (starValue === "") {
                    starValue = "0";
                }
                //console.log("Value of stars for "+ id + " :" + starValue);
                this.qwizbookRating.addRating(qId, starValue);
            }

        },

        openQwizbook: function (e) {
            var clickedEl = $(e.currentTarget);
            var id = clickedEl.attr("id");
            Backbone.history.navigate("#qwizbookDetails/" + id, true);
        }
    });

    return QwizBook;
});