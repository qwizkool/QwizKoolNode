define([
    "app",
    "modules/sampleqwizbookAuthoringContent"
],
    function (App, SampleQwizbookAuthoringContent) {
        // Create a new module
        var SampleQwizbookAuthoring = App.module();

        SampleQwizbookAuthoring.View = Backbone.View.extend({

            initialize:function () {
				this.qwizbookAuthoringContent = new SampleQwizbookAuthoringContent.View();
            },

            show:function (done) {
           		 $("#qpage-content").html(this.qwizbookAuthoringContent.render().el);
            }
        });

        return SampleQwizbookAuthoring;

    });