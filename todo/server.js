var express = require("express");

var PORT = process.env.PORT || 4000;

var app = express();

var bodyParser = require("body-parser");
app.use(bodyParser.json());

var _ = require("underscore");
var db = require('./db.js');

var middleware = require("./middleware.js");
var reqCallbacks = [
	middleware.logger
	//middleware.queryCompleted
];

var nextId = 3; // TODO: temp, refactor this out later.

//should store unformatted for sorting in database, but display human readable
//or store as a proper date type in database if that's an option
// function getFormattedDate(date) {
// 	var YYYY = 	date.getFullYear();
// 	var MM = 	date.getMonth() + 1;
// 	var DD = 	date.getDate();
// 	var hh = 	date.getHours();
// 	var mm = 	date.getMinutes();
// 	var ss = 	date.getSeconds();
// 	var m = 	date.getMilliseconds();

// 	var datestamp = "" 	+ YYYY + "/"
// 						 + MM + "/" 
// 						 + DD + " "  
// 						 + hh + ":" 
// 						 + mm + ":" 
// 						 + ss + ":"
// 						 + m;
// 	return datestamp;
// }

function filterTodos(query) {
	var results = todos;

	if (query.description !== undefined) { 
		console.log("Filtering on description");
		results = _.filter(results, function(todo) {  
			return (todo.description.toString().toLowerCase().indexOf(query.description.toLowerCase()) > -1);
		});
	}

	if (query.completed !== undefined) {
		console.log("Filtering on completed");
		results = _.filter(results, function(todo) {  
			return (todo.completed.toString() === query.completed);
		});
	}

	if (query.dateCreated !== undefined) { 
		console.log("Filtering on dateCreated");
		results = _.filter(results, function(todo) {  
			return (todo.dateCreated === query.dateCreated);
		});
	}

	if (query.dateCompleted !== undefined) { 
		console.log("Filtering on dateCompleted");
		results = _.filter(results, function(todo) {  
			return (todo.dateCompleted === query.dateCompleted);
		});
	} 
	console.log("Found " + results.length + " matching items.");
	return results;
}

// function createTodo(json) {
// 	var todo = {};
// 	todo.id = nextId;
// 	todo.description = json.description;
// 	todo.completed = false;
// 	todo.dateCreated = getFormattedDate(new Date());
// 	todo.dateCompleted = "";
// 	todos.push(todo);
// 	++nextId;
// }

//var today = getFormattedDate(new Date());

var todos = [
	{
		id: 0,
		description: "A thing that needs doing", 
		completed: false,
		//dateCreated: today,
		//dateCompleted: ""
	}, 
	{
		id: 1,
		description: "A procrastination task", 
		completed: false,
		//dateCreated: today,
		//dateCompleted: ""
	},
	{
		id: 2,
		description: "An added task", 
		completed: true,
		//dateCreated: today,
		//dateCompleted: today
	}
];

// GET /todos
// GET /todos?complete=true/false
app.get("/todos", reqCallbacks, function (req, resp) {
	db.todo.findAll()
	.then( function(todos) {
		console.log("todos:");
		console.log(todos);
		resp.status(200).json(todos);
	})
	.catch(function(e) {
		console.log(e);
		resp.status(500).send();
	});
	
	// var results = null;
	// var params = req.query;
	// if (params !== undefined) { 
	// 	return resp.json(filterTodos(params));	
	// } else {
	// 	return resp.json(todos);	
	// }
});


// GET /todos/:id
app.get("/todos/:id", reqCallbacks, function (req, resp) {
	var reqId = parseInt(req.params.id);
	// var match = _.findWhere(todos, {id: reqId});
	var match = db.todo.findById(reqId)
	.then(function(match){
		if (match) {
			resp.status(200).json(match).send();
		} else {
			resp.status(404).send();
		}
	})
	.catch(function(e) {
		console.log(e);
		resp.status(500).send();
	});
	

	/*
	var match = null;
	todos.forEach( function(todo) {
		if(todo.id === reqId) {
			match = todo;
		}
	});
	*/
	//resp.json(match);
});

// POST /todos
app.post("/todos", reqCallbacks, function(req, resp) {
	var body = _.pick(req.body, "description", "completed");
	
	if (!_.isBoolean(body.completed) || ! _.isString(body.description) || _.isEmpty(body.description)) {
		resp.status(400).send();
	}

	db.todo.create(body)
	.then(function(todo) {
		resp.json(todo);
	})
	.catch(function(e) {
		resp.status(400).json(e);
	});

});

// PUT /todos/:id
app.put("/todos/:id", function (req, resp) {
	var reqId = parseInt(req.params.id);
	var match = _.findWhere(todos, {id: reqId});
	var body = _.pick(req.body, "description", "completed");
	var validAttributes = {};

	if (!match) {
		return resp.status(404).json({"error" : "No todo with that id"});
	}

	if (body.hasOwnProperty("completed") && _.isBoolean(body.completed)) {
		validAttributes.completed = body.completed;
	} else if (body.hasOwnProperty("completed")) { 
		return resp.status(400).send();
	}

	if (body.hasOwnProperty("description") && _.isString(body.description) && !_.isEmpty(body.description)) {
		validAttributes.description = body.description;
	} else if (body.hasOwnProperty("description")) { 
		return resp.status(400).send();
	}
	
	_.extend(match, validAttributes);	
	return resp.json(match).send();
});


// DELETE /todos/:id
app.delete("/todos/:id", reqCallbacks, function(req, resp) {
	var reqId = parseInt(req.params.id);
	var match = _.findWhere(todos, {id: reqId});
	
	if (!match) {
		resp.status(404).json({"error" : "No todo with that id"});
	}

	todos = _.without(todos, match);
	console.log("Deleted todo " + match.id + " " + match.description);
	resp.status(200).json({"success" : "Deleted todo " + match.id + " " + match.description}).send();
});

app.get('/', function(req, resp) {
	resp.send('To-do API root');
});

db.sequelize.sync();

app.listen(PORT, function() {
	console.log("Server listening on port " + PORT + "...");
});