define([
    "app",
    "modules/qwizbook"
   // "modules/qwizbookBreadcrumbs",
   // "text!templates/qwizbookContent.html"
], function (App,QwizBook,Breadcrumbs,Template) {

    // Create a new module
    var QwizbookContent = App.module();


    QwizbookContent.View = Backbone.View.extend({
		initialize : function() {
		this.qwizbookId = this.options.qwizbookId;
		this.model = new QwizBook.Model({id:this.qwizbookId});
		var jqxhr = this.model.fetch({

				error : function(model, response) {
					console.log("Failed to get QwizBook!");
				},

				success : function(model, response) {
				
				}
			});
			this.model.on('change', this.render, this)
		//this.collection = new QwizBook.Collection();
		//this.model = this.collection.get(this.qwizbookId);
		//this.model.getqwizbook(this.qwizbookId);
		},

		template:'templates/qwizbookContent.html',
        render:function (done) {
 			
           var view = this;
            view.el.innerHTML = this.template;
            
           // $(view.el).find("#home-content-header").append(this.Breadcrumbs.render().el);
            //$(view.el).find("#qwizbooklist-container").append(this.qwizbooklistview.render().el);
            var qbook_template;
            // Fetch the template, render it to the View element and call done.
           App.fetchTemplate(this.template, function(tmpl) {
           //
			qbook_template = _.template(tmpl(view.model.toJSON()));
				view.el.innerHTML = qbook_template();
				// If a done function is passed, call it with the element
				if (_.isFunction(done)) {
					done(view.el);
				}
			});
        }
    });

    // Required, return the module for AMD compliance
    return QwizbookContent;

});
