var apiKey = "26de61f9268fdd83f238aae32a78cabe";
var units = "metric";
var city = "Wellington,nz";
var url = "http://api.openweathermap.org/data/2.5/weather?q="+ city +"&units="+ units +"&appid=" + apiKey;

var request = require('request');

// 'callback' is a callback function object which we've defined as an anon fn. 
// callback(currentWeather) takes a single string 'currentWeather' and outputs it. (see callback.js)
// Here our exported function takes in the callback as an arg and calls it as part of the function
module.exports = function (callback) {
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