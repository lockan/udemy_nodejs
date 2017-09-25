
var weather = require('./weather.js');

// Weather takes a callback fn as an arg. 
// Our callback is an anon function that takes a single string param 'currentWeather' and outputs it.
// The weather() function calls "callback" with the string arg. 
weather( function (currentWeather) {
	console.log(currentWeather);
});

/*
request(
	{
		url: url, 
		json: true
	}, 
	function (error, response, body) {
		if (error) {
			console.log("Unable to fetch weather");
		}
		else {
			//console.log(JSON.stringify(body, null, 4));
			console.log("It's " + body.main.temp + " degrees in " + city);
		}
	}
);

*/

//weather();