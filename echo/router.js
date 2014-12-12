function route(pathname) {
	if(pathname.substr(1,11) == 'favicon.ico') { return 'favicon' };
	console.log("Routing request to " + pathname);
	if(pathname.substr(1).match(/^api/)) { return 'api' };
	return 'no route';
}

exports.route = route;
