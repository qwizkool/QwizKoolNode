define([
    "app",
    "sha256"
], function (App, Sha256) {

    // Create a new module
    var AddComments = App.module();

    // User extendings
    AddComments.Model = Backbone.Model.extend({

        urlRoot:function () {

            urlRootBase = "/";

            if (this.action == "addQwizbookComments") {
                return urlRootBase + "addComments/";
            } 
        },

        defaults:{
            id:null,
            comment:'qwizbook coments',
            qwizbookId:null
        },

        initialize:function () {

           
        },

        isUserAuthenticated:function () {
            var state = this.get('isLoggedIn');
            return state;
        },

        addQwizbookComments:function (comments,qId) {
        	this.set('comment', comments);
        	this.set('qwizbookId', qId);
        	this.action = "addQwizbookComments";

            var jqxhr = this.save({}, {

                error:function (model, response) {
                	console.log('error');
                },

                success:function (model, response) {
                  console.log(response);
                }
            });

        }
    });

    AddComments.Collection = Backbone.Collection.extend({

        model:AddComments.Model,
        url:function () {
            var urlRoot = "/addComments";
            if(this.qwizbookId)
            {
            	urlRoot =urlRoot + "/" +this.qwizbookId;
            }
            return urlRoot;
		},
		 QwizbookComments:function (qwizbookId) {
		 	this.qwizbookId = qwizbookId;
		 	this.urlroot = this.url();
		 	
            var qwizbookComments = this;

		var jqxhr = qwizbookComments.fetch({
		
		error : function(collection, response) {
		},
		
		success : function(collection, response) {
		List = qwizbookComments.toJSON();
		}
});

AddComments.View = Backbone.View.extend({
template : "app/templates/commentDetails.html",

initialize : function() {
//this.model = new QwizBook.Model();
},

render : function(done) {
var view = this;
var qbook_template;

// Fetch the template, render it to the View element and call done.
App.fetchTemplate(this.template, function(tmpl) {
//alert("Templ " + tmpl(view.model.toJSON()) + " " + "json" + view.model.get('title'));
qbook_template = _.template(tmpl(view.model.toJSON()));
view.el.innerHTML = qbook_template();

// If a done function is passed, call it with the element
if (_.isFunction(done)) {
done(view.el);
}
});
}
});

   
AddComments.ListView = Backbone.View.extend({

//template:"app/templates/qwizbooklist.html",
template : "app/templates/qwizbookContent.html",

initialize : function() {
this.model.on("reset", this.render, this);

},

render : function(done) {

var view = this;
var qCommentview_template;

// Fetch the template, render it to the View element and call done.
App.fetchTemplate(this.template, function(tmpl) {

//alert("Templ " + tmpl(view.model.toJSON()) + " " + "json" + view.model.get('title'));
qCommentview_template = _.template(tmpl());
view.el.innerHTML = qCommentview_template();

_.each(view.model.models, function(qwizbookcomment) {
var qwizbookCommentView = new AddComments.View({
model : AddComments
});
qwizbookCommentView.render(function(elv) {
$(view.el).find("#home-content-container").append(elv);
});
});

// If a done function is passed, call it with the element
if (_.isFunction(done)) {
done(view.el);
}
});

return this;
}
});
    

//qwizbookList.fetch(function() {

//console.log(qwizbookList);

//});

// $('#qwizbook-lists').html(this.qwizbookListView.render().el);
}
    });

    AddComments.Router = Backbone.Router.extend({/* ... */ });

    // Required, return the module for AMD compliance
    return AddComments;

});
