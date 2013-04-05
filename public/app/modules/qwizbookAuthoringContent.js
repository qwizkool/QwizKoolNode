/*!
 * Copyright(c) 2013 Vibrentt
 *
 * Module : QwizbookAuthoringContent
 *
 *
 */
define([
    "app",
    "modules/qwizbook",
    "modules/myQwizbook",
    "text!templates/qwizbookAuthoringContent.html"

], function (App, QwizBook,MyQwizBook, Template) {

    var QwizbookAuthoringContent = App.module();

    QwizbookAuthoringContent.View = Backbone.View.extend({

        initialize: function () {

            this.qwizbookModel = new QwizBook.Model();
            if (_.isEmpty(this.options.session)) {
                throw "ERROR: Session object is not provided for the view!!"
            		}

            this.session = this.options.session;
            

            this.on("createqwizbook", function (createQwizbookObj) {
					
					var qbooktitle = createQwizbookObj.qbooktitle;
					var qbookdescription = createQwizbookObj.qbookdesc;

					var qwizbookmodel = createQwizbookObj.qwizbookmodel;
					qwizbookmodel.create(qbooktitle, qbookdescription);
					var view = this;
					qwizbookmodel.on("qwizbook-create-success-event", function () {

                    view.qwizbookUserCollection.getMybook();

                });

					});
			this.qwizbookUserCollection = new QwizBook.Collection();
			this.qwizbookUserCollection.setUserId();
			this.qwizbookUserCollection.on("reset", this.refreshView, this);
			
			this.qwizbooklistview = new MyQwizBook.ListMyBook({
                model: this.qwizbookUserCollection,
                session: this.session
            });

        },

        events: {
            "click #create-form": "showCreateForm",
            "click #btn-create-qwizbook-submit": "submitCreateForm",
            "click #btn-create-qwizbook-cancel": "cancelCreateForm",
            "click #deleteAllQwizbooks": "selectAllQwizbooks",
            "click #deleteQwizbook": "deleteMyQwizbook"

        },

        showCreateForm: function (e) {

			$("#title-status").hide();
            $('#qwizbook-create-form').show();

        },

        submitCreateForm: function (e) {


			if($('#qwizbook-title').val())
			{
				this.trigger('createqwizbook', {qbooktitle: $('#qwizbook-title').val(), qbookdesc: $('#qwizbook-description').val(), qwizbookmodel: this.qwizbookModel});
	            $('#qwizbook-create-form').hide();
	            $('#qwizbook-title').val('');
	            $('#qwizbook-description').val('');
			}
            else
            {
            	$("#title-status").addClass('alert-error');
            	$("#title-status").html('Please enter a Title');
            	$("#title-status").show();
            }

        },

        cancelCreateForm: function (e) {



			$("#title-status").hide();
            $('#qwizbook-create-form').hide();

            $('#qwizbook-title').val('');
            $('#qwizbook-description').val('');

        },
        

        selectAllQwizbooks: function () {

         alert('reached');

        },
      
      deleteMyQwizbook:function(){
      	
      	
      	var selectedQbookCount = $( "input:checked" ).length;
      		
      	var selectedQwizbooks = [];
        $(':checkbox:checked').each(function(i){
          selectedQwizbooks[i] = $(this).val();
        });
        
       
      	if(selectedQbookCount==1){
      		alert('Are you sure you want to delete '+selectedQbookCount+' Qwizbook');
      		
      		this.qwizbookModel.deleteMyQwizbook(selectedQwizbooks);
      	}	
      	
      	
      	
      },

        refreshView:function() {
        	 $(this.el).find("#myQwizbookList-container").html(this.qwizbooklistview.render().el);
        },


        template: Template,

        render: function () {

            this.el.innerHTML = this.template;
            this.qwizbookUserCollection.getMybook();
            // $(this.el).find("#qwizbooklist-container").append(this.qwizbooklistview.render().el);

            return this;
        }
    });

    return QwizbookAuthoringContent;

});
