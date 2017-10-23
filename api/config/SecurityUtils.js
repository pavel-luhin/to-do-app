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

SecurityUtils.setCookieToken = function(response) {
	var token = uuid();
	response.cookie(authTokenCookieName, token);
	return token;
}

module.exports = SecurityUtils;