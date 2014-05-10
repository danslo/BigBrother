BigBrother = Class.create();
BigBrother.prototype = {

    /**
     * Timestamp when the page was loaded.
     *
     * @type {Number}
     */
    timeOffset: 0,

    /**
     * Socket.IO object.
     */
    socket: null,

    /**
     * Gets the current timestamp.
     *
     * @returns {Number}
     */
    getTimestamp: function() {
        return new Date().getTime();
    },

    /**
     * Log an event.
     *
     * @param {String} type
     * @param {Object} data
     */
    logEvent: function(type, data) {
        data.time = this.getTimestamp() - this.timeOffset;
        this.socket.emit(type, data);
    },

    /**
     * Click event.
     *
     * @param {Object} event
     */
    onClick: function(event) {
        this.logEvent('click', { x: event.x, y: event.y });
    },

    /**
     * Move event.
     *
     * @param {Object} event
     */
    onMove: function(event) {
        this.logEvent('move', { x: event.x, y: event.y });
    },

    /**
     * Unload event.
     */
    onUnload: function() {
        this.logEvent('unload', {});
    },

    /**
     * Scroll event.
     *
     * @param {Object} event
     */
    onScroll: function(event) {
        this.logEvent('scroll', { x: window.pageXOffset, y: window.pageYOffset });
    },

    initialize: function() {
        // Initialize on frontend side.
        this.timeOffset = this.getTimestamp();
        this.socket = io.connect('http://' + window.location.hostname + ':3000');

        // Initialize on backend side.
        this.socket.emit('initialize', {
            cookie: document.cookie,
            url: window.location.href
        });

        // Register our callbacks.
        Event.observe(document, 'mousedown', this.onClick.bind(this));
        Event.observe(document, 'mousemove', this.onMove.bind(this));
        Event.observe(window, 'beforeunload', this.onUnload.bind(this));
        Event.observe(window, 'scroll', this.onScroll.bind(this));
    }
};

Event.observe(window, 'load', function() {
    new BigBrother();
});
