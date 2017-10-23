var router = require('express').Router();
var User = require('../domain/User');
var bodyParser = require('body-parser');
var SecurityUtils = require('../config/SecurityUtils');

router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());

router.post('/', (request, response) => {
	var username = request.body.username;
	User.findOne(
		{username: username},
		(error, user) => {

			if (error) {
				return response.status(500).send('Some error occurred while authenticating user');
			}

			if (!user) {
				return response.status(404).send('User was not found');
			}

			var password = request.body.password;
			var encodedPassword = SecurityUtils.encodePassword(password, username);

			if (user.password !== encodedPassword) {
				return response.status(400).send('Invalid password');
			}

			user.token = SecurityUtils.setCookieToken(response);

			user.save(function (eror) {
				if (error) {
					response.status(500).send('Some error occurred while authenticating user');
				}
			});

			user.password = null;
			response.status(200).send(user);
		});
});

module.exports = router;