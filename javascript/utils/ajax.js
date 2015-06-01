(function(app) {
    'use strict';
    app.Utils = app.Utils || {};
    app.Utils.ajax = {};

    app.Utils.ajax.get = function(params, success, error) {
        params.method = 'GET';
        makeRequest(params, success, error);
    };

    app.Utils.ajax.post = function(params, success, error) {
        params.method = 'POST';
        params.data = params.data ? JSON.stringify(params.data) : '';
        makeRequest(params, success, error);
    };

    app.Utils.ajax.put = function(params, success, error) {
        params.method = 'PUT';
        params.data = params.data ? JSON.stringify(params.data) : '';
        makeRequest(params, success, error);
    };

    app.Utils.ajax.delete = function(params, success, error) {
        params.method = 'DELETE';
        params.data = params.data ? JSON.stringify(params.data) : '';
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
            if ((xhr.status === 200 || xhr.status === 201)
                && typeof successCallback === 'function') {

                var resp = xhr.responseText !== '' ? JSON.parse(xhr.responseText) : '';
                successCallback(resp, xhr);

            } else if (typeof errorCallback === 'function') {
                var resp = xhr.responseText !== '' ? JSON.parse(xhr.responseText) : '';

                var error = resp.error;
                var msg = error.status + ': ' + error.message;

                errorCallback(new Error(msg));
            }
        };

        if (params.data) {
            console.log(params.data);
            xhr.send(params.data);
        } else {
            xhr.send();
        }
    }

})(MYMP);