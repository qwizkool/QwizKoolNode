define([
// Application.
"app",

// Modules
"modules/user", "modules/indexPage", "modules/userMainPage", "modules/qwizbook"], function(App, User, IndexPage, UserMainPage, Qwizbook) {

	// Defining the application router, you can attach sub routers here.
	var Router = Backbone.Router.extend({

		routes : {
			'' : 'index',
			'main' : 'userMain',
			'qwizbook' : 'QwizbookList'

		},

		initialize : function() {
		},

		index : function(hash) {

			var currentUser = new User.Model();

			if (currentUser.isUserAuthenticated() === true) {
				Backbone.history.navigate("main", true);
				return;
			}

			var indexPage = new IndexPage.View();
			indexPage.show();

		},

		userMain : function(hash) {

			var currentUser = new User.Model();

			if (currentUser.isUserAuthenticated() === false) {
				Backbone.history.navigate("", true);
				return;
			}

			var userMainPage = new UserMainPage.View();
			userMainPage.show();

		},

		QwizbookList : function(hash) {

			var qwizbookList = new Qwizbook.Collection();

			var jqxhr = qwizbookList.fetch({

				error : function(collection, response) {
					//alert("Failed to get QwizBooks!");
					console.log("Failed to get QwizBooks!");
				},

				success : function(collection, response) {
					var List = Array();
					List = qwizbookList.toJSON();
					//alert(List[0].title);
					console.log(qwizbookList);

				}
			});

		}
	});

	return Router;

});
