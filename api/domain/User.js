var mongoose = require('mongoose');

var userSchema = mongoose.Schema({
	username: {type: String, unique: true, required: true},
	password: String,
	email: {type: String, unique: true, required: true},
	token: String
});

var User = mongoose.model('User', userSchema);

module.exports = User;