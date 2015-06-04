(function (app) {
    'use strict';
    app.Utils = app.Utils || {};

    /**
     * Parse the input hash/querystring ('&paramName=value') into {paramName: value} object
     *
     * @param hash
     * @returns {object}
     */
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

    /**
     * Parse the input {paramName: value} object into querystring ('&paramName=value')
     *
     * @param object
     * @returns {string}
     */
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

})(MYSP);