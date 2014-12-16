function respond(query, response) {
	console.log("Kicking off api handler");
	if(query){
		response.writeHead(200, {"Content-Type": "text/json"});
		console.log("Got a legit query");
		response.write(JSON.stringify(query, null, 2));
	} else {
		// Return 400 'Bad Response' because there are no query params
		response.writeHead(400, {"Content-Type": "text/text"});
		response.write("No query parameters\n");
	}
	response.end();
}

exports.respond = respond;
