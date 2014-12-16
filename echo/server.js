var fs = require("fs");
var http = require("http");
var url = require("url");
var apiStub = require("./apiStub");
var loaderIo = require("./loaderIo");

function start(route) {
	function onRequest(request, response) {
		// Pull necessary info from the received request
		var requested = url.parse(request.url, true);
		var pathname = requested.pathname;
		var query = requested.query;
		console.log("Request for " + pathname + " received.");

		// Identify the correct handler 
		// TODO: Router should be calling functions not returning strings
		var handler = route(pathname);
		console.log("Calling handler for " + handler);

		// No route = GTFO
		if(handler == 'no route'){
			response.writeHead(200, {"Content-Type": "text/plain"});
			response.write("No route found for " + pathname + "\n");
			response.end();
		} else if(handler == 'favicon'){
		} else if(handler == 'loaderio'){
			// Send loader.io validation code (generally stored in external/loaderio.verify)
			loaderIo.validate(response);
		} else if(handler == 'api'){
			// Send API stub response
			apiStub.respond(query, response);
		} else {
			response.write("Error getting response from router.\n");
			response.end();
		};
	}

	// Start server
	http.createServer(onRequest).listen(8888);
	console.log("Server has started.");
}

exports.start = start;
