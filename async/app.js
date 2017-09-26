
var weather = require('./weather.js');
var location = require('./location.js');

var argv = require('yargs')
	.options({
		location: {
			demand: false, 
			alias: 'l', 
			description: 'Location name', 
			type: 'string'
		}
	})
	.help('help')
	.argv;


function getLocationAndWeather() {
	location(function(location) {
		if (!location) { 
			console.log("Could not retrieve ip address");
			return;
		} 
		
		if (location.city === "" || typeof(location.city) === 'undefined') {
			console.log("City unknown");
			//HACK - force wellington for testing, because I can't get my current location from ipinfo
			location.city = "Wellington,nz";
			console.log("hacked: city: " + location.city); 
			//END HACK
			//return;
		}
		getWeather(location.city);
	});
}

function getWeather(location) {
	weather( location, function (currentWeather) {
		console.log(currentWeather);
	});
}

if (typeof(argv.location) === 'undefined' || argv.location === "") {
	getLocationAndWeather();
} 
else {
	getWeather(argv.location);
}




