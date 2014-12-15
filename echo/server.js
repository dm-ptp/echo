var http = require("http");
var url = require("url");

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
		} else if(handler == 'favicon'){
		} else if(handler == 'tmp'){
			response.writeHead(200, {"Content-Type": "text/plain"});
			response.write("sall good\n");
		} else if(handler == 'api'){
			response.writeHead(200, {"Content-Type": "text/json"});
			console.log("Kicking off api handler");
			if(query){
				console.log("Got a legit query");
				response.write(JSON.stringify(query, null, 2));
			} else { response.write("No query parameters\n") };
		} else {
			response.write("Error getting response from router.\n");
		};

		response.end();
	}

	http.createServer(onRequest).listen(8888);
	console.log("Server has started.");
}

exports.start = start;
