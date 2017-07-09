const http = require('http');
const fs = require('fs')
const url = 'http://swapi.co/api/people/';

var wS = fs.createWriteStream('file2.json');

for (var i = 1; i < 10; i++) {
	http.get(url + i + "/", (res) => {
		res.setEncoding('utf-8');
		let rawData = '';
		res.on('data', (chuk) => {
			rawData += chuk + '\n';
			var parseData = JSON.parse(rawData);
			wS.write(rawData);
		});
		res.on('end', () => {
			wS.write('\n');
		})
	}).on('error', (e) => {
		console.error('Got error: ${e.message}');
	})
}
