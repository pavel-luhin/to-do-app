var router = require('express').Router();
var User = require('../domain/User');

router.get('/:id', (request, response) => {
	var user = new User('username', 'password');
	response.status(200).send(user);
});

module.exports = router;