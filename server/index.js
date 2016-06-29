var express = require('express');
var socketio = require('socket.io');
var http = require('http');
var path = require('path');

var port = 3000;
var app = express();
var server = http.Server(app);
var io = socketio(server);

app.use(express.static(path.join(__dirname, '/../public')));

app.get('*', function(req, res){
	res.sendFile(path.join(__dirname, '/../public/index.html'));
});

// server and routing
server.listen(port, function(error) {
	if (error) {
		console.error(error);
	} else {
		console.info('==> 🌎  Listening on port %s. Open up http://localhost:%s/ in your browser.', port, port);
	}
});