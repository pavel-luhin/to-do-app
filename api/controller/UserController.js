var router = require('express').Router();
var User = require('../domain/User');
var bodyParser = require('body-parser');
var SecurityUtils = require('../config/SecurityUtils');

router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());

router.get('/check-available', (request, response) => {
	var callback = function (error, user) {
		if (error) {
			return response.status(400).send('Cannot check availability');
		}

		return response.status(200).send(!user);
	}

	if (request.query.email) {
		User.findOne({email: request.query.email}, callback);
	} else {
		User.findOne({username: request.query.username}, callback);
	}
});

router.post('/register', (request, response) => {
	var username = request.body.username;
	var password = request.body.password;

	var encodedPassword = SecurityUtils.encodePassword(password, username);

	User.create({
		username: request.body.username,
		password: encodedPassword,
		email: request.body.email
	}, (error, user) => {
		if (error) {
			//duplicate record error code
			if (error.code === 11000) {
				return response.status(400).send('User with such data already exists');
			}
			
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