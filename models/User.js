var db = require('../lib/db_connection');

var bcrypt = require('bcrypt');
var SALT_WORK_FACTOR = 10;


/*Schema definition*/

var UserSchema = new db.Schema({
    username:{type:String, unique:true},
    email:{type:String, unique:true},
    //   salt: { type: String, required: true },
    hash:{ type:String, required:true }
});


UserSchema.virtual('password')
    .get(function () {
        return this._password;
    })
    .set(function (password) {

        this._password = password;

        //The salt is incorporated into the hash (as plaintext).
        var salt = bcrypt.genSaltSync(SALT_WORK_FACTOR);
        this.hash = bcrypt.hashSync(password, salt);
    });

UserSchema.method('verifyPassword', function (password, callback) {

    //The salt is incorporated into the hash (as plaintext). The compare function simply pulls the salt out of the hash
    //and then uses it to hash the password and perform the comparison.
    bcrypt.compare(password, this.hash, callback);
});

UserSchema.methods.getUserForResponse = function () {

    return { username:this.username, email:this.email, id:this._id  }
};

var QwizkoolUser = db.conn.model('User', UserSchema);

// Exports
module.exports.addUser = addUser;
module.exports.authenticate = authenticate;
module.exports.findById = findById;


// Add user to database
function addUser(username, password, email, callback) {

    var instance = new QwizkoolUser();

    instance.username = username;
    instance.password = password;
    instance.email = email;

    instance.save(function (err) {
        if (err) {

            // Check for duplicate key error
            if (err.code == 11000) {
                callback({Error:"User already exist with the same email ID/user name"})
                return;
            }

            // All other conditions Pass as is TODO: need to cleanup.
            callback({Error:"User Could not be created "});
        }
        else {
            callback(null, instance);
        }
    });
}


function authenticate(email, password, callback) {
    QwizkoolUser.findOne({ email:email }, function (err, user) {
        if (err) {
            return callback(err);
        }
        if (!user) {
            return callback(null, false);
        }

        user.verifyPassword(password, function (err, passwordCorrect) {
            if (err) {
                return callback(err);
            }
            if (!passwordCorrect) {
                return callback(null, false);
            }
            return callback(null, user);
        });

    });
};

function findById(id, callback) {
    QwizkoolUser.findById(id, function (err, user) {
        if (err) {
            return callback(err);
        }
        if (!user) {
            return callback(null, false);
        }

        return callback(null, user);

    });
};
