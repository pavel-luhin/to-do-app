var router = require('express').Router();
var User = require('../domain/User');
var bodyParser = require('body-parser');

router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());

router.post('/register', (request, response) => {
	User.create({
		username: request.body.username,
		password: request.body.password,
		email: request.body.email
	}, (error, user) => {
		if (error) {
			console.log(error);
			return response.status(400).send('There was a problem adding new user to DB');
		}

		response.status(201).send(user);
	});
});

router.get('/:id', (request, response) => {
	console.log(request.params.id);
	User.findById(
		request.params.id, 
		{password: 0},
		(error, user) => {
			if (error) {
				return response.status(500).send('Some error occurred while looking for user');
			}

			if (!user) {
				return response.status(404).send('User with that id was not found');
			}

			response.status(200).send(user);
		});
});

module.exports = router;