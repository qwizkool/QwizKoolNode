define([
    "app",
    "modules/qwizbook",
    "modules/breadcrumbs",
    "text!templates/userMainContent.html"

], function (App, QwizBook, Breadcrumbs, Template) {

    var UserMainContent = App.module();

    UserMainContent.View = Backbone.View.extend({

        initialize:function () {

            this.qwizbookList = this.collection;
           
            this.qwizbooklistview = new QwizBook.ListView({
                model:this.qwizbookList
            });
			
            

        },

        template:Template,

        render:function () {

            this.el.innerHTML = this.template;
            $(this.el).find("#qwizbooklist-container").append(this.qwizbooklistview.render().el);

            return this;
        }
    });

    return UserMainContent;

});
