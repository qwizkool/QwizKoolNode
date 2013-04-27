/*!
 * Copyright(c) 2013 Vibrentt
 *
 * Module : myQwizbook
 *
 *
 */

define([
    "app",
    "text!templates/mybookListItem.html",
    "text!templates/myBookList.html"
], function (App, TmplQwizbookItem, TmplQwizbookList) {

    // Create a new module
    var MyQwizBook = App.module();

    MyQwizBook.Model = Backbone.Model.extend({

    });

    MyQwizBook.Collection = Backbone.Collection.extend({
    });

    MyQwizBook.Router = Backbone.Router.extend({/* ... */ });

    MyQwizBook.View = Backbone.View.extend({

        template: TmplQwizbookItem,

        initialize: function () {

            if (_.isEmpty(this.options.session)) {
                throw "ERROR: Session object is not provided for the view!!"
            }

            this.session = this.options.session;

        },

        render: function (done) {

            var view = this;

            view.el.innerHTML = _.template(this.template, view.model.toJSON());
            id = view.model.id;
            var getPublishOrunpublish = $(view.el).find("#published_" + id).val();
            if (getPublishOrunpublish == 'true') {
                $(view.el).find("#qwizbookPublishOrUnpublish_" + id+' span').html("Unpublish");
                $(view.el).find("#qwizbookPublishOrUnpublish_" + id+' i').addClass('icon-muted');
            }
            else {
                $(view.el).find("#qwizbookPublishOrUnpublish_" + id+' span').html("Publish");
                $(view.el).find("#qwizbookPublishOrUnpublish_" + id+' i').removeClass('icon-muted');
            }
            return this;
        }
    });

    MyQwizBook.ListMyBook = Backbone.View.extend({

        template: TmplQwizbookList,

        initialize: function () {

            if (_.isEmpty(this.options.session)) {
                throw "ERROR: Session object is not provided for the view!!"
            }

            this.session = this.options.session;
        },

        render: function () {

            var view = this;
            var qbook_list_template;

            qbook_list_template = this.template;

            view.el.innerHTML = qbook_list_template;

            $(view.el).find("#myQwizbook-list-container").empty();

            // If we have items to list , update the list view.
            // else show nothing to display view.
            if (view.model.models.length) {

                _.each(view.model.models, function (qwizbook) {
                    var qwizbookView = new MyQwizBook.View({
                        model: qwizbook,
                        session: view.session
                    });

                    $(view.el).find("#myQwizbook-list-container").append(qwizbookView.render().el);
                })
            } else {
                $(view.el).find("#myBook-no-result-found").show();
            }

            return this;

        }

    });

    return MyQwizBook;

});