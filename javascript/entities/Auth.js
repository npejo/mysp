(function(app) {
    'use strict';

    var Auth = function(config) {
        this.clientId = config.clientId;
        this.authApiUrl = config.authApiUrl;
        this.authCallback = config.host + config.authCallback;
        this.authScopes = config.authScopes;
        this.appPrefix = config.appPrefix;
    };

    Auth.prototype.buildAuthUrl = function() {
        return this.authApiUrl + '?' +
            'client_id=' + this.clientId +
            '&redirect_uri=' + encodeURIComponent(this.authCallback) +
            '&scope=' + encodeURIComponent(this.authScopes.join(' ')) +
            '&response_type=token';
    };

    Auth.prototype.login = function() {
        var url = this.buildAuthUrl();
        window.open(url,
            'Spotify',
            'menubar=no,location=no,resizable=no,scrollbars=no,status=no'
        );
    };

    Auth.prototype.logout = function() {
        this.setId('');
        this.setToken('');
        window.location.reload();
    };

    Auth.prototype.setToken = function(token, expires_in) {
        localStorage.setItem(this.appPrefix + 'token', token);
        localStorage.setItem(this.appPrefix + 'expires', (new Date()).getTime() + expires_in);
    };

    Auth.prototype.getToken = function() {
        var expires = 0 + localStorage.getItem(this.appPrefix + 'expires') || 0;
        if ((new Date()).getTime() > expires) {
            return '';
        }
        var token = localStorage.getItem(this.appPrefix + 'token') || '';
        return token;
    };

    Auth.prototype.getId = function() {
        var username = localStorage.getItem(this.appPrefix + 'id') || '';
        return username;
    };

    Auth.prototype.setId = function(username) {
        localStorage.setItem(this.appPrefix + 'id', username);
    };

    Auth.prototype.addLoginCallbackListener = function() {
        var that = this;
        window.addEventListener("message", function(event) {
            console.log('got postmessage', event);
            var hash = JSON.parse(event.data);
            if (hash.type == 'access_token') {
                that.setToken(hash.access_token, hash.expires_in || 60);
                window.location.reload();
            }
        }, false);
    };

    app.Entities.Auth = Auth;
})(MYMP);