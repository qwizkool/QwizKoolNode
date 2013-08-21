/*!
 * Copyright(c) 2013 Vibrentt
 *
 * Module : QwizBookRating
 *
 *
 */
define(["app"], function (App) {

    // Create a new module
    var QwizBookRating = App.module();

    QwizBookRating.Model = Backbone.Model.extend({

        urlRoot: "/qwizbookrating/",

        defaults: {
            id: null,
            userEmail: "qwizkool_user@qwizkool.com",
            qwizbookId: null,
            rating: 0,
            isRatedqwizBook: false

        },

        initialize: function () {


        },

        addRating: function (qbId, rating) {

            this.set('qbookId', qbId);
            this.set('isRatedqwizBook', false);
            this.set('ratingval', rating);
            var jqxhr = this.save({}, {

                error: function (model, response) {
                    model.set({
                        isRatedqwizBook: false
                    });
                    model.trigger('qwizbookrating-add-event');
                },

                success: function (model, response) {
                    model.trigger('qwizbookrating-add-event', response);
                }
            });

        }
    });

    QwizBookRating.Collection = Backbone.Collection.extend({

        model: QwizBookRating.Model,
        url: function () {
            var urlRoot = "/qwizbookrating/";

            return urlRoot;

        }
    });


    // Required, return the module for AMD compliance
    return QwizBookRating;

});

