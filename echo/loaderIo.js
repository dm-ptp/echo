var fs = require("fs");
var LOADERIO_VERIFICATION_FILE = 'external/loaderio.verify'

function validate(response) {
	response.writeHead(200, {"Content-Type": "text/plain"});
	f = fs.readFile(LOADERIO_VERIFICATION_FILE, 'utf8', function (error, data) {
		if (error) {
			response.write("Could not load loaderio verification data: " + error);
			response.end();
		} else {
			data = data.replace(/\n.*/, '');
			response.write(data); 
			console.log("Printing loaderio key: " + data);
			response.end();
		}
	});
}

exports.validate = validate;
