var config = require('../config/config'),
    assert = require("assert"),
    User = require('../models/Users'),
    UserModel = require('../models/UserModel')
    db = require('../lib/db_connection'),
    user='';


describe('Users', function(){

    before(function(){
        UserModel.find({}).remove();
        user = new UserModel();
        user.username = 'Shameer';
        user.email = 'shameer@email.com';
        user.hash = 'passwordhash';
        user.activationCode = 'activationcode';
        user.activationCode = true;
        user.save();
    })
    
    describe('#addUser()', function(){
        it('should save without error', function(done){
            User.addUser("username","password","username@domain.com","activationcode", function(err,user){
                if(err)
                    throw err;
                done();
            })
        })

        it('should throw error when adding duplicate email', function(done){
            User.addUser("username","password","username@domain.com","activationcode", function(err,user){
                if(err)
                    done();
                else{
                    throw "Test failed";
                }
            })
        })
    })

    describe('#activate', function(){
        it('should activate user with given token', function(done){
            User.activate('activationcode', function(err, user){
                if(err)
                    throw err;
                assert.equal(true,user.activationStatus)
                done();
            })
        })
    })

    describe('#findById', function(){
        it('should return user with the given id', function(done){
            User.findById(user._id, function(err, user){
                assert.equal('Shameer', user.username);
                done();
            });
        })
    })
})