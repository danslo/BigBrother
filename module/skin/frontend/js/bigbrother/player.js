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
     *
     * @param {Object} data
     */
    onMove: function(data) {
        var cursor = document.getElementById('bigbrother_cursor');
        cursor.style.left = data.x + 'px';
        cursor.style.top  = data.y + 'px';
    },

    /**
     * Navigate to page.
     *
     * @param {Object} data
     */
    onNavigate: function(data) {
        window.location.href = data.url;
    },

    /**
     * Adds a cursor image to the page.
     */
    createCursor: function() {
        var img = document.createElement('img');
        // TODO: Fix the absolute URL.
        img.src = 'http://bigbrother.dev:8080/skin/frontend/base/default/images/bigbrother/cursor.png';
        img.style.position = 'absolute';
        img.style.left = '0px';
        img.style.top  = '0px';
        img.style.zIndex = '10000';
        img.id = 'bigbrother_cursor';
        document.body.appendChild(img);
    },

    /**
     * Scroll the window.
     *
     * @param {Object} data
     */
    onScroll: function(data) {
        // Scroll the window.
        // TODO: Update the relative mouse position too.
        window.scrollTo(data.x, data.y);
    },

    onClick: function(data) {
        // Just insert an indicator.
        // TODO: Fix the absolute URL.
        var img = document.createElement('img');
        img.src = 'http://bigbrother.dev:8080/skin/frontend/base/default/images/bigbrother/circle.png';
        img.style.position  = 'absolute';
        img.style.left      = (data.x - 15) + 'px';
        img.style.top       = (data.y - 15) + 'px';
        img.id              = 'bigbrother_circle';
        document.body.appendChild(img);
        Effect.Fade(img);
    },

    /**
     * Gets the frontend cookie.
     *
     * @returns {String}
     */
    getFrontendCookie: function() {
        var params = document.URL.toQueryParams();
        // Check for query param first.
        if (typeof params.bigbrother !== 'undefined') {
            var cookie = params.bigbrother;
            Cookie.set('bigbrother', cookie);
            return cookie;
        }
        // Otherwise it might be in the cookie.
        else {
            return Cookie.get('bigbrother');
        }
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
            admin: this.getFrontendCookie()
        });

        // Use the same session.
        Cookie.set('frontend',  this.getFrontendCookie());

        // Register our callbacks.
        this.socket.on('move', this.onMove.bind(this));
        this.socket.on('navigate', this.onNavigate.bind(this));
        this.socket.on('scroll', this.onScroll.bind(this));
        this.socket.on('click', this.onClick.bind(this));
    }

};

Event.observe(window, 'load', function() {
    new BigBrother.Player();
});
