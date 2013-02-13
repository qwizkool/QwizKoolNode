define([
    "app",
    "modules/qwizbook",
    "modules/qwizbookBreadcrumbs"
], function (App,QwizBook,Breadcrumb) {

    // Create a new module
    var QwizbookContent = App.module();


    QwizbookContent.View = Backbone.View.extend({
		initialize : function() {
		this.breadcrumb = new Breadcrumb.View();
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
        template:"app/templates/qwizbookContent.html",

        render:function (done) {
 			
            var view = this;
            
            var qbook_template;
            // Fetch the template, render it to the View element and call done.
           App.fetchTemplate(this.template, function(tmpl) {
           
				qbook_template = _.template(tmpl(view.model.toJSON()));
				view.el.innerHTML = qbook_template();
				// If a done function is passed, call it with the element
				if (_.isFunction(done)) {
					done(view.el);
				}
			});
			view.breadcrumb.render(function (el) {
                $("#home-content-header").html(el);
            });
        },
        
         events:{
            "click #rating-1":"setRating1",
            "click #rating-2":"setRating2",
            "click #rating-3":"setRating3",
            "click #rating-4":"setRating4",
            "click #rating-5":"setRating5"
        },
        
        setRating1:function () {

            //triggering usermaincontent.js event to get the input value and change the URL
            this.trigger('addrating', {ratingvalue:$('#rating-1').val()});
            
        },
        
        setRating2:function () {
        	this.trigger('addrating', {ratingvalue:$('#rating-2').val()});	
        },
        
        setRating3:function () {
        	this.trigger('addrating', {ratingvalue:$('#rating-3').val()});
        	
        },
        
        setRating4:function () {
        	this.trigger('addrating', {ratingvalue:$('#rating-4').val()});
        	
        },
        
        setRating5:function () {
        	this.trigger('addrating', {ratingvalue:$('#rating-5').val()});
        	
        }
        
        
        
        
        
    });

    // Required, return the module for AMD compliance
    return QwizbookContent;

});