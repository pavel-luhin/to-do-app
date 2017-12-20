var cryptoJS = require('crypto-js');
var sha256 = require('crypto-js/sha256');

var uuid = require('uuid/v1');

var SecurityUtils = {};

const authTokenCookieName = 'X-Auth-Token';

SecurityUtils.encodePassword = function (plainPassword, username) {
	var passwordHash = sha256(plainPassword);
	var usernameHash = sha256(username);

	return cryptoJS.enc.Base64.stringify(cryptoJS.HmacSHA1(passwordHash, usernameHash));
}

SecurityUtils.generateToken = function() {
	return uuid();
}

SecurityUtils.getTokenFromRequest = function(request) {
	return request.cookie.authTokenCookieName;
}

SecurityUtils.checkAuthentication = function(request, response, next) {
	if (!request.isAuthenticated()) {
		return response.status(401).send();
	}
	return next();
}

module.exports = SecurityUtils;