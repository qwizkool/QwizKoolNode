define(["app", "modules/qwizbook", "modules/breadcrumbs", "modules/searchFilter"
//"modules/pagination"
], function(App, QwizBook, Breadcrumbs, Searchfilter) {
	//function (App, QwizBook) {
	// Create a new module
	var UserMainContent = App.module();

	UserMainContent.View = Backbone.View.extend({

	initialize : function() {
	this.qwizbookList = new QwizBook.Collection();
	//this.qwizbook = new QwizBook.View();
	//this.breadcrumbs = new Breadcrumbs.View();
	this.searchfilter = new Searchfilter.View({
	collection : this.qwizbookList
	});
	this.qwizbooklistview = new QwizBook.ListView({
	model : this.qwizbookList
	});
	
	
	this.qwizbookList.QwizbookList();
	
	
	//this.qwizbooklistitemview = new QwizbookListItem.View({
	//	collection : this.qwizbookList
	//});
	// this.pagination 	= new Pagination.View();

	//this.QwizbookList = new QwizBook.Collection({
	//	model : this.qwizbookList
	//});
	//this.QwizbookList = new QwizBook.QwizbookList({model:this.qwizbookcollection});
	//alert(this.qwizbookcollection.fetch());
	//this.qwizbookcollection.fetch();
	//$('#qwizbookcollection-container').html(this.qwizbooklistView.render().el);

	// Register for events from subviews

	this.searchfilter.on("searchorfilter", function(searchfilterdataObj) {
	var searchorfiltercriteria = searchfilterdataObj.listcriteria;
	var qwizbookList = searchfilterdataObj.liston;

	qwizbookList.qwizbookSearch(searchorfiltercriteria);
	qwizbookList.QwizbookList();

	});
	//this.searchfilter.on("filter-change",this.updateFilterSettings(), this);
	//this.searchfilter.on("searchorfilter", this.updateSearchOrFilterSettings(searchorfilterData), this);
	//this.pagination.on("pageChange",this.updatePageChange, this);
	//this.qwizbookcollection.QwizbookList();
	//this.QwizbookList.QwizbookList();
	//this.qwizbookList.fetch();
	//           this.userSettings.on("logout-attempted", this.renderSettings, this);
	},

	/*
	updateSearchOrFilterSettings : function(searchorfilterdata) {

	//Retreive filter setting from searchfilter view
	//var  searchorfilterCriteria = searchorfilterData;
	//alert(searchorfilterCriteria);
	//this.qwizbookcollection.set(filterData);
	//trigger the qwizbook collection fetch
	var searchorfiltercriteria = searchorfilterdata;
	alert(searchorfiltercriteria);
	this.QwizbookList = new QwizBook.Collection({
	model : this.qwizbookList
	});
	this.QwizbookList.url(searchorfiltercriteria);
	this.QwizbookList.QwizbookList();
	//this.QwizbookList.refresh();

	//
	},
	*/

	/*
	updateFilterSettings:function()
	{

	//Retreive filter setting from searchfilter view
	var filterData = this.searchfilter.getfilterParameter();

	this.qwizbookcollection.set(filterData);
	//trigger the qwizbook collection fetch
	this.qwizbookcollection.refresh();

	//
	},

	*/

	template : "app/templates/userMainContent.html",

	render : function(done) {

	var view = this;

	// Fetch the template, render it to the View element and call done.
	App.fetchTemplate(this.template, function(tmpl) {
	view.el.innerHTML = tmpl();

	view.searchfilter.render(function(elv) {
	$(view.el).find("#searchfilter-container").append(elv);
	});

	
  /*
	view.qwizbooklistview.render(function(elv) {
		$(view.el).find("#qwizbooklist-container").append(elv);
		
	});
    */
    
	view.qwizbooklistview.render(function(elv) {

	$(view.el).find("#qwizbooklist-container").append(elv);
	});
	

	// If a done function is passed, call it with the element
	if (_.isFunction(done)) {
	done(view.el);

	}

	});
	}
});

// Required, return the module for AMD compliance
return UserMainContent;

});
