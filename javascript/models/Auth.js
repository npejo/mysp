(function(app) {
    'use strict';

    /**
     * Object that handles login, logout and maintains user session
     *
     * @param config
     * @constructor
     */
    var Auth = function(config) {
        this.clientId = config.clientId;
        this.authApiUrl = config.authApiUrl;
        this.authCallback = config.host + config.authCallback;
        this.authScopes = config.authScopes;
        this.appPrefix = config.appPrefix;
    };

    /**
     * Return the url string required to initializes oauth user authentication process
     * @returns {string}
     */
    Auth.prototype.buildAuthUrl = function() {
        return this.authApiUrl + '?' +
            'client_id=' + this.clientId +
            '&redirect_uri=' + encodeURIComponent(this.authCallback) +
            '&scope=' + encodeURIComponent(this.authScopes.join(' ')) +
            '&response_type=token';
    };

    /**
     * Trigger oauth user authentication process
     */
    Auth.prototype.login = function() {
        var url = this.buildAuthUrl();
        window.open(url,
            'Spotify',
            'menubar=no,location=no,resizable=no,scrollbars=no,status=no'
        );
    };

    /**
     * Destroy current user session and reload the page
     */
    Auth.prototype.logout = function() {
        this.setId('');
        this.setToken('');
        window.location.reload();
    };

    /**
     * Store the authentication token and expiration info in localStorage
     *
     * @param token
     * @param expires_in
     */
    Auth.prototype.setToken = function(token, expires_in) {
        localStorage.setItem(this.appPrefix + 'token', token);
        localStorage.setItem(this.appPrefix + 'expires', (new Date()).getTime() + expires_in);
    };

    /**
     * Return the stored authentication token
     * Return empty string if stored token is expired
     *
     * @returns {string}
     */
    Auth.prototype.getToken = function() {
        var expires = 0 + localStorage.getItem(this.appPrefix + 'expires') || 0;
        if ((new Date()).getTime() > expires) {
            return '';
        }
        var token = localStorage.getItem(this.appPrefix + 'token') || '';
        return token;
    };

    /**
     * Store the username passed on input in localStorage
     *
     * @param username
     */
    Auth.prototype.setId = function(username) {
        localStorage.setItem(this.appPrefix + 'id', username);
    };

    /**
     * Return the stored username
     *
     * @returns {string}
     */
    Auth.prototype.getId = function() {
        var username = localStorage.getItem(this.appPrefix + 'id') || '';
        return username;
    };

    /**
     * Add event listener to the global object that will wait for data from the oauth user authentication process
     * Parse the received message and if it is valid initialize session using the authentication information
     */
    Auth.prototype.addLoginCallbackListener = function() {
        var self = this;
        window.addEventListener("message", function(event) {
            var hash = JSON.parse(event.data);

            if (hash.type == 'access_token') {
                self.setToken(hash.access_token, hash.expires_in || 60);
            }

            // reload the page so the user will be redirected properly after auth data is parsed
            window.location.reload();
        }, false);
    };

    // attach Auth in the list of app models
    app.Models.Auth = Auth;
})(MYMP);