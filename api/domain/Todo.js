var mongoose = require('mongoose');

var todoSchema = mongoose.Schema({
	title: String,
	smallContent: String,
	fullContent: String,
	created: Date,
	createdBy: String
});

var Todo = mongoose.model('Todo', todoSchema);

module.exports = Todo;