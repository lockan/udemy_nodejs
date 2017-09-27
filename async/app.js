
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

if (typeof(argv.location) === 'undefined' || argv.location === "") {
	location()
	.then(
		function (location) {
			return weather(location);
		}
	)
	.then(
		function (message) {
			console.log(message);
		}
	)

} 
else {
	weather(argv.location)
	.then(
		function (message) {
			console.log(message);
		}
	)
}




