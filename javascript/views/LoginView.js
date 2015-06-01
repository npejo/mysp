/**
 *
 */
(function(app) {
    'use strict';

    var LoginView = function(options) {
        app.Views.CoreView.call(this, options);

        // injected dependencies
        this.auth = options.auth;
    };

    LoginView.prototype = Object.create(app.Views.CoreView.prototype);

    LoginView.prototype.addEventListeners = function() {
        var that = this;
        document.getElementById('btn-login')
            .addEventListener('click', function() {
                that.auth.login();
            });
    };

    LoginView.prototype.getTemplate = function() {
        return '<div id="loginForm">Please login <button id="btn-login">Login</button></div>';
    };

    app.Views.LoginView = LoginView;
})(MYMP);