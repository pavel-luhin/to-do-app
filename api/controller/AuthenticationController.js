var router = require('express').Router();
var User = require('../domain/User');
var bodyParser = require('body-parser');
var uuid = require('uuid/v1');

router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());

router.post('/', (request, response) => {
	User.findOne(
		{username: request.body.username},
		(error, user) => {

			console.log(request.body);
			if (error) {
				return response.status(500).send('Some error occurred while authenticating user');
			}

			if (!user) {
				return response.status(404).send('User was not found');
			}

			if (user.password !== request.body.password) {
				return response.status(400).send('Invalid password');
			}

			var token = uuid();
			response.cookie('x-auth-token', token);
			user.token = token;

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