/*!
 * Copyright(c) 2013 Vibrentt
 *
 * Module : QwizbookAuthoringContent
 *
 *
 */
define(["app", 
"modules/qwizbook", 
"modules/myQwizbook", 
"text!templates/qwizbookAuthoringContent.html"], function(App, QwizBook, MyQwizBook, Template) {

	var QwizbookAuthoringContent = App.module();

	QwizbookAuthoringContent.View = Backbone.View.extend({

		initialize : function() {

		//	this.qwizbookModel = new QwizBook.Model();

			if (_.isEmpty(this.options.session)) {
				throw "ERROR: Session object is not provided for the view!!"
			}

			this.session = this.options.session;
			var view = this;

           
			this.qwizbookUserCollection = new QwizBook.Collection();
			//this.qwizbookUserCollection.on('list-qwizbook-event', this.refreshView, this);
			this.qwizbookUserCollection.on("reset", this.refreshView, this);
			this.qwizbooklistview = new MyQwizBook.ListMyBook({
				model : this.qwizbookUserCollection,
				session : this.session
			});
			
		
			

		},

		events : {
			"click #create-form" : "showCreateForm",
			"click #btn-create-qwizbook-submit" : "submitCreateForm",
			"click #btn-create-qwizbook-cancel" : "cancelCreateForm",
			"click #deleteAllQwizbooks" : "selectAllQwizbooks",
			"click #qwizbookList" : "showDeleteBtn",
			"click #deleteQwizbook" : "deleteQwizbook",
			"click #myQwizbook-list-container":"authorQwizbookOnclickDiv",
            "click #myQwizbook-list-container a":"authorQwizbook"

		},

        authorQwizbookOnclickDiv:function (e){
        	var id = $('#myqbook_id').val();
        	Backbone.history.navigate("#authorQwizbook/" + id, true);
		},
		
		authorQwizbook:function (e){
			var id = e.target.id;
			Backbone.history.navigate("#authorQwizbook/" + id, true);
		},
		showDeleteBtn : function(e) {

			var selectedQbooksCount = $("input:checked").length;
			if (selectedQbooksCount == 0) {

				$("#deleteAllQwizbooksBtn").hide();
			} else {
				$("#deleteAllQwizbooksBtn").show();
			}

		},
		showCreateForm : function(e) {

			$("#title-status").hide();
			$('#qwizbook-create-form').show();

		},

		submitCreateForm : function(e) {

			if ($('#qwizbook-title').val()) {
				
				var qwizbookmodel = new QwizBook.Model();
				var qbooktitle = $('#qwizbook-title').val();
				var qbookdesc = $('#qwizbook-description').val();
				var view = this;
			    qwizbookmodel.create(qbooktitle, qbookdesc);
				qwizbookmodel.on("qwizbook-create-success-event", function() {
					//view.qwizbookUserCollection.setUserId();
					view.qwizbookUserCollection.getMybook();

				});
				$('#qwizbook-create-form').hide();
				$('#qwizbook-title').val('');
				$('#qwizbook-description').val('');
			} else {
				$("#title-status").addClass('alert-error');
				$("#title-status").html('Please enter a Title');
				$("#title-status").show();
			}

		},

		cancelCreateForm : function(e) {

			$("#title-status").hide();
			$('#qwizbook-create-form').hide();

			$('#qwizbook-title').val('');
			$('#qwizbook-description').val('');

		},

		selectAllQwizbooks : function() {

			if ($('#allQwizbooks').is(":checked")) {

				$("#deleteAllQwizbooksBtn").show();

				$('#myQwizbook-list-container').find(':checkbox').each(function() {
					$(':checkbox').prop("checked", true);
				});

			} else {
				$("#deleteAllQwizbooksBtn").hide();

				$('#myQwizbook-list-container').find(':checkbox').each(function() {
					$(':checkbox').prop("checked", false);
				});
			}

		},

		deleteQwizbook : function() {

			var currentQwizbook = "";
			var selectedQwizbooks = [];
			
			var counter = 1;
			var view = this;
            
			$('#myQwizbook-list-container input:checked').each(function() {
                
                selectedQwizbooks.push($(this).attr('value'));
                	
			});
            
			var selectedQbookCount = selectedQwizbooks.length;
			
			if (selectedQbookCount >= 1) {

				var confirmMsg = confirm('Are you sure you want to delete ' + selectedQbookCount + ' Qwizbook');
				if (confirmMsg==true) {
					
					for (var j = 0; j < selectedQwizbooks.length; j++) {
						currentQwizbook = selectedQwizbooks[j];
						
						var ModelData = view.qwizbookUserCollection.get(currentQwizbook);
						var qbookModel = ModelData;
						qbookModel.deleteMyQwizbook(currentQwizbook);

						if (counter == selectedQbookCount) {

							qbookModel.on("delete-qwizbook-success-event", function() {
								
								view.qwizbookUserCollection.getMybook();
							});

						}
						counter++;

					}
					
					this.undelegateEvents();
                    this.delegateEvents(this.events);
				}

			}

		},

		refreshView : function() {
			
			$(this.el).find("#myQwizbookList-container").html(this.qwizbooklistview.render().el);
		},
		
		clear: function () {

            // clear all the subviews.
            this.$el.empty();

            return this;
        },

		template : Template,

		render : function() {

			this.el.innerHTML = this.template;
			this.qwizbookUserCollection.setUserId(this.session);
			this.qwizbookUserCollection.getMybook();
			 //$(this.el).find("#qwizbooklist-container").append(this.qwizbooklistview.render().el);

			return this;
		}
	});

	return QwizbookAuthoringContent;

});

