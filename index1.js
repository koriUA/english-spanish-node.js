const fs = require('fs');
const xlsx = require('node-xlsx');
var enUS = require('./en-US.json');
var esMX = require('./es-MX.json');

const workSheetsFromFile = xlsx.parse('file.xlsx');


workSheetsFromFile[0].data.forEach( el => {
	if (el[2]){
		var key = el[0].split('$').join('.');
		eval('esMX.' + key + '=' + JSON.stringify(el[2]) + '');
	}
});




fs.writeFile('new-es-MX.json', JSON.stringify(esMX, null, 2), function (err) {
	if (err) {
		throw 'error opening file: ' + err;
	}

	console.log('file was written...');
});

