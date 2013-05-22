/**
 * Module dependencies.
 */

var express = require('express'),
    Recaptcha = require('recaptcha').Recaptcha
    , config = require('./config/config')
    , routes = require('./routes')
    , user = require('./routes/user')
    , session = require('./routes/session')
    , qwizbook = require('./routes/qwizbook')
    , qwizbookComment = require('./routes/qwizbookComments')
    , qwizbookrating = require('./routes/qwizbookrating')
    , qwizbookPage  = require('./routes/qwizbookPage')
    , http = require('http')
    , path = require('path')
    , fs = require('fs')
    , User = require('./models/Users.js')
    , passport = require('passport')
    , LocalStrategy = require('passport-local').Strategy
    , logger = require('./utils/logger')
    ;

var PUBLIC_KEY  = '6Ld3buASAAAAADKscITxGr_e-yGBBbKvBqeR1X43',
    PRIVATE_KEY = '6Ld3buASAAAAACu8MyHl6vm-t4CMD5lr8Elf2zVf';
    
var app = express();

app.configure(function () {
    app.set('port', process.env.PORT || config.web_server_port);
    app.set('views', __dirname + '/views');
    app.set('view engine', 'jade');
    app.use(express.favicon());
    app.use(express.logger('dev'));
    app.use(express.bodyParser());
    app.use(express.methodOverride());
    app.use(express.cookieParser());
    app.use(express.cookieSession({ secret:"qwizkool magic"}));
    // Initialize Passport!  Also use passport.session() middleware, to support
    // persistent login sessions (recommended).
    app.use(passport.initialize());
    app.use(passport.session());
    app.use(app.router);
    app.use(express.static(path.join(__dirname, 'public')));
    app.use(express.static(path.join(__dirname, 'public/test/jasmine')));
});

app.configure('development', function () {
    app.use(express.errorHandler());
});

// Passport session setup.
//   To support persistent login sessions, Passport needs to be able to
//   serialize users into and deserialize users out of the session.  Typically,
//   this will be as simple as storing the user ID when serializing, and finding
//   the user by ID when deserializing.

passport.serializeUser(function (user, done) {
    done(null, user.id);
});

passport.deserializeUser(function (id, done) {
    User.findById(id, function (err, user) {
        done(err, user);
    });
});


passport.use(new LocalStrategy({
        usernameField:'email',
        passwordField:'password'
    },
    function (username, password, done) {
        User.authenticate(username, password, function (err, user) {
            if (err) {
                return done(err);
            }
            if (!user) {
                return done(null, false);
            }
            return done(null, user);
        });
    }
));

// Simple route middleware to ensure user is authenticated.
//   Use this route middleware on any resource that needs to be protected.  If
//   the request is authenticated (typically via a persistent login session),
//   the request will proceed.  Otherwise, the user will be redirected to the
//   login page.
function ensureAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    // Unauthorized Access . Send response with Error
    res.send(401);
}

//app.get('/', routes.index);

// Unsupported REST call 405 Method Not Allowed
function unsupported(req, res) {


    res.send(405);
};


//app.get('/showCaptcha/:id', qwizbookComment.showCaptcha);


app.get('/showCaptcha/:id', function(req, res) {
    var recaptcha = new Recaptcha(PUBLIC_KEY, PRIVATE_KEY);
     
    res.render('form.jade', {
        layout: true,
        title:"Captcha",
        locals: {
            recaptcha_form: recaptcha.toHTML()
        }
    });
    
});


app.post('/', function(req, res) {
    var data = {
        remoteip:  req.connection.remoteAddress,
        challenge: req.body.recaptcha_challenge_field,
        response:  req.body.recaptcha_response_field
    };
    var recaptcha = new Recaptcha(PUBLIC_KEY, PRIVATE_KEY, data);

    recaptcha.verify(function(success, error_code) {
        if (success) {
            res.send('Recaptcha response valid.');
        }
        else {
            // Redisplay the form.
            res.render('form.jade', {
                layout: false,
                locals: {
                    recaptcha_form: recaptcha.toHTML()
                }
            });
        }
    });
    });
/*
 * User Access related routes
 */
app.post('/login', passport.authenticate('local'), user.login);
app.post('/logout', user.logout);

app.post('/sessions', passport.authenticate('local'), session.login);
app.delete('/sessions/:id', session.logout);
app.get('/sessions/:id', ensureAuthenticated, session.getUser);


/*
 +-----------+-------------------+--------------------+----------------------+----------------+
 | RESOURCE  |   POST(create)    |     GET(read)      |     PUT(update)      | DELETE(delete) |
 +-----------+-------------------+--------------------+----------------------+----------------+
 | /users    | create a new user | ERROR              | ERROR                | ERROR          |
 +-----------+-------------------+--------------------+----------------------+----------------+
 |/users/:id | ERROR             | get  user with :id | update user with :id | ERROR          |
 +-----------+-------------------+--------------------+----------------------+----------------+
 */

app.post('/users', user.register);
app.get('/activate/:token', user.activate)
app.post('/users/:id', unsupported);
app.get('/users', unsupported);
app.get('/users/:id', ensureAuthenticated, user.getUser);
app.put('/users', unsupported);
app.put('/users/:id', ensureAuthenticated, user.updateUser);

