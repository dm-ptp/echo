var fs = require("fs");
var http = require("http");
var url = require("url");
var LOADERIO_VERIFICATION_FILE = 'external/loaderio.verify'

function start(route) {
	function onRequest(request, response) {
		var requested = url.parse(request.url, true);
		var pathname = requested.pathname;
		var query = requested.query;
		console.log("Request for " + pathname + " received.");

		var handler = route(pathname);
		console.log("Calling handler for " + handler);


		if(handler == 'no route'){
			response.writeHead(200, {"Content-Type": "text/plain"});
			response.write("No route found for " + pathname + "\n");
			response.end();
		} else if(handler == 'favicon'){
		} else if(handler == 'loaderio'){
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
		} else if(handler == 'api'){
			response.writeHead(200, {"Content-Type": "text/json"});
			console.log("Kicking off api handler");
			if(query){
				console.log("Got a legit query");
				response.write(JSON.stringify(query, null, 2));
			} else { response.write("No query parameters\n") };
			response.end();
		} else {
			response.write("Error getting response from router.\n");
			response.end();
		};

	}

	http.createServer(onRequest).listen(8888);
	console.log("Server has started.");
}

exports.start = start;
