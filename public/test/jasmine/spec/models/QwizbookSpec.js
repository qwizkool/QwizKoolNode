define(['modules/user/user', 'modules/user/session', 'modules/qwizbook'], function (User, Session, Qwizbook) {


    return describe('Model :: Qwizbooks-', function () {

        time = new Date().getTime();
        testUser = "User" + time;
        testPwd = "Pwd" + time;
        testEmail = testUser + "@email.com";

        // Create test data for the user model

        var testqwizbookuniqueKey = '';
        var testqwizbookTitle = '';
        var testqwizbookDescription = '';
        var LoremDescription = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam at elit et urna aliquet dictum. Vestibulum tincidunt neque nec justo pretium lobortis in at metus. Quisque vitae lectus a dui bibendum hendrerit. Donec sed est odio, egestas iaculis nibh. Aliquam viverra adipiscing leo non blandit. Donec pellentesque, lorem et eleifend rhoncus, nisi mi pellentesque arcu, tristique lobortis tellus tortor vel risus. Nulla tristique ipsum eu purus pharetra id luctus leo feugiat. Praesent sollicitudin metus a eros pretium dictum. Sed rhoncus consequat eros, vel blandit ante sollicitudin sit amet. Nam gravida aliquam enim, id congue velit bibendum a. Etiam in mauris vitae ipsum interdum vestibulum. Duis ultrices ullamcorper mauris, vel volutpat risus vestibulum in. Sed diam mi, dapibus at tristique sit amet, sodales eget augue. Pellentesque nulla orci, dapibus tincidunt facilisis sit amet, placerat dignissim ante. In consequat sollicitudin magna, et volutpat dui faucibus at. Nunc iaculis consequat nulla a faucibus.";
		var reference =[{
				        videoLinks: [{link: "www.videolink_test.com"}],
				        webLinks: [{link: "www.webLinks_test.com"}],
				        imageLinks: [{link: "www.imageLinks_test.com"}],
				        audioLinks: [{link: "www.audioLinks_test.com"}]
				    	}]
        user = new User.Model();

        it('should register the user', function () {
            var that = this;
            var done = false;

            var userRegisterEvent = function (e) {
                done = false;
                if (e.valid === true) {
                    done = true;
                }

            };

            // Register the User
            var username = testUser;
            var email = testEmail;
            var password = testPwd;
            user.on('user-registration-event', userRegisterEvent, this);
            user.register(username, email, password);

            waitsFor(function () {
                return done;
            });

            runs(function () {
            expect(user).not.toBe(null);
            expect(user.get('id')).toEqual(jasmine.any(String));
           });
        });


        it('should login the user', function () {
            var session = new Session.Model();

            var done = false;

            // Login  completed event handler.
            var userLoginEvent = function () {
                if (session.get('isAuthenticated') === true) {
                    done = true;
                } else {
                    done = false;
                }
            };

            // Login the User
            var email = testEmail;
            var password = testPwd;
            session.on('session-login-event', userLoginEvent, this);
            session.login(email, password);

            waitsFor(function () {
                return done;
            });

            // Validate the registration
            runs(function () {
                expect(session).not.toBe(null);
                expect(session.get('isAuthenticated')).toEqual(true);
                expect(session.get('id')).toEqual(jasmine.any(String));

            });

        });

        beforeEach(function () {

        });

        afterEach(function () {
            //logout user

        });

        describe('Create Qwizbook', function () {

            it('should create a qwizbook', function () {
                var done = false;
                var qwizbook = null;
                var owneremail = user.get('email');
                var rating = 0;
                qwizbook = new Qwizbook.Model();

                var createqwizbookEvent = function () {

                    if (qwizbook.get('isAddedqwizBook') === true) {
                        done = true;
                    } else {
                        done = false;
                    }

                };
                qwizbook.on('qwizbook-create-success-event', createqwizbookEvent, this);

                var a = 65;
                var charArray = {};

                for (var i = 0; i < 26; i++) {
                
                var qb_date = new Date();

                var dateStr = '[' + qb_date.getFullYear().toString() + '.' +
                    ('00' + (qb_date.getMonth() + 1).toString()).slice(-2) +  '.' +
                    ('00' + qb_date.getDate().toString()).slice(-2) + ' ' +
                    ('00' + qb_date.getHours()).slice(-2) + ':' + 
                    ('00' + qb_date.getMinutes()).slice(-2) + ':' + 
                    ('00' + qb_date.getSeconds()).slice(-2) + ']';
                    
                    charArray[String.fromCharCode(a + i)] = String.fromCharCode(a + i);
                    testqwizbookuniqueKey = "uniqueKey" + charArray[String.fromCharCode(a + i)];
                    testqwizbookTitle = "Title" + charArray[String.fromCharCode(a + i)]+ i.toString() + " " + dateStr;
                    testqwizbookDescription = LoremDescription + charArray[String.fromCharCode(a + i)];
                    testqwizbookSubTitle = "SubTitle" + charArray[String.fromCharCode(a + i)]+ i.toString() + " " + dateStr;

                    // Add the Qwizbook
                    qwizbook.set('uniqueKey', testqwizbookuniqueKey);
                    qwizbook.set('title', testqwizbookTitle);
                    qwizbook.set('title', testqwizbookTitle);
                    qwizbook.set('description', testqwizbookDescription);
                    qwizbook.set('ownerEmail', owneremail);
                    qwizbook.set('date', dateStr);
                    qwizbook.set('reference',reference);
                    qwizbook.set('archive',false);
                    qwizbook.set('published',true);

                    qwizbook.create(testqwizbookTitle,testqwizbookSubTitle, testqwizbookDescription);

                    waitsFor(function () {
                        return done;
                    });

                    // Validate the registration
                    runs(function () {
                        expect(qwizbook).not.toBe(null);
                        expect(qwizbook.get('isAddedqwizBook')).toEqual(true);
                        expect(qwizbook.get('id')).not.toBeNull();
                    });
                }


            });


        });
    });


});