//archive Qwizbook

app.get('/users/:id/qwizbooks', ensureAuthenticated, qwizbook.getmybooks)

//app.delete('/users', unsupported);
//app.delete('/users/:id', unsupported);

//app.get('/users', user.list);

/*
 * Qwizbook related routes
 */
/*
 +----------------+-----------------------+------------------------+--------------------------+--------------------------+
 |    RESOURCE    |     POST(create)      |       GET(read)        |       PUT(update)        |      DELETE(delete)      |
 +----------------+-----------------------+------------------------+--------------------------+--------------------------+
 | /qwizbooks     | create a new qwizbook | get qwizbooks          | bulk update qwizbooks    | delete all qwizbooks     |
 +----------------+-----------------------+------------------------+--------------------------+--------------------------+
 | /qwizbooks/:id | ERROR                 | get qwizbook with :id  | update qwizbook with :id | delete qwizbook with :id |
 +----------------+-----------------------+------------------------+--------------------------+--------------------------+
 */


// Create a Qwizbook
app.post('/qwizbooks', ensureAuthenticated, qwizbook.createBook);

// Retrieve all qwizbooks
app.get('/qwizbooks', ensureAuthenticated, qwizbook.getbooks);

// Retrieve this Qwizbook
app.get('/qwizbooks/:id', ensureAuthenticated, qwizbook.getbook);

app.get('/qwizbooks/:id/comments')


// Update this Qwizbook
app.put('/qwizbooks/:id', ensureAuthenticated, qwizbook.updateBook);


// create a qwizbook page
app.get('/qwizbooks/:id/pages', ensureAuthenticated, qwizbookPage.getAll)
app.post('/qwizbooks/:id/pages', ensureAuthenticated, qwizbookPage.create);
app.delete('/qwizbooks/:bookId/pages/:pageId', ensureAuthenticated, qwizbookPage.delete);
app.get('/qwizbooks/:bookId/pages/:pageId/references', ensureAuthenticated, qwizbookPage.getReferences)



// Retrieve qwizbook of a particular user

//app.get('/myQwizbook',ensureAuthenticated, qwizbook.getmybooks);


app.delete('/qwizbooks/:id', ensureAuthenticated, qwizbook.deleteBook);
//POST Adding comments
app.post('/comments', ensureAuthenticated, qwizbookComment.AddComments);

//GET  Retreiving particular comment
app.get('/comments/:id', ensureAuthenticated, qwizbookComment.ListComments);

//PUT Update particular comment

//app.put('/comments/:id',)

//DELETE Deleting all comment

//app.delete('/comments');

//DELETE Deleting particular comment

//app.delete('/comments/:id');





app.get('/qwizbookrating/:qwizbookId', ensureAuthenticated, qwizbookrating.ListCommentRating);


// Delete all Qwizbooks
//app.delete('/qwizbooks', ensureAuthenticated, qwizbook.deleteBooks);

// Delete this Qwizbook
//app.delete('/qwizbooks/:id', ensureAuthenticated, qwizbook.deleteBook);


/*
 * Qwizbook Rating related routes
 */
/*
 +---------------------------------+-------------------------------------------------+---------------------------------------------------------+----------------------------------------+---------------------------------------------------+
 | RESOURCE | POST(create) | GET(read) | PUT(update) | DELETE(delete) |
 +---------------------------------+------------------------------------------------+----------------------------------------------------------+--------------------------------------- +--------------------------------------------------+
 | /qwizbookratings/:qbookid | add rating to a qwizbook with : qbookid | get ratings (average rating) of qwizbook with : qbookid | update qwizbook rating with : qbookid | delete all rating for qwizbooks with : qbookid |
 +---------------------------------+-----------------------+------------------------+---------------------------------------------------------+---------------------------------------- +-------------------------------------------------+
 | /qwizbookratings/:id | ERROR | get qwizbookrating with :id | update qwizbookrating with :id | ERROR |
 +---------------------------------+-----------------------+------------------------+---------------------------------------------------------+-----------------------------------------+-------------------------------------------------+
 */

// Add a Qwizbook Rating
app.post('/qwizbookrating/', ensureAuthenticated, qwizbookrating.addBookRating);

// Retrieve all qwizbooks
//app.get('/qwizbookratings/:qbookid ', ensureAuthenticated, qwizbookrating.getBookratings);

// Retrieve this Qwizbook
//app.get('/qwizbooks/:id', ensureAuthenticated, qwizbook.getbook);


// Update this Qwizbook Rating
app.put('/qwizbookrating/:id', ensureAuthenticated, qwizbookrating.updateBookRating);


// Delete all Qwizbooks
//app.delete('/qwizbooks', ensureAuthenticated, qwizbook.deleteBooks);

// Delete this Qwizbook
//app.delete('/qwizbooks/:id', ensureAuthenticated, qwizbook.deleteBook);

// For debugging, provide access to the server logs
//GET server log
app.get('/debug/logs/server.log', logger.getServerLogs);
app.get('/debug/logs/app.log', logger.getAppLogs);


// Start the REST server
http.createServer(app).listen(app.get('port'), function () {
    console.log("Qwizkool REST server listening on port " + app.get('port'));
});

