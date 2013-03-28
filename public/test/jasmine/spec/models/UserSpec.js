define(['modules/user', 'modules/session'], function (User, Session) {
    return describe('Model :: User', function () {

        // Create test data for the user model
        var time = new Date().getTime();
        var testUser = "User" + time;
        var testPwd = "Pwd" + time;
        var testEmail = testUser + "@email.com";


        beforeEach(function () {

            done = false;
            this.user = new User.Model();
            this.session = new Session.Model();


        });

        afterEach(function () {
            /*       var done = false,
             isDone = function () {
             return done;
             };

             this.user.fetch({
             success:function (c) {
             c.each(function (m) {
             m.destroy();
             });
             done = true;
             }
             });

             waitsFor(isDone);

             done = false;
             this.user.destroy({
             success:function () {
             done = true;
             }
             });

             waitsFor(isDone);*/

        });

        describe('Create User', function () {


            it('should create a user', function () {
                var done = false;

                // Registration completed event handler.
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
                this.user.on('user-registration-event', userRegisterEvent, this);
                this.user.register(username, email, password);

                waitsFor(function () {
                    return done;
                });

                // Validate the registration
                runs(function () {
                    expect(this.user).not.toBe(null);
                    expect(this.user.get('id')).toEqual(jasmine.any(String));
                });

            });

            it('should fail creating a user with same user name', function () {
                var done = false;

                // Registration completed event handler.
                var userRegisterEvent = function (e) {
                    done = false;
                    if (e.valid === false) {
                        done = true;
                    }

                };

                // Register the Same User different email
                var username = testUser;
                var email = new Date().getTime() + testEmail;
                var password = testPwd;
                this.user.on('user-registration-event', userRegisterEvent, this);
                this.user.register(username, email, password);

                waitsFor(function () {
                    return done;
                });

                // Validate the registration
                runs(function () {
                    expect(this.user).not.toBe(null);
                    expect(this.user.get('id')).toBeNull();
                });

            });

            it('should fail creating a user with same email', function () {
                var done = false;

                // Registration completed event handler.
                var userRegisterEvent = function (e) {
                    done = false;
                    if (e.valid === false) {
                        done = true;
                    }

                };

                // Register the new User but same email
                var username = testUser + new Date().getTime();
                var email = testEmail;
                var password = testPwd;
                this.user.on('user-registration-event', userRegisterEvent, this);
                this.user.register(username, email, password);

                waitsFor(function () {
                    return done;
                });

                // Validate the registration
                runs(function () {
                    expect(this.user).not.toBe(null);
                    expect(this.user.get('id')).toBeNull();
                });

            });


        });

        describe('Login/Logout User', function () {


            it('should prevent login of an invalid user', function () {
                var done = false;

                // Login  completed event handler.
                var userLoginEvent = function () {
                    if (this.session.get('isAuthenticated') === true) {
                        done = false;
                    } else {
                        done = true;
                    }
                };

                // Login  the User
                var email = testEmail + new Date().getTime();
                var password = testPwd;
                this.session.on('session-login-event', userLoginEvent, this);
                this.session.login(email, password);

                waitsFor(function () {
                    return done;
                });

                // Validate the registration
                runs(function () {
                    expect(this.session).not.toBe(null);
                    expect(this.session.get('isAuthenticated')).toEqual(false);
                    expect(this.session.get('id')).toBeNull();
                });

            });

            it('should allow login of a valid user', function () {
                var done = false;

                // Login  completed event handler.
                var userLoginEvent = function () {
                    if (this.session.get('isAuthenticated') === true) {
                        done = true;
                    } else {
                        done = false;
                    }
                };

                // Login the User
                var email = testEmail;
                var password = testPwd;
                this.session.on('session-login-event', userLoginEvent, this);
                this.session.login(email, password);

                waitsFor(function () {
                    return done;
                });

                // Validate the registration
                runs(function () {
                    expect(this.session).not.toBe(null);
                    expect(this.session.get('isAuthenticated')).toEqual(true);
                    expect(this.session.get('id')).toEqual(jasmine.any(String));

                    // Set the ID
                    //this.user.id = this.user.get('id');

                });

            });

            it('should have an authenticated session for a logged in user', function () {

                var done = false;

                // Login  completed event handler.
                var userLoginEvent = function () {
                    if (this.session.get('isAuthenticated') === true) {
                        done = true;
                    } else {
                        done = false;
                    }
                };

                // Login the User
                var email = testEmail;
                var password = testPwd;
                this.session.on('session-login-event', userLoginEvent, this);
                this.session.login(email, password);

                waitsFor(function () {
                    return done;
                });

                // Validate the registration
                runs(function () {
                    expect(this.session).not.toBe(null);
                    expect(this.session.get('isAuthenticated')).toEqual(true);
                    expect(this.session.get('id')).toEqual(jasmine.any(String));

                    var sessionStatusEvent = function () {
                        if (this.session.get('isAuthenticated') === true) {
                            done = true;
                        } else {
                            done = false;
                        }
                    };
                    this.session.on('session-check-event', sessionStatusEvent, this);
                    this.session.isSessionValid();


                    waitsFor(function () {
                        return done;
                    });


                    // Validate the registration
                    runs(function () {
                        expect(this.session).not.toBe(null);
                        expect(this.session.get('isAuthenticated')).toEqual(true);
                        expect(this.session.get('id')).toEqual(jasmine.any(String));
                    });

                });


            });

            it('should not have an authenticated session for a logged out user', function () {
                var done = false;

                // Login  completed event handler.
                var userLoginEvent = function () {
                    if (this.session.get('isAuthenticated') === true) {
                        done = true;
                    } else {
                        done = false;
                    }
                };

                // Login the User
                var email = testEmail;
                var password = testPwd;
                this.session.on('session-login-event', userLoginEvent, this);
                this.session.login(email, password);

                waitsFor(function () {
                    return done;
                });

                runs(function () {
                    done = false;

                    // Login  completed event handler.
                    var userLoginEvent = function () {
                        if (this.session.get('isAuthenticated') === true) {
                            done = false;
                        } else {
                            done = true;
                        }
                    };

                    // Login the User
                    var email = testEmail;
                    var password = testPwd;
                    this.session.on('session-logout-event', userLoginEvent, this);
                    this.session.logout(email, password);

                    waitsFor(function () {
                        return done;
                    });

                    // Validate the registration
                    runs(function () {
                        expect(this.session).not.toBe(null);
                        expect(this.session.get('isAuthenticated')).toEqual(false);
                        expect(this.session.get('id')).toBeNull();

                        var sessionStatusEvent = function () {
                            if (this.session.get('isAuthenticated') === false) {
                                done = true;
                            } else {
                                done = false;
                            }
                        };
                        this.session.on('session-check-event', sessionStatusEvent, this);
                        this.session.isSessionValid();


                        waitsFor(function () {
                            return done;
                        });


                        // Validate the registration
                        runs(function () {
                            expect(this.session).not.toBe(null);
                            expect(this.session.get('isAuthenticated')).toEqual(false);
                            expect(this.session.get('id')).toBeNull();
                        });

                    });

                });
            });

        });
    });
});
