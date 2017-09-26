var apiKey = "26de61f9268fdd83f238aae32a78cabe";
var units = "metric";

var request = require('request');

// 'callback' is a callback function object which we've defined as an anon fn. 
// callback(currentWeather) takes a single string 'currentWeather' and outputs it. (see callback.js)
// Here our exported function takes in the callback as an arg and calls it as part of the function
module.exports = function (location, callback) {
	var baseurl = "http://api.openweathermap.org/data/2.5/weather";
	var url = baseurl 
		+ "?q=" + location 
		+ "&units=" + units 
		+ "&appid=" + apiKey;
	encodeURIComponent(url);
	request(
		{
			url: url, 
			json: true
		}, 
		function (error, response, body) {
			if (error) {
				callback("Unable to fetch weather");
			}
			else {
				callback("It's " + body.main.temp + " degrees in " + body.name);
			}
		}
	);
}