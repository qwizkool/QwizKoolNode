define([
    "app",
    "modules/qwizbook",
    "text!templates/qwizbookAuthoringContent.html"

], function (App, QwizBook, Template) {

    var QwizbookAuthoringContent = App.module();

    QwizbookAuthoringContent.View = Backbone.View.extend({

        initialize:function () {

			this.qwizbookModel = new QwizBook.Model();
            

        },

        events:{
            	"click #create-form":"showCreateForm",
            	"click #btn-create-qwizbook-submit":"submitCreateForm",
            	"click #btn-create-qwizbook-cancel":"cancelCreateForm"
            	
           }, 
           
         showCreateForm:function (e) {

                $('#qwizbook-create-form').show();

        },
        
        submitCreateForm:function (e) {
			
			this.trigger('createqwizbook', {qbooktitle:$('#qwizbook-title').val(),qbookdesc:$('#qwizbook-description').val(), qwizbookmodel:this.qwizbookModel});
			$('#qwizbook-create-form').hide();
			$('#qwizbook-title').val('');
			$('#qwizbook-description').val('');
        },
        
        cancelCreateForm:function (e) {

             $('#qwizbook-create-form').hide();
             $('#qwizbook-title').val('');
			 $('#qwizbook-description').val('');

        },
           
        template:Template,

        render:function () {

            this.el.innerHTML = this.template;
            //$(this.el).find("#searchfilter-container").append(this.searchfilter.render().el);
           // $(this.el).find("#qwizbooklist-container").append(this.qwizbooklistview.render().el);

            return this;
        }
    });

    return QwizbookAuthoringContent;

});
