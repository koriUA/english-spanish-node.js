var deepForEach = require('deep-for-each');

var fs = require('fs');
var xlsx = require('node-xlsx');
var enUS = require('./en-US.json');
var esMX = require('./es-MX.json');

var result = [];




deepForEach(enUS, function (value, prop, subject, path) {
	if (value instanceof Object){
		return;
	}
	var temporaryValue = null;
	try {
		var temporaryValue = eval('esMX.' + path);
		if (temporaryValue){	//for only there are no spanish translations;
			return;
		}

		result.push([
			path.split('.').join('$'),
			value,
			temporaryValue || ''
		]);
	} catch(e){
		result.push([
			path.split('.').join('$'),
			value,
			temporaryValue || ''
		]);
	}
});

var buffer = xlsx.build([{name: "language-export", data: result}]);

fs.open('file.xlsx', 'w', function(err, fd) {
    if (err) {
        throw 'error opening file: ' + err;
    }

    fs.write(fd, buffer, 0, buffer.length, null, function(err) {
        if (err) throw 'error writing file: ' + err;
        fs.close(fd, function(err) {
        	if (err) {
		        throw 'error closing file: ' + err;
		    }
            console.log('file written');
        })
    });
});

