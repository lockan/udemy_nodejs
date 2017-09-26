
var weather = require('./weather.js');
var location = require('./location.js');

// Weather takes a callback fn as an arg. 
// Our callback is an anon function that takes a single string param 'currentWeather' and outputs it.
// The weather() function calls "callback" with the string arg. 
weather( function (currentWeather) {
	console.log(currentWeather);
});

location(function(location) {
	if (!location) { 
		console.log("Could not retrieve ip address");
		return;
	} 
	var city = location.city
	if (location.city === undefined || location.city === "") {
		city = "unknown"
	}

	console.log('city: ' + city);
	console.log('lat/long: ' + location.loc);
});
