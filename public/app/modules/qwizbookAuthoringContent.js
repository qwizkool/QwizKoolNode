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
    "text!templates/qwizbookAuthoringContent.html"

], function (App, QwizBook, Template) {

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

					});
			this.qwizbookUserCollection = new QwizBook.Collection();
			this.qwizbookUserCollection.setUserId();
			this.qwizbookUserCollection.getMyQwizbook();

        },

        events: {
            "click #create-form": "showCreateForm",
            "click #btn-create-qwizbook-submit": "submitCreateForm",
            "click #btn-create-qwizbook-cancel": "cancelCreateForm"

        },

        showCreateForm: function (e) {

            $('#qwizbook-create-form').show();

        },

        submitCreateForm: function (e) {

            this.trigger('createqwizbook', {qbooktitle: $('#qwizbook-title').val(), qbookdesc: $('#qwizbook-description').val(), qwizbookmodel: this.qwizbookModel});
            $('#qwizbook-create-form').hide();
            $('#qwizbook-title').val('');
            $('#qwizbook-description').val('');
        },

        cancelCreateForm: function (e) {

            $('#qwizbook-create-form').hide();
            $('#qwizbook-title').val('');
            $('#qwizbook-description').val('');

        },

        template: Template,

        render: function () {

            this.el.innerHTML = this.template;
            //$(this.el).find("#searchfilter-container").append(this.searchfilter.render().el);
            // $(this.el).find("#qwizbooklist-container").append(this.qwizbooklistview.render().el);

            return this;
        }
    });

    return QwizbookAuthoringContent;

});
