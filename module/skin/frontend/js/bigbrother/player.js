if (typeof BigBrother === 'undefined') {
    var BigBrother = {};
}

BigBrother.Player = Class.create();
BigBrother.Player. prototype = {

    /**
     * Socket.IO object.
     */
    socket: null,

    /**
     * Move the mouse image.
     */
    onMove: function(data) {
        console.log(data);
    },

    /**
     * Adds a cursor image to the page.
     */
    createCursor: function() {
        var img = document.createElement('img');

        // TODO: Fix the absolute URL.
        img.src   = '../../images/bigbrother/cursor.png';
        
        img.style = 'position: absolute; top: 0px; left: 0px;';
        document.body.appendChild(img);
    },

    /**
     * Initialization.
     */
    initialize: function() {
        this.socket = io.connect('http://' + window.location.hostname + ':3000');

        // Create a cursor.
        this.createCursor();

        // Register on the backend.
        this.socket.emit('initialize', {

            // TODO: Authentication / Authorization.
            admin: 'pjcs3a1ijkifk42cks8o4daih4'
        });

        // Register our callbacks.
        this.socket.on('move', this.onMove.bind(this));
    }

};

Event.observe(window, 'load', function() {
    new BigBrother.Player();
});
