module.exports = {
	logger: function(request, response, next) {
		console.log(
			"Request: " 
			+ new Date().toString() + " " 
			+ request.method + " " 
			+ request.originalUrl
		);
		next();
	},
	queryCompleted: function(request, response, next) {
		console.log("?completed: " + request.query.completed);
		if (request.query.completed === "true") {
			console.log("Showing only completed tasks");
		} else if (request.query.completed === "false") { 
			console.log("Showing only incomplete tasks");
		} else {
			console.log("Showing all tasks (default)");
		}
		next();
	}
}