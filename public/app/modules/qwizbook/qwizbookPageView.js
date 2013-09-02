define([
    "app",
    "qwizbookPageCollection",
    "text!templates/qwizbookPageListItem.html"
], function(App, QwizbookPage, TmplPageList){

    QwizbookPage.View = Backbone.View.extend({

        initialize:function () {
            if (_.isEmpty(this.options.session)) {
                throw "ERROR: Session object is not provided for the view!!"
            }
            this.session = this.options.session;
        },

        render: function(){
            var view = this;
        }
    })

    QwizbookPage.ListView = Backbone.View.extend({
        template : TmplPageList,

        initialize:function () {
            if (_.isEmpty(this.options.session)) {
                throw "ERROR: Session object is not provided for the view!!"
            }
            this.session = this.options.session;
        },

        render: function(){
            var view = this;
            var pages = view.model.modesl;
            this.$el.html(this.template);
        }
    })
    return QwizbookPage;
})