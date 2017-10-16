var router = require('express').Router();
var User = require('../domain/User');
var bodyParser = require('body-parser');

router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());

router.post('/', (request, response) => {
	User.findOne(
		{username: request.body.username},
		(error, user) => {
			if (error) {
				return response.status(500).send('Some error occurred while authenticating user');
			}

			if (!user) {
				return response.status(404).send('User was not found');
			}

			if (user.password !== request.body.password) {
				return response.status(400).send('Invalid password');
			}

			//temp solution
			response.cookie('x-auth-token', user._id);
			user.token = user.id;

			response.status(200).send(user);
		});
});

module.exports = router;