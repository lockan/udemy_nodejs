var request = require('request');

//TODO: toggle between localhost and live somehow
var testUrl = "http://udemy-todo-lockan.herokuapp.com:4000/todos/";

beforeAll( () => {
  console.log("Running tests...");
});

// GET /todos
test("GET", () => {
	doGet(testUrl)
	.then( function (response) {
		expect(statusIsOK(response.statusCode)).toBe(true);
	});
});

// GET /todos?complete=true

// GET /todos?complete=false

// GET /todos/:id

// POST /todos

// PUT /todos/:id

// DELETE /todos/:id

afterAll( () => {
  console.log("Tests complete");
});


function doGet(url) {
	return new Promise ( function(resolve, reject) {
		request.get("http://www.google.com")
		.on('error', function(err) { 
			console.log(err);
			reject(err);
		})
		.on('response', function (resp) { 
			resolve(resp);
		});
	});
}

function doPost(url, payload) { 
	return true; //TODO: implement me
}

function doPut(url, payload) { 
	return true; //TODO: implement me
}


function statusIsOK(code) { 
	return (code == '200');
}