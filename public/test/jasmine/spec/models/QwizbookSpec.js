describe('Model :: Qwizbook', function () {
    var time = '';
    var testUser = '';
    var testPwd = '';
    var testEmail = '';
    // Create test data for the user model

    var testqwizbookuniqueKey = '';
    var testqwizbookTitle = '';
    var testqwizbookDescription = '';
    var LoremDescription = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam at elit et urna aliquet dictum. Vestibulum tincidunt neque nec justo pretium lobortis in at metus. Quisque vitae lectus a dui bibendum hendrerit. Donec sed est odio, egestas iaculis nibh. Aliquam viverra adipiscing leo non blandit. Donec pellentesque, lorem et eleifend rhoncus, nisi mi pellentesque arcu, tristique lobortis tellus tortor vel risus. Nulla tristique ipsum eu purus pharetra id luctus leo feugiat. Praesent sollicitudin metus a eros pretium dictum. Sed rhoncus consequat eros, vel blandit ante sollicitudin sit amet. Nam gravida aliquam enim, id congue velit bibendum a. Etiam in mauris vitae ipsum interdum vestibulum. Duis ultrices ullamcorper mauris, vel volutpat risus vestibulum in. Sed diam mi, dapibus at tristique sit amet, sodales eget augue. Pellentesque nulla orci, dapibus tincidunt facilisis sit amet, placerat dignissim ante. In consequat sollicitudin magna, et volutpat dui faucibus at. Nunc iaculis consequat nulla a faucibus.";

    beforeEach(function () {

        time = new Date().getTime();
        testUser = "User" + time;
        testPwd = "Pwd" + time;
        testEmail = testUser + "@email.com";
        // Create test data for the user model

        var testqwizbookuniqueKey = "uniqueKey";
        var testqwizbookTitle = "Title-";
        var testqwizbookDescription =  "description"

        var that = this, done = false;

        require(['modules/user'], function (User) {
            // that.users = new User.Collection();
            that.user = new User.Model();
            done = true;
        });

        waitsFor(function () {
            return done;
        }, "Create Models");

        runs(function () {
            // Registration completed event handler.
            var userRegisterEvent = function () {
                if (that.user.get('isRegistered') === true) {
                    done = true;
                } else {
                    done = false;
                }
            };

            // Register the User
            var username = testUser;
            var email = testEmail;
            var password = testPwd;
            that.user.on('user-registration-event', userRegisterEvent, this);
            that.user.register(username,email,password);

            waitsFor(function () {
                return done;
            });

        });


        runs(function () {


            var userLoginEvent = function () {
                if (that.user.get('isLoggedIn') === true) {
                    done = false;
                } else {
                    done = true;
                }
            };

            var email = testEmail;
            var password = testPwd;
            that.user.on('user-login-event', userLoginEvent, this);
            console.log(email);
            console.log(password);

            that.user.login(email, password);

            waitsFor(function () {
                return done;
            });


        });

    });

    afterEach(function () {
        //logout user

    });

    describe('Create Qwizbook', function () {

        it('should create a qwizbook', function () {
            var done = false;
            var qwizbook = null;
            var owneremail = this.user.get('email');
            var rating = 0;

            require(['modules/qwizbook'], function (Qwizbook) {
                // that.users = new User.Collection();
                qwizbook = new Qwizbook.Model();
                done = true;
            });
            waitsFor(function () {
                return done;
            }, "Create Models");

            // Create Qwizbbok completed event handler.
            runs(function () {
                var createqwizbookEvent = function () {

                    if (qwizbook.get('isAddedqwizBook') === true) {
                        done = true;
                    } else {
                        done = false;
                    }

                };

                var a = 65;
                var charArray = {};

                for (var i = 0; i < 26; i++) {
                    charArray[String.fromCharCode(a + i)] = String.fromCharCode(a + i);
                    testqwizbookuniqueKey = "uniqueKey" + charArray[String.fromCharCode(a + i)];
                    testqwizbookTitle = "Title" + charArray[String.fromCharCode(a + i)];
                    testqwizbookDescription = LoremDescription + charArray[String.fromCharCode(a + i)];

                    // Add the Qwizbook
                    qwizbook.set('uniqueKey', testqwizbookuniqueKey);
                    qwizbook.set('title', testqwizbookTitle);
                    qwizbook.set('description', testqwizbookDescription);
                    qwizbook.set('ownerEmail', owneremail);
                    qwizbook.set('userRating', [
                        {
                            'submitterEmail':owneremail,
                            'rating':'0'
                        }
                    ]);

                    var submitterName = 'TestQwizbookRater'
                    var submitterDomain = 'qwizkool.com';
                    var submitterEmail = '';

                    for (var r = 1; r <= 5; r++) {

                        submitterEmail = submitterName + r + '@' + submitterDomain;
                        qwizbook.get('userRating').push({
                            'submitterEmail':submitterEmail,
                            'rating':r
                        });

                    }

                    qwizbook.on('create-qwizbook-event', createqwizbookEvent, this);

                    qwizbook.createqwizbook();

                    waitsFor(function () {
                        return done;
                    });

                    // Validate the registration
                    runs(function () {
                        expect(qwizbook).not.toBe(null);
                        expect(qwizbook.get('isAddedqwizBook')).toEqual(false);
                        expect(qwizbook.get('id')).toBeNull();
                        //expect(qwizbook.get('id')).toEqual(jasmine.any(null));
                        //expect(qwizbook.get('AddedqwizBookStatus')).not.toBeNull();
                    });
                }

            });
        });

        it('should fail creating a qwizbook with same title', function () {
            var done = false;
            var qwizbook = null;
            var owneremail = this.user.get('email');

            require(['modules/qwizbook'], function (Qwizbook) {
                // that.users = new User.Collection();
                qwizbook = new Qwizbook.Model();
                done = true;
            });
            waitsFor(function () {
                return done;
            }, "Create Models");

            runs(function () {
                // Qwizbook create completed event handler.
                var createqwizbookEvent = function () {
                    if (qwizbook.get('isAddedqwizBook') === true) {
                        done = false;
                    } else {
                        done = true;
                    }
                };

                // Add the Same Title different description
                //qwizbook.set('title', testqwizbookTitle);

                qwizbook.set('title', testqwizbookTitle + new Date().getTime());
                qwizbook.set('description', LoremDescription + new Date().getTime());
                qwizbook.set('ownerEmail', owneremail);
                qwizbook.on('create-qwizbook-event', createqwizbookEvent, this);
                qwizbook.createqwizbook();

                waitsFor(function () {
                    return done;
                });

                // Validate create qwizbook
                runs(function () {
                    expect(qwizbook).not.toBe(null);
                    expect(qwizbook.get('isAddedqwizBook')).toEqual(false);
                    expect(qwizbook.get('id')).toBeNull();
                    //expect(qwizbook.get('AddedqwizBookStatus')).toEqual("Bad Request");
                });
            });
        });
    });
});

