const http = require('http');
const fs = require('fs')

var wS = fs.createWriteStream('filePromise.json');

var getContent = function(url) {
	return new Promise((resolve, reject) => {
		var request = http.get(url, (response, error) => {
			var rawData = '';
			var parseData = {};
			response.on('data', (chuk) => {
				rawData += chuk;
				parseData = JSON.parse(rawData);
				var testObj = {};
				// console.log(testObj.length);
				for (var item in parseData) {
					if ((item === 'name' || item === 'gender' || item === 'homeworld' || item === 'films' || item === 'species' || item === 'url' || item === 'vehicles') && (parseData['vehicles'].length !== 0)) {
						testObj[item] = parseData[item]
					}
				}
				resolve(wS.write(JSON.stringify(testObj)));
				// resolve(wS.write(JSON.stringify(testObj)));
				// resolve(console.log());
			});
			response.on('end', () => {});
		});
		request.on('error', (error) => reject(error))
	});
}


for (var i = 1; i < 10; i++) {
	getContent('http://swapi.co/api/people/' + i + '/')
		.then((data) => {
			console.log('================');
			// console.log(data);
		})
		.catch(err => {
			console.log(err.message)
		});
}
