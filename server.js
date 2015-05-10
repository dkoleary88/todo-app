// server.js

	// set up ------------------------------------

	var express = require('express');
	var app = express();
	var mongoose = require('mongoose');
	var morgan = require('morgan');
	var bodyParser = require('body-parser');
	var methodOverride = require('method-override');


	// configuration -----------------------------

	mongoose.connect('mongodb://localhost');

	app.use(express.static(__dirname + '/public'));
	app.use(morgan('dev'));
	app.use(bodyParser.urlencoded({'extended':'true'}));
	app.use(bodyParser.json());
	app.use(bodyParser.json({ type: 'application/vnd.api+json'}));
	app.use(methodOverride());

	// Todo mongoose model -----------------------

	var Todo = mongoose.model('Todo', {
		text : String
	});


	// listen - start app with node server.js ----

	app.listen(8080);
	console.log('App is listening on port 8080');

// routes ========================================

	// front-end route ---------------------------

	app.get('*', function(req, res){

		res.sendFile('./public/index.html');
		
	});

	// api ---------------------------------------
	// get all todos

	app.get('/api/todos', function(req, res){

		// use mongoose to find all Todos
		Todo.find(function(err, todos){

			// if there is an error, send the error
			if (err){
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






















	