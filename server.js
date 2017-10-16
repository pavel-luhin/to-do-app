var express = require('express');
var app = express();

var UserController = require('./api/controller/UserController');

var port = process.env.PORT || 3021;

app.use('/user', UserController);

app.listen(port);
console.log('Sample app started on http://localhost:' + port);

module.exports = app;