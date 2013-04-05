define([
    "app",
    "modules/sampleqwizbookAuthoringContent"
],
    function (App, SampleQwizbookAuthoringContent) {
        // Create a new module
        var SampleQwizbookAuthoring = App.module();

        SampleQwizbookAuthoring.View = Backbone.View.extend({

            initialize:function () {
            	if (_.isEmpty(this.options.session)) {
                throw "ERROR: Session object is not provided for the view!!"
            		}

            	this.session = this.options.session;
				this.qwizbookAuthoringContent = new SampleQwizbookAuthoringContent.View({ el: '#qwizkool-content',session: this.session});
            },

            show:function (done) {
           		 //$("#qpage-content").html(this.qwizbookAuthoringContent.render().el);
           		 this.qwizbookAuthoringContent.render();
            }
        });

        return SampleQwizbookAuthoring;

    });