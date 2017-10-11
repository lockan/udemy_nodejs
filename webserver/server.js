var express = require("express");
var app = express();

var LISTENPORT = 4000;

var middleware = require("./middleware.js");


//app.use(middleware.requireAuthentication);
app.use(middleware.logger);

app.get("/about", middleware.requireAuthentication, function(request, response) {
	response.send("About Us");
});


app.use(express.static(__dirname + "/public"));

var server = app.listen(LISTENPORT);
if (server != null) {
	console.log("Server listening on " + LISTENPORT);
}

