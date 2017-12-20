const User = require('../domain/User');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const SecurityUtils = require('./SecurityUtils');

passport.use('local', new LocalStrategy({
	usernameField: 'username',
	passwordField: 'password'
}, (username, password, done) => {
	User.findOne({username}, (error, user) => {
		if (error) {
			done(error);
		}

		if (!user) {
			done(null, false, 'Username does not exists');
		}

		var encodedPassword = SecurityUtils.encodePassword(password, username);

		if (user.password !== encodedPassword) {
			done(null, false, 'Invalid password');
		}

		user.token = SecurityUtils.generateToken();
		user.save();
		delete user.password;

		done(null, user);
	})
}));

passport.serializeUser(function(user, done) {
	done(null, user);
});

passport.deserializeUser(function(user, done) {
	User.findOne({token: user.token}).then((user) => {
		done(null, user);
	});
});