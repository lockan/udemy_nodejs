var url = 'http://ipinfo.io'

var request = require('request');

module.exports = function () {
	return new Promise( function (resolve, reject) {
		request(
			{
				url: url, 
				json: true
			}, 
			function (error, response, body) {
				if (error) {
					reject(error);
				}
				else {
					if(!body.city) {
						//reject("city unknown");
						//HACK - because can't retrieve Wellington
						resolve("Wellington,nz");

					} else {
						resolve(body.city);	
					}
				}
			}
		);
	});
}