xdescribe("Add and Edit Qwizbook Rating ", function () {

    it('should add rating to Qwizbook userRating array if new users', function () {

        var done = false;
        var qwizbookList = null;

        require(['modules/qwizbook'], function (Qwizbook) {
            // that.users = new User.Collection();
            qwizbookList = new Qwizbook.Collection();
            done = true;
        });
        waitsFor(function () {
            return done;
        }, "Create Collection");

        // Create Qwizbbok completed event handler.
        runs(function () {
            var a = 65;
            var charArray = {};
            var qwizbookcurr = '';
            var qwizbooklisting = null;
            //qwizbookList.QwizbookList();
            //var qwizbookList = '';
            //qwizbookList = new Qwizbook.Collection();
            qwizbooklisting = qwizbookList.QwizbookList();
            console.log(qwizbooklisting.toJSON);


            // Validate the registration
            runs(function () {
                expect(qwizbookList).not.toBe(null);
                expect(qwizbookList.isListedqwizBook).toEqual(false);

            });
        });

    });
});

//Test Suite to check rating




//Test Suite ends


describe("A Qwizbook collection", function () {

    it('should contain models', function () {
        var done = false;
        var qwizbookList = null;

        require(['modules/qwizbook'], function (Qwizbook) {
            // that.users = new User.Collection();
            qwizbookList = new Qwizbook.Collection();
            done = true;
        });
        waitsFor(function () {
            return done;
        }, "Create Collection");

        // Create Qwizbbok completed event handler.
        runs(function () {
            var listqwizbookEvent = function () {

                if (qwizbookList.isListedqwizBook === true) {
                    done = true;
                } else {
                    done = false;
                }

            };

            qwizbookList.on('list-qwizbook-event', listqwizbookEvent, this);

            qwizbookList.QwizbookList();

            waitsFor(function () {
                return done;
            });

            // Validate the registration
            runs(function () {
                expect(qwizbookList).not.toBe(null);
                expect(qwizbookList.isListedqwizBook).toEqual(false);

            });
        });
    });
});

