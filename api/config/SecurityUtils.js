var cryptoJS = require('crypto-js');
var sha256 = require('crypto-js/sha256');

var SecurityUtils = {};

SecurityUtils.encodePassword = function (plainPassword, username) {
	var passwordHash = sha256(plainPassword);
	var usernameHash = sha256(username);

	return cryptoJS.enc.Base64.stringify(cryptoJS.HmacSHA1(passwordHash, usernameHash));
}

module.exports = SecurityUtils;