define([
    "app",
    "modules/qwizbook",
    "text!templates/qwizbookDetails.html"
], function (App,QwizBook,Template) {

    // Create a new module
    var QwizbookDetails = App.module();


    QwizbookDetails.View = Backbone.View.extend({
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

//this.collection = new QwizBook.Collection();
//this.model = this.collection.get(this.qwizbookId);
//this.model.getqwizbook(this.qwizbookId);
},
        template:"app/templates/qwizbookDetails.html",

        render:function (done) {
 
            var view = this;
            var qbook_template;
            // Fetch the template, render it to the View element and call done.
           App.fetchTemplate(this.template, function(tmpl) {
           
qbook_template = _.template(tmpl(view.model.toJSON()));
view.el.innerHTML = qbook_template();
return view;
// If a done function is passed, call it with the element

});

        }
    });

    // Required, return the module for AMD compliance
    return QwizbookDetails;

});


