// server.js


// modules =================================================
var express        = require('express');
var app            = express(); //express constructor
var mongoose       = require('mongoose');
var bodyParser     = require('body-parser');
var methodOverride = require('method-override');
var passport = require('passport');
var flash 	 = require('connect-flash');
var cookieParser = require('cookie-parser');
var session      = require('express-session');
var db = require('./config/db');

//configuration ===========================================
 require('./config/passport')(passport); // pass passport for configuration

mongoose.connect(db.url);
var port = 8003; // set our port
app.use(cookieParser()); // read cookies (needed for auth)
// get all data/stuff of the body (POST) parameters
app.use(bodyParser.json()); // parse application/json 
app.use(bodyParser.json({ type: 'application/vnd.api+json' })); // parse application/vnd.api+json as json
app.use(bodyParser.urlencoded({ extended: true })); // parse application/x-www-form-urlencoded

app.use(methodOverride('X-HTTP-Method-Override')); // override with the X-HTTP-Method-Override header in the request. simulate DELETE/PUT
app.use(express.static(__dirname + '/public')); // set the static files location /public/img will be /img for users



app.use(session({ secret: 'AHHSECRETTHISISSOSECRETY' })); // session secret
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions
app.use(flash()); // use connect-flash for flash messages stored in session

// routes ==================================================
require('./app/routes')(app,passport); // configure our routes


// start app ===============================================
app.listen(port);										// startup our app at http://localhost:8080
console.log('Magic happens on port ' + port); 			// shoutout to the user
exports = module.exports = app; 						// expose app
 