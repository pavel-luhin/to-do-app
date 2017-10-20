var router = require('express').Router();
var bodyParser = require('body-parser');
var Todo = require('../domain/Todo')

router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());

router.get('/todos', (request, response) => {
	//todo temp solution
	Todo.find({createdBy: 'admin'}, (error, todos) => {
		if (error) {
			response.status(500).send('Some error occured while retrieving users todos');
		}

		if (!todos) {
			response.status(404).send('No todos found for user');
		}

		response.status(200).send(todos);
	});
});

router.get('/todos/:id', (request, response) => {
	Todo.findById(request.params.id, (error, todo) => {
		if (error) {
			response.status(500).send('Some error occured while retrieving users todo');
		}

		if (!todo) {
			response.status(404).send('Todo with given id could not been found');
		}

		response.status(200).send(todo);
	});
});

router.post('/todos', (request, response) => {
	Todo.create({
		title: request.body.title,
		fullContent: request.body.content,
		createdBy: 'admin',
		created: new Date()
	}, (creationError, todo) => {
		if (creationError) {
			response.status(500).send('Some error occured while saving todo');
		}

		Todo.find({createdBy: 'admin'}, (error, todos) => {
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