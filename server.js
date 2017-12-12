var express = require('express');
var app = express();
var dbConfig = require('./api/config/DatabaseConfiguration');
const passport = require('passport');
const passportConfig = require('./api/config/Passport');
const cookieParser = require('cookie-parser');
var session = require('express-session');

var UserController = require('./api/controller/UserController');
var DashboardController = require('./api/controller/DashboardController');

var port = process.env.PORT || 3021;

app.use(cookieParser());
app.use(session({secret: 'supersecret'}));

app.use(passport.initialize());
app.use(passport.session());

app.use('/api/user', UserController);
app.use('/api/dashboard', DashboardController);

app.use(express.static(__dirname + '/.tmp'));
app.get('/*', (request, response) => {
	response.sendFile(__dirname + '/.tmp/index.html');
});

app.listen(port);
console.log('Sample app started on http://localhost:' + port);

module.exports = app;