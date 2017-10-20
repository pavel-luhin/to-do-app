var express = require('express');
var app = express();
var dbConfig = require('./api/config/DatabaseConfiguration');

var UserController = require('./api/controller/UserController');
var AuthenticationController = require('./api/controller/AuthenticationController');
var DashboardController = require('./api/controller/DashboardController');

var port = process.env.PORT || 3021;

app.use('/api/user', UserController);
app.use('/api/authenticate', AuthenticationController);
app.use('/api/dashboard', DashboardController);

app.use(express.static(__dirname + '/.tmp'));
app.get('/*', (request, response) => {
	response.sendFile(__dirname + '/.tmp/index.html');
});

app.listen(port);
console.log('Sample app started on http://localhost:' + port);

module.exports = app;