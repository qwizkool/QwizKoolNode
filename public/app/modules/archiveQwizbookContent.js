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
"text!templates/archiveQwizbookContent.html"], function(App, QwizBook, MyQwizBook, Template) {

	var ArchiveQwizbookContent = App.module();

	ArchiveQwizbookContent.View = Backbone.View.extend({

		initialize : function() {

			this.qwizbookModel = new QwizBook.Model();

			if (_.isEmpty(this.options.session)) {
				throw "ERROR: Session object is not provided for the view!!"
			}

			this.session = this.options.session;
			var view = this;

			this.qwizbookUserCollection = new QwizBook.Collection();
			

			this.qwizbookUserCollection.on('list-qwizbook-event', this.refreshView, this);

			this.qwizbooklistview = new MyQwizBook.ListMyBook({
				model : this.qwizbookUserCollection,
				session : this.session
			});

		},

		events : {
			
			"click #myQwizbook-list-container input" : "showunArchiveBtn",
			"click #allQwizbooks" : "selectAllQwizbooks",
			"click #unArchiveQwizbook" : "unArchiveQwizbook",
            "click #myQwizbook-list-container a":"authorQwizbook",
            "keyup #qwizbook_searchKeyword" : "qwizbook_search"

		},
		
		qwizbook_search : function (e) {
			var searchparam = e.target.value;
			 this.qwizbookUserCollection.setSearchParameter(this.session,searchparam);
            this.qwizbookUserCollection.getAllBooks();
		},

		authorQwizbook:function (e){
			var id = e.target.id;
			Backbone.history.navigate("#authorQwizbook/" + id, true);
		},
		
		showunArchiveBtn : function(e) {

			var selectedQbooksCount = $("input:checked").length;
			if (selectedQbooksCount == 0) {

				$("#unArchiveAllQwizbooksBtn").hide();
			} else {
				$("#unArchiveAllQwizbooksBtn").show();
			}

		},
		
		

		selectAllQwizbooks : function() {

			if ($('#allQwizbooks').is(":checked")) {

				$("#unArchiveAllQwizbooksBtn").show();

				$('#archiveQwizbookList-container').find(':checkbox').each(function() {
					$(':checkbox').prop("checked", true);
				});

			} else {
				$("#unArchiveAllQwizbooksBtn").hide();

				$('#archiveQwizbookList-container').find(':checkbox').each(function() {
					$(':checkbox').prop("checked", false);
				});
			}

		},

		unArchiveQwizbook : function() {

			var currentQwizbook = "";
			var selectedQwizbooks = [];
			
			var counter = 1;
			var view = this;
            
			$('#archiveQwizbookList-container input:checked').each(function() {
                
                selectedQwizbooks.push($(this).attr('value'));
                	
			});
            
			var selectedQbookCount = selectedQwizbooks.length;
			
			if (selectedQbookCount >= 1) {

				
				if (confirm('Are you sure you want to unarchive ' + selectedQbookCount + ' Qwizbook')) {
					
					for (var j = 0; j < selectedQwizbooks.length; j++) {
						currentQwizbook = selectedQwizbooks[j];
						
						var ModelData = view.qwizbookUserCollection.get(currentQwizbook);
						var qbookModel = ModelData;
						qbookModel.unArchiveMyQwizbook(currentQwizbook);

						if (counter == selectedQbookCount) {
							qbookModel.on('unArchive-qwizbook-success-event', function() {
								view.qwizbookUserCollection.getMybook();
							});
							

						}
						counter++;

					}
				}

			}

		},

		refreshView : function() {
			$(this.el).find("#archiveQwizbookList-container").html(this.qwizbooklistview.render().el);
		},
		
		clear: function () {

            // clear all the subviews.
            this.$el.empty();

            return this;
        },

		template : Template,

		render : function() {

			this.el.innerHTML = this.template;
			this.qwizbookUserCollection.getArchiveQwizbook(this.session);
			this.qwizbookUserCollection.getMybook();

			return this;
		}
	});

	return ArchiveQwizbookContent;

});

