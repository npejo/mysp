(function(app) {
    'use strict';
    app.Utils = app.Utils || {};
    app.Utils.ajax = {};

    /**
     * Perform GET XmlHttpRequest request with given parameters
     *
     * @param params
     * @param success
     * @param error
     */
    app.Utils.ajax.get = function(params, success, error) {
        params.method = 'GET';
        makeRequest(params, success, error);
    };

    /**
     * Perform POST XmlHttpRequest request with given parameters and data
     *
     * @param params
     * @param success
     * @param error
     */
    app.Utils.ajax.post = function(params, success, error) {
        params.method = 'POST';
        params.data = params.data ? JSON.stringify(params.data) : '';
        makeRequest(params, success, error);
    };

    /**
     * Perform PUT XmlHttpRequest request with given parameters and data
     *
     * @param params
     * @param success
     * @param error
     */
    app.Utils.ajax.put = function(params, success, error) {
        params.method = 'PUT';
        params.data = params.data ? JSON.stringify(params.data) : '';
        makeRequest(params, success, error);
    };

    /**
     * Perform DELETE XmlHttpRequest request with given parameters and data
     *
     * @param params
     * @param success
     * @param error
     */
    app.Utils.ajax.delete = function(params, success, error) {
        params.method = 'DELETE';
        params.data = params.data ? JSON.stringify(params.data) : '';
        makeRequest(params, success, error);
    };

    /**
     * Handle any kind of XmlHttpRequest request depending on the input parameters
     * Invoke the `successCallback` or `errorCallback` depending on the result of the request
     *
     * @param params
     * @param successCallback
     * @param errorCallback
     */
    function makeRequest(params, successCallback, errorCallback) {
        var xhr = new XMLHttpRequest();

        // build the full url for the request
        // use the `apiBaseUrl` property set in configuration as default host
        // override it if the host is explicitly in the parameters
        var url = (params.url.indexOf('https') === -1)
            ? app.Config.apiBaseURL + params.url
            : params.url;

        xhr.open(params.method, encodeURI(url));

        // add the following headers to all requests
        xhr.setRequestHeader('Content-Type', 'application/json');
        xhr.setRequestHeader('Authorization', 'Bearer ' + app.Utils.ajax.token);

        // append the extra headers specified in parameters
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

    /**
     * Loop each of the keys in the input `headersObj` object and append the HTTP header to the prepared XHR
     * @param xhr
     * @param headersObj
     */
    function setHeaders(xhr, headersObj) {
        for (var hName in headersObj) {
            if (headersObj.hasOwnProperty(hName)) {
                xhr.setRequestHeader(hName, headersObj[hName]);
            }
        }
    }

})(MYMP);