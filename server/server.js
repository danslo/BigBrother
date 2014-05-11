var server = require('http').Server();
var io = require('socket.io')(server);

// TODO: Totally get these creds from somewhere else.
var mysql = require('mysql');
var pool = mysql.createPool({
    host: "localhost",
    user: "root",
    password: "",
    database: "bigbrother"
});

// Room to URL lookup.
var roomUrls = {};

io.on('connection', function(socket) {

    socket.on('initialize', function(data) {
        console.log('Initializing:', data);
        if (data.admin) {
            // For the admin, we join the user's session ID.
            console.log('Joining the user room');
            socket.join(data.admin);
        } else {
            // For the user, we just store some data.
            socket.cookie = data.cookie;
            roomUrls[socket.cookie] = data.url;

            // Insert the session ID so we can grab it in Magento.
            pool.getConnection(function(err, connection) {
                connection.query("insert into bigbrother_session(session_id, created_at) values('" + socket.cookie + "', NOW())");
                connection.release();
            });

            // TODO: Fix the such_secure.
            socket.broadcast.to(socket.cookie).emit('navigate', { url: data.url + '?bigbrother=such_secure' });
        }
    });

    socket.on('move', function(data) {
        console.log('Moving:', data);

        // Just broadcast it to everyone listening to our session.
        socket.broadcast.to(socket.cookie).emit('move', data);
    });

    socket.on('scroll', function(data) {
        console.log('Scrolling:', data);
        socket.broadcast.to(socket.cookie).emit('scroll', data);
    });

    socket.on('unload', function(data) {
        console.log('Unloading:', data);
    });

    socket.on('click', function(data) {
        console.log('Clicking:', data);
        socket.broadcast.to(socket.cookie).emit('click', data);
    });

    socket.on('disconnect', function() {
        console.log('User disconnected');
        if (typeof socket.cookie !== 'undefined') {
            pool.getConnection(function(err, connection){
                connection.query("delete from bigbrother_session where session_id = '" + socket.cookie + "'");
                connection.release();
             });
        }
    });

});

server.listen(3000);
