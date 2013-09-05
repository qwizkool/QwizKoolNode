/*!
 * Copyright(c) 2013 Vibrentt
 *
 * Module : MyArchivedQwizbook
 *
 *
 */

define([
    "app",
    "text!templates/myArchivedBookItem.html",
    "text!templates/myArchivedBookList.html"
], function (App, TmplQwizbookItem, TmplQwizbookList) {

    // Create a new module
    var MyArchivedQwizbook = App.module();

    MyArchivedQwizbook.View = Backbone.View.extend({

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
                $(view.el).find("#qwizbook-publish-status_" + id+' i').removeClass('hidden');


            }
            else {
                $(view.el).find("#qwizbookPublishOrUnpublish_" + id+' span').html("Publish");
                $(view.el).find("#qwizbookPublishOrUnpublish_" + id+' i').removeClass('icon-muted');
                $(view.el).find("#qwizbook-publish-status_" + id+' i').addClass('hidden');
            }
            return this;
        }
    });

    MyArchivedQwizbook.ListView = Backbone.View.extend({

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
                    var qwizbookView = new MyArchivedQwizbook.View({
                        model: qwizbook,
                        session: view.session
                    });

                    $(view.el).find("#myArchivedQwizbook-list-container").append(qwizbookView.render().el);
                })
            } else {
                $(view.el).find("#myArchivedBook-no-result-found").show();
            }

            return this;

        }

    });

    return MyArchivedQwizbook;

});