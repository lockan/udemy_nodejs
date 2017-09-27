var request = require('request');
var apiKey = "26de61f9268fdd83f238aae32a78cabe";
var baseurl = "http://api.openweathermap.org/data/2.5/weather";
var units = "metric";

/*
function doWork(data, callback) {
	callback('done work');
}

function doWorkPromise(data) {
	return new Promise(function (resolve, reject) {
		setTimeout(function() {
			//resolve('everything fine');	
			reject('everything is awful!');
		}, 1000);	
		//reject({
		//	error: 'EVERYTHING IS AWFUL!'
		//});
		
	});
}

doWorkPromise("somestuff").then( 
	function(data) {
		console.log(data);
	},
	function(error) {
		console.log(error);
	}
);
*/

function getWeather(location) {
	//return promise
	return new Promise( function (resolve, reject) {
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
					reject("Unable to fetch weather");
				}
				else {
					resolve("It's " + body.main.temp + " degrees in " + body.name);
				}
		}); 
	});
}


getWeather('paris').then(function(currentWeather) {
	console.log(currentWeather);
}, function (error) {
	console.log(error);
});