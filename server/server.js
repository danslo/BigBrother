var server = require('http').Server();
var io = require('socket.io')(server);

io.on('connection', function(socket) {
	socket.on('initialize', function(data) {
		console.log('Initializing:', data);
	});

	socket.on('move', function(data) {
		console.log('Moving:', data);
	});

	socket.on('scroll', function(data) {
		console.log('Scrolling:', data);
	});

	socket.on('unload', function(data) {
		console.log('Unloading:', data);
	});

	socket.on('click', function(data) {
		console.log('Clicking:', data);
	});

	socket.on('disconnect', function() {
		console.log('User disconnected');
	});
});

server.listen(3000);
