document.observe('dom:loaded', function() {
    $$('#bigbrother-sessions li a').each(function(item) {
        item.observe('click', function(event) {
            document.getElementById('bigbrother-player').src = event.target.href;
            event.stop();
        });
    });
});