var router = require('express').Router();
var bodyParser = require('body-parser');
var Todo = require('../domain/Todo');
var SecurityUtils = require('../config/SecurityUtils');

router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());

router.get('/todos', SecurityUtils.checkAuthentication ,(request, response) => {
	let user = request.user;
	//todo temp solution
	Todo.find({createdBy: request.username}, (error, todos) => {
		if (error) {
			return response.status(500).send('Some error occured while retrieving users todos');
		}

		if (!todos || todos.length === 0) {
			return response.status(204).send();
		}

		response.status(200).send(todos);
	});
});

router.get('/todos/:id', SecurityUtils.checkAuthentication, (request, response) => {
	Todo.findById(request.params.id, (error, todo) => {
		if (error) {
			response.status(500).send('Some error occured while retrieving users todo');
		}

		if (!todo || todo.createdBy != request.username) {
			response.status(404).send('Todo with given id could not been found');
		}

		response.status(200).send(todo);
	});
});

router.post('/todos', SecurityUtils.checkAuthentication, (request, response) => {
	Todo.create({
		title: request.body.title,
		fullContent: request.content,
		createdBy: request.username,
		created: new Date()
	}, (creationError, todo) => {
		if (creationError) {
			response.status(500).send('Some error occured while saving todo');
		}

		Todo.find({createdBy: request.username}, (error, todos) => {
			if (error) {
				response.status(500).send('Some error occured while retrieving users todos');
			}

			if (!todos) {
				response.status(404).send('No todos found for user');
			}

			response.status(200).send(todos);
		});
	})
});

module.exports = router;