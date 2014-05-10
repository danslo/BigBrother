var server = require('http').Server();
var io = require('socket.io')(server);

io.on('connection', function(socket) {

	socket.on('initialize', function(data) {
		console.log('Initializing:', data);
		if (data.admin) {
			// For the admin, we join the user's session ID.
			console.log('Joining the user room');
			socket.join(data.admin);
		} else {
			// For the user, we just store our cookie.
			socket.cookie = data.cookie;
		}
	});

	socket.on('move', function(data) {
		console.log('Moving:', data);

		// Just broadcast it to everyone listening to our session.
		socket.broadcast.to(socket.cookie).emit('move', data);
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
