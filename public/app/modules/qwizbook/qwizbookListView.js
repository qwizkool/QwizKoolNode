define([
    "app",
    "module/qwizbook/qwizbookModel",
    "text!templates/qwizbookList.html"
], function(App, QwizBook, TmplQwizbookList){

    QwizBook.ListView = Backbone.View.extend({

        template:TmplQwizbookList,

        initialize:function () {


            if (_.isEmpty(this.options.session)) {
                throw "ERROR: Session object is not provided for the view!!"
            }

            this.session = this.options.session;
        },

        render:function () {

            var view = this;


            this.$el.html(this.template);

            $(view.el).find("#qwizbook-list-container").empty();

            // If we have items to list , update the list view.
            // else show nothing to display view.
            if (view.model.models.length) {
                _.each(view.model.models, function (qwizbook) {

                    var qwizbookView = new QwizBook.View({
                        model:qwizbook,
                        session:view.session
                    });

                    $(view.el).find("#qwizbook-list-container").append(qwizbookView.render().el);


                })

            } else {
                $(view.el).find("#qwizbook-no-result-found").show();
            }

            return this;

        }
    });

    return QwizBook;
});