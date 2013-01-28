describe('Model :: Qwizbook', function() {
	var time = '';
	var testUser = '';
	var testPwd = '';
	var testEmail = '';
	// Create test data for the user model

	var testqwizbookuniqueKey = "uniqueKey" + time;
	var testqwizbookTitle = "Title" + time;
	var testqwizbookDescription = "Description" + time;

	beforeEach(function() {
		time = new Date().getTime();
		testUser = "User" + time;
		testPwd = "Pwd" + time;
		testEmail = testUser + "@email.com";
		// Create test data for the user model

		var testqwizbookuniqueKey = "uniqueKey" + time;
		var testqwizbookTitle = "Title" + time;
		var testqwizbookDescription = "Description" + time;

		var that = this, done = false;

		require(['modules/user'], function(User) {
			//  that.users = new User.Collection();
			that.user = new User.Model();
			done = true;
		});
		waitsFor(function() {
			return done;
		}, "Create Models");

		runs(function() {
			// Registration completed event handler.
			var userRegisterEvent = function() {
				if (this.user.get('isRegistered') === true) {
					done = true;
				} else {
					done = false;
				}
			};

			// Register the User
			this.user.set('name', testUser);
			this.user.set('email', testEmail);
			this.user.set('password', testPwd);
			this.user.on('user-registration-event', userRegisterEvent, this);
			this.user.register();

			waitsFor(function() {
				return done;
			});
		});

		runs(function() {
			var userLoginEvent = function() {
				if (this.user.get('isLoggedIn') === true) {
					done = false;
				} else {
					done = true;
				}
			};

			// Register the User
			//this.user.set('name', testUser + new Date().getTime());
			this.user.set('email', testEmail);
			//this.user.set('email', testEmail + new Date().getTime());
			this.user.set('password', testPwd);
			this.user.on('user-login-event', userLoginEvent, this);
			this.user.login();

			waitsFor(function() {
				return done;
			});
		});

	});

	afterEach(function() {
		//logout user

	});

	describe('Create Qwizbook', function() {

		it('should create a qwizbook', function() {
			var done = false;
			var qwizbook = null;
			var owneremail = this.user.get('email');

			require(['modules/qwizbook'], function(Qwizbook) {
				//  that.users = new User.Collection();
				qwizbook = new Qwizbook.Model();
				done = true;
			});
			waitsFor(function() {
				return done;
			}, "Create Models");

			// Create Qwizbbok completed event handler.
			runs(function() {
				var createqwizbookEvent = function() {

					if (qwizbook.get('isAddedqwizBook') === true) {
						done = true;
					} else {
						done = false;
					}

				};

				// Register the Qwizbook
				qwizbook.set('uniqueKey', testqwizbookuniqueKey);
				qwizbook.set('title', testqwizbookTitle);
				qwizbook.set('description', testqwizbookDescription);
				qwizbook.set('ownerEmail', owneremail);
				//qwizbook.set('date', testqwizbookdate);
				qwizbook.on('create-qwizbook-event', createqwizbookEvent, this);

				qwizbook.createqwizbook();

				waitsFor(function() {
					return done;
				});

				// Validate the registration
				runs(function() {
					expect(qwizbook).not.toBe(null);
					expect(qwizbook.get('isAddedqwizBook')).toEqual(false);
					expect(qwizbook.get('id')).toBeNull();
					//expect(qwizbook.get('id')).toEqual(jasmine.any(null));
					//expect(qwizbook.get('AddedqwizBookStatus')).not.toBeNull();
				});
			});
		});

		it('should fail creating a qwizbook with same title', function() {
			var done = false;
			var qwizbook = null;
			var owneremail = this.user.get('email');

			require(['modules/qwizbook'], function(Qwizbook) {
				//  that.users = new User.Collection();
				qwizbook = new Qwizbook.Model();
				done = true;
			});
			waitsFor(function() {
				return done;
			}, "Create Models");

			runs(function() {
				// Qwizbook create completed event handler.
				var createqwizbookEvent = function() {
					if (qwizbook.get('isAddedqwizBook') === true) {
						done = false;
					} else {
						done = true;
					}
				};

				// Add the Same Title different description
				qwizbook.set('title', testqwizbookTitle);
				qwizbook.set('description', new Date().getTime() + testqwizbookDescription);
				qwizbook.set('ownerEmail', owneremail);
				qwizbook.on('create-qwizbook-event', createqwizbookEvent, this);
				qwizbook.createqwizbook();

				waitsFor(function() {
					return done;
				});

				// Validate create qwizbook
				runs(function() {
					expect(qwizbook).not.toBe(null);
					expect(qwizbook.get('isAddedqwizBook')).toEqual(false);
					expect(qwizbook.get('id')).toBeNull();
					//expect(qwizbook.get('AddedqwizBookStatus')).toEqual("Bad Request");
				});

			});
		});
	});

});

describe("A Qwizbook collection", function() {

	it('should contain models', function() {
		var done = false;
		var qwizbookList = null;

		require(['modules/qwizbook'], function(Qwizbook) {
			//  that.users = new User.Collection();
			qwizbookList = new Qwizbook.Collection();
			done = true;
		});
		waitsFor(function() {
			return done;
		}, "Create Collection");

		// Create Qwizbbok completed event handler.
		runs(function() {
			var listqwizbookEvent = function() {

				if (qwizbookList.isListedqwizBook === true) {
					done = true;
				} else {
					done = false;
				}

			};

			qwizbookList.on('list-qwizbook-event', listqwizbookEvent, this);

			qwizbookList.QwizbookList();

			waitsFor(function() {
				return done;
			});

			// Validate the registration
			runs(function() {
				expect(qwizbookList).not.toBe(null);
				expect(qwizbookList.isListedqwizBook).toEqual(false);

			});
		});
	});
});

