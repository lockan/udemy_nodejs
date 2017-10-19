var express = require("express");

var PORT = process.env.PORT || 4000;

var app = express();

var bodyParser = require("body-parser");
app.use(bodyParser.json());

var _ = require("underscore");

var middleware = require("./middleware.js");
var reqCallbacks = [
	middleware.logger, 
	middleware.queryCompleted
];

var nextId = 3; // TODO: temp, refactor this out later.

//should store unformatted for sorting in database, but display human readable
//or store as a proper date type in database if that's an option
function getFormattedDate(date) {
	var YYYY = 	date.getFullYear();
	var MM = 	date.getMonth() + 1;
	var DD = 	date.getDate();
	var hh = 	date.getHours();
	var mm = 	date.getMinutes();
	var ss = 	date.getSeconds();
	var m = 	date.getMilliseconds();

	var datestamp = "" 	+ YYYY + "/"
						 + MM + "/" 
						 + DD + " "  
						 + hh + ":" 
						 + mm + ":" 
						 + ss + ":"
						 + m;
	return datestamp;
}

function filterTodos(key, value) {
	console.log("Filter: " + key + ", " + value);
	console.log("key is " + typeof(key));
	console.log("value is " + typeof(value));
	var results = [];

	todos.forEach(function(todo) { 
		if (key in todo) {
			console.log("Found key " + key);
			console.log("value: " + todo[key]);
			if (todo[key].toString() === value) {
				console.log("found value match");
				results.push(todo);
			}	
		}
	});
	return results;
}

function createTodo(json) {
	var todo = {};
	todo.id = nextId;
	todo.description = json.description;
	todo.completed = false;
	todo.dateCreated = getFormattedDate(new Date());
	todo.dateCompleted = "";
	todos.push(todo);
	++nextId;
}


app.get('/', function(req, resp) {
	resp.send('To-do API root');
});


app.listen(PORT, function() {
	console.log("Server listening on port " + PORT + "...");
});

var today = getFormattedDate(new Date());

var todos = [
	{
		id: 0,
		description: "A thing that needs doing", 
		completed: false,
		dateCreated: today,
		dateCompleted: ""
	}, 
	{
		id: 1,
		description: "A procrastination task", 
		completed: false,
		dateCreated: today,
		dateCompleted: ""
	},
	{
		id: 2,
		description: "An added task", 
		completed: true,
		dateCreated: today,
		dateCompleted: today
	}
];

// GET /todos
// GET /todos?complete=true/false
app.get("/todos", reqCallbacks, function (req, resp) {
	var results = null;
	if (req.query.completed !== undefined) {
		results = filterTodos("completed", req.query.completed);
		resp.json(results);
	}  else {
		resp.json(todos);	
	}
});


// GET /todos/:id
app.get("/todos/:id", function (req, resp) {
	var reqId = parseInt(req.params.id);
	var match = _.findWhere(todos, {id: reqId});

	/*
	var match = null;
	todos.forEach( function(todo) {
		if(todo.id === reqId) {
			match = todo;
		}
	});
	*/
	resp.json(match);
});

// POST /todos
app.post("/todos", function(req, resp) {
	var body = _.pick(req.body, "description", "completed");

	if (!_.isBoolean(body.completed) || ! _.isString(body.description) || _.isEmpty(body.description)) {
		return resp.status(400).send();
	}

	createTodo(body);
	console.log(todos[(nextId - 1)]);
	resp.json(todos[(nextId - 1)]);
});

