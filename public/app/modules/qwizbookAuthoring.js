/*!
 * Copyright(c) 2013 Vibrentt
 *
 * Module : QwizbookAuthoring
 *
 *
 */
define([
    "app",
    "modules/header",
    "modules/userSettings",
    "modules/qwizbookAuthoringContent"
],
    function (App, Header, UserSettings, QwizbookAuthoringContent) {
        // Create a new module
        var QwizbookAuthoring = App.module();

        QwizbookAuthoring.View = Backbone.View.extend({

            initialize:function () {
            	this.header = new Header.View();
           	    this.userSettings = new UserSettings.View();
				this.qwizbookAuthoringContent = new QwizbookAuthoringContent.View();
				
				this.qwizbookAuthoringContent.on("createqwizbook", function (createQwizbookObj) {
					
					var qbooktitle = createQwizbookObj.qbooktitle;
					var qbookdescription = createQwizbookObj.qbookdesc;
					var qwizbookratingmodel = createQwizbookObj.qwizbookmodel;
					qwizbookratingmodel.create(qbooktitle, qbookdescription);

					});
				
				
				
				
            },

            show:function (done) {
            	$("#qpage-header").html(this.header.render().el);
            	this.header.renderSettings();
            	$("#qpage-search").empty();
           	    $("#qwizkool-user-settings").html(this.userSettings.render().el);
           		$("#qpage-content").html(this.qwizbookAuthoringContent.render().el);
            }
        });

        return QwizbookAuthoring;

    });