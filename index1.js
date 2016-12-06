const fs = require('fs');
const xlsx = require('node-xlsx');
var deepForEach = require('deep-for-each');

var enUS = require('./en-US.json');
var esMX = require('./es-MX.json');


var cloneEnUS = JSON.parse(JSON.stringify(enUS));

deepForEach(cloneEnUS, function (value, prop, subject, path) {
	if (value instanceof Object){
		return;
	}

	try {
		eval('cloneEnUS.' + path + ' = esMX.' + path);
	} catch(e){
		console.log('error', e);
	}

});


const workSheetsFromFile = xlsx.parse('file.xlsx');


workSheetsFromFile[0].data.forEach( el => {
	if (el[2]){
		var keysArray = el[0].split('$');
		console.log(keysArray);
		for (var i = 0; i < keysArray.length; i++){
			if (i !== 0){
				keysArray[i] = '["' + keysArray[i] + '"]';
			}
		}
		//var key = el[0].split('$').join('.');
		var key = keysArray.join('');
		console.log('key', key);
		eval('cloneEnUS.' + key + '=' + JSON.stringify(el[2]) + '');
	}
});





fs.writeFile('new-es-MX.json', JSON.stringify(cloneEnUS, null, 2), function (err) {
	if (err) {
		throw 'error opening file: ' + err;
	}

	console.log('file was written...');
});

