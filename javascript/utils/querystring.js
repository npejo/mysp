(function (app) {
    'use strict';
    app.Utils = app.Utils || {};

    app.Utils.hashToObject = function (hash) {
        var obj = {};

        if (hash.indexOf('#') === 0) {
            hash = hash.substr(1);
        }

        hash.split('&').forEach(function (kv) {
            var split = kv.indexOf('=');
            if (split != -1) {
                obj[kv.substring(0, split)] = decodeURIComponent(kv.substring(split + 1));
            }
        });

        return obj;
    };

    app.Utils.objToQuerystring = function (object) {
        var encodedString = '';
        for (var prop in object) {
            if (object.hasOwnProperty(prop)) {
                if (encodedString.length > 0) {
                    encodedString += '&';
                }
                encodedString += encodeURI(prop + '=' + object[prop]);
            }
        }
        return encodedString;
    };

})(MYMP);