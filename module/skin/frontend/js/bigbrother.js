BigBrother = Class.create();
BigBrother.prototype = {

    timeOffset: 0,
    currentUrl: '',

    getTimestamp: function() {
        return new Date().getTime();
    },

    logEvent: function(type, data) {
        data.time = this.getTimestamp() - this.timeOffset;
        console.log(type, data);
    },

    initialize: function() {
        this.timeOffset = this.getTimestamp();
        this.currentUrl = window.location.pathname;

        Event.observe(document, 'mousedown', function(event) {
            this.logEvent('click', { x: event.x, y: event.y });
        }.bind(this));
        Event.observe(document, 'mousemove', function(event) {
            this.logEvent('move', { x: event.x, y: event.y });
        }.bind(this));
    }

};

Event.observe(window, 'load', function() {
    new BigBrother();
});
