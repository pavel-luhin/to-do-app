var express = require('express');
var app = express();
var dbConfig = require('./api/config/DatabaseConfiguration');

var UserController = require('./api/controller/UserController');
var AuthenticationController = require('./api/controller/AuthenticationController');

var port = process.env.PORT || 3021;

app.use('/user', UserController);
app.use('/authenticate', AuthenticationController);

app.use(express.static(__dirname + '/.tmp'));

app.listen(port);
console.log('Sample app started on http://localhost:' + port);

module.exports = app;