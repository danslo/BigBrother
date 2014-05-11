var Cookie = {

    get: function(name) {
        var cookies = document.cookie.split(';');
        for (var i = 0; i < cookies.length; i++) {
            var parts = cookies[i].trim().split('=');
            if (parts[0] === name) {
                return parts[1];
            }
        }
        return null;
    },

    set: function(name, data) {
        document.cookie = name + '=' + data + ';' + document.cookie;
    }

};