// function doWork(shouldFail) {
// 	return new Promise( function (resolve, reject) {
// 		setTimeout(function () {
// 			console.log('done');
// 			(!shouldFail) ? resolve("success") : reject("Fail bool set to true");
// 		}, 1000);
// 	});
// }

// doWork().then(function(message) {
// 	console.log(message);
// 	return doWork(true);
// }).then(function (message) {
// 	console.log(message);
// }).catch( function (error) {
// 	console.log(error);
// });

var weather = require('./weather.js');
var location = require('./location.js');

function getLocation() {
	return new Promise( function(resolve, reject) {
		var loc = location(function (loc) {
				return loc;
			});
		//HACK - because I can't get my location
		loc = "Wellington,nz";
		//END HACK
		console.log("Location: " + loc);
		if(!loc) {
			reject("Could not get location");
		} else {
			resolve(loc);
		}
	});
}

function getWeather(location) {
	//return promise
	console.log("Trying to get weather for: " + location);
	return new Promise( function (resolve, reject) {
		if (location) {
			//console.log("resolve");
			resolve("It's 1,000,000,000 in " + location);	
		} else {
			//console.log("reject");
			reject("Could not get weather for " + location);
		}
	});
}

getLocation()
.then(
	function (location) {
		return getWeather(location);
	}
)
.then( function (currentWeather) {
		console.log(currentWeather);
	}
)
.catch(function(error) {
	console.log(error);
});