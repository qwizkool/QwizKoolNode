define([
    "app",
    "text!templates/sampleContent.html"

], function (App, Template) {

    var SampleContent = App.module();

    SampleContent.View = Backbone.View.extend({

        initialize:function () {



        },

       
        template:Template,

        render:function () {

            this.el.innerHTML = this.template;
            //$(this.el).find("#searchfilter-container").append(this.searchfilter.render().el);
           // $(this.el).find("#qwizbooklist-container").append(this.qwizbooklistview.render().el);

            return this;
        }
    });

    return SampleContent;

});
