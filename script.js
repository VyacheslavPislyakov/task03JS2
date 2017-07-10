const http = require('http');
const fs = require('fs')
const url = 'http://swapi.co/api/people/';

var wS = fs.createWriteStream('file2.json');

for (var i = 1; i < 20; i++) {
	http.get(url + i + "/", (res) => {
		res.setEncoding('utf-8');
		let rawData = '';
		res.on('data', (chuk) => {
			rawData += chuk + '\n';
			var parseData = JSON.parse(rawData);
			console.log(parseData);
			for (var item in parseData) {
				if (item === 'vehicles' && parseData[item].length !== 0){
					var testObj = {};
					for (var item in parseData) {
						if (item === 'name' || item === 'gender' || item === 'homeworld' || item === 'films' || item === 'species' || item === 'url' || item === 'vehicles') {
							testObj[item] = parseData[item]
						}
					}
					wS.write(JSON.stringify(testObj));
				}
			}

		});
		res.on('end', () => {
			
		})
	}).on('error', (e) => {
		console.error('Got error: ${e.message}');
	})
}
