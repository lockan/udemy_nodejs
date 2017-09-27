var apiKey = "26de61f9268fdd83f238aae32a78cabe";
var units = "metric";

var request = require('request');

module.exports = function (location) {
	var baseurl = "http://api.openweathermap.org/data/2.5/weather";
	var url = baseurl 
		+ "?q=" + location 
		+ "&units=" + units 
		+ "&appid=" + apiKey;
	encodeURIComponent(url);
	return new Promise ( function(resolve, reject) {
		request(
			{
				url: url, 
				json: true
			}, 
			function (error, response, body) {
				if (error) {
					reject("Unable to fetch weather");
				}
				else {
					resolve("It's " + body.main.temp + " degrees in " + body.name);
				}
			}
		);
	});
}