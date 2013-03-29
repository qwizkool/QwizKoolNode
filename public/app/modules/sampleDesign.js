define([
    "app",
    "modules/sampleContent"
],
    function (App, SampleContent) {
        // Create a new module
        var SampleDesign = App.module();

        SampleDesign.View = Backbone.View.extend({

            initialize:function () {
				this.sampleContent = new SampleContent.View();
            },

            show:function (done) {
           		 $("#qwizkool-content").html(this.sampleContent.render().el);
            }
        });

        return SampleDesign;

    });