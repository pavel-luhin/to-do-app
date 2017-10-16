var mongoose = require('mongoose');

var dbUsername = process.env.DB_USERNAME || '';
var dbPassword = process.env.DB_PASSWORD || '';
var dbName = process.env.DB_NAME || 'to-do-db';
var dbUrl = process.env.DB_URL || 'localhost';
var dbPort = process.env.DB_PORT || '27017';

var connectUrl = 'mongodb://' + dbUsername + ':' + dbPassword + '@' + dbUrl + ':' + dbPort + '/' + dbName;

console.log('Opening connection to ' + connectUrl);

mongoose.connect(connectUrl);

mongoose.connection.on('connected', function () {  
  console.log('Default mongodb connection is opened to: ' + connectUrl);
});

mongoose.connection.on('error',function (err) {  
  console.log('Mongodb connection error: ' + err);
});

process.on('SIGINT', function() {  
  mongoose.connection.close(function () { 
    console.log('Closing established connection to mongodb'); 
    process.exit(0); 
  }); 
});