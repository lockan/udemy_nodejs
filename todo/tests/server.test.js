var request = require('request');

//TODO: toggle between localhost and live somehow
var testUrl = "https://udemy-todo-lockan.herokuapp.com/todos";

beforeAll( () => {
  console.log("Running tests...");
});

// GET /todos
test("GET /todos", () => {
	return doGet(testUrl)
	.then( function (response) {
		expect(queryHasItems(response)).toBe(true);
	});
});

// GET /todos?complete=true
test("GET /todos?complete=true", () => { 
	return doGet(testUrl + "?completed=true")
	.then( function (response) {
		expect(queryHasItems(response)).toBe(false);
	});
});

// GET /todos?complete=false
test("GET /todos?complete=false", () => { 
	return doGet(testUrl + "?completed=false")
	.then( function (response) {
		expect(queryHasItems(response)).toBe(true);
	});
});

// GET /todos/:id
test("GET /todos?id=1", () => { 
	return doGet(testUrl + "?id=1")
	.then( function (response) {
		expect(queryHasItems(response)).toBe(true);
	});
});

// POST /todos
test("POST /todos", () => {
	var todo = { 
		"description": "New Item added by unit test",
		"completed": false
	};
	return doPost(testUrl, todo)
	.then( function (response) {
		expect(queryHasItems(response)).toBe(true);
	});
});

// PUT /todos/:id

// DELETE /todos/:id

afterAll( () => {
	console.log("Tests complete");
});

function doGet(url) {
	return new Promise ( function(resolve, reject) {
		request.get(url, (err, resp, data) => { 
			if(err) { 
				console.log(err);
				reject(err);
			};
			if(data !== undefined && resp.statusCode == 200) {
				resolve(data);	
			} else { 
				reject(undefined);
			}
		});
	});
}

function doPost(url, payload) { 
	return new Promise(function (resolve, reject) { 
			var options = { 
				url: url,
				json: payload, 
			}

		request.post(options, (err, resp, data) => {
			if (err) { 
				console.log(err);
				reject(err);
			};
			if(data !== undefined && resp.statusCode == 200) { 
				resolve(data);	
			} else { 
				reject(undefined);
			}
		});
	});
}

function doPut(url, payload) { 
	return true; //TODO: implement me
}

function queryHasItems(data) {
	var items = [];
	if (typeof(data) === "string") { 
		items = JSON.parse(data);
	} else { 
		items = data;
	}
	return (data !== undefined && items.length !== 0);
}

function returnCodeIsOkay(code) {
	return code == '200';
}