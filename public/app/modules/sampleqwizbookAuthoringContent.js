define([
    "app",
    "text!templates/sampleqwizbookAuthoringContent.html"

], function (App, Template) {

    var SampleQwizbookAuthoringContent = App.module();

    SampleQwizbookAuthoringContent.View = Backbone.View.extend({

        initialize:function () {
			if (_.isEmpty(this.options.session)) {
                throw "ERROR: Session object is not provided for the view!!"
            		}

            	this.session = this.options.session;


        },

       
        template:Template,

        render:function () {

            this.el.innerHTML = this.template;
            //$(this.el).find("#searchfilter-container").append(this.searchfilter.render().el);
           // $(this.el).find("#qwizbooklist-container").append(this.qwizbooklistview.render().el);

            return this;
        }
    });

    return SampleQwizbookAuthoringContent;

});
