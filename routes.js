// app/routes.js

// load the todo model
var Todo = require('./models/todo');

// expose the routes to our app with module.exports
module.exports = function(app) {

	// api =======================================
	// get all todos

	app.get('*', function(req, res){

		res.sendfile('./public/index.html');

	});

	// api ---------------------------------------
	// get all todos

	app.get('/api/todos', function(req, res){

		// use mongoose to find all Todos
		Todo.find(function(err, todos){
			if(err){
				res.send(err);
			}

			res.json(todos);
		});
	});


	// create a todo and send back all todos after creation

	app.post('/api/todos', function(req, res){

		// use mongoose to insert new todo (from AJAX req from Angular) into DB
		Todo.create({
			text : req.body.text,
			done : false
		},function(err, todo){
			if(err){
				res.send(err);
			}

			// show all todos
			Todo.find(function(err, todos){
				if(err){
					res.send(err);
				}

				res.json(todos);
			});

		});
	});


	// delete a todo

	app.delete('/api/todos/:todo_id',function(req, res){

		Todo.remove({
			_id : req.params.todo_id
		},function(err,todo){
			if (err){ res.send(err); }

			Todo.find(function(err, todos){
				if (err){ res.send(err); }

				res.json(todos);
			});
		});

	});


	// delete all from the db

	app.get('/deleteall',function(req, res){

		Todo.remove({});

	});


};