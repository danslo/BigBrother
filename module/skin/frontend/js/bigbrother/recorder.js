if (typeof BigBrother === 'undefined') {
    var BigBrother = {};
}

BigBrother.Recorder = Class.create();
BigBrother.Recorder.prototype = {

    /**
     * Timestamp when the page was loaded.
     *
     * @type {Number}
     */
    timeStamp: 0,

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
    emitEvent: function(type, data) {
        data.time = this.getTimestamp() - this.timeStamp;
        this.socket.emit(type, data);
    },

    /**
     * Click event.
     *
     * @param {Object} event
     */
    onClick: function(event) {
        this.emitEvent('click', { x: event.pageX, y: event.pageY });
    },

    /**
     * Move event.
     *
     * @param {Object} event
     */
    onMove: function(event) {
        this.emitEvent('move', { x: event.pageX, y: event.pageY });
    },

    /**
     * Unload event.
     */
    onUnload: function() {
        this.emitEvent('unload', {});
    },

    /**
     * Scroll event.
     */
    onScroll: function() {
        this.emitEvent('scroll', { x: window.pageXOffset, y: window.pageYOffset });
    },

    /**
     * Gets the frontend cookie.
     *
     * @returns {String}
     */
    getFrontendSession: function() {
        return Cookie.get('frontend');
    },

    /**
     * Initialization.
     */
    initialize: function() {
        // Initialize on frontend side.
        this.timeStamp = this.getTimestamp();
        this.socket = io.connect('http://' + window.location.hostname + ':3000');

        // Initialize on backend side.
        this.socket.emit('initialize', {
            session: this.getFrontendSession(),
            url: window.location.href,
            timeStamp: this.timeStamp
        });

        // Register our callbacks.
        Event.observe(document, 'mousedown', this.onClick.bind(this));
        Event.observe(document, 'mousemove', this.onMove.bind(this));
        Event.observe(window, 'beforeunload', this.onUnload.bind(this));
        Event.observe(window, 'scroll', this.onScroll.bind(this));
    }
};

Event.observe(window, 'load', function() {
    new BigBrother.Recorder();
});
