(function(app) {
    'use strict';
    app.Utils = app.Utils || {};
    app.Utils.ajax = {};

    app.Utils.ajax.get = function(params, success, error) {
        params.method = 'GET';
        params.data = encodeURI(params.data);
        makeRequest(params, success, error);
    };

    app.Utils.ajax.post = function(params, success, error) {
        params.method = 'POST';
        params.data = params.data ? encodeURI(params.data) : '';
        makeRequest(params, success, error);
    };

    app.Utils.ajax.put = function(params, success, error) {
        params.method = 'PUT';
        params.data = params.data ? encodeURI(params.data) : '';
        makeRequest(params, success, error);
    };

    app.Utils.ajax.delete = function(params, success, error) {
        params.method = 'DELETE';
        makeRequest(params, success, error);
    };

    function setHeaders(xhr, headersObj) {
        for (var hName in headersObj) {
            if (headersObj.hasOwnProperty(hName)) {
                xhr.setRequestHeader(hName, headersObj[hName]);
            }
        }
    }

    function makeRequest(params, successCallback, errorCallback) {
        var xhr = new XMLHttpRequest();

        var url = (params.url.indexOf('https') === -1)
            ? app.Config.apiBaseURL + params.url
            : params.url;

        xhr.open(params.method, encodeURI(url));

        xhr.setRequestHeader('Content-Type', 'application/json');
        xhr.setRequestHeader('Authorization', 'Bearer ' + app.Utils.ajax.token);

        if (params.headers) {
            setHeaders(xhr, params.headers);
        }

        xhr.onload = function() {
            if (xhr.status === 200 && typeof successCallback === 'function') {
                successCallback(JSON.parse(xhr.responseText), xhr);
            }
            else if (typeof errorCallback === 'function') {
                var error = JSON.parse(xhr.responseText).error;
                var msg = params.errMsg || error.status + ': ' + error.message;
                errorCallback(new Error(msg));
            }
        };

        if (params.data) {
            xhr.send(params.data);
        } else {
            xhr.send();
        }
    }

})(MYMP);