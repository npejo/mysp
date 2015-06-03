(function(app) {
    'use strict';

    /**
     * Handles the rendering and actions of the login form
     *
     * @extends CoreView
     * @param options
     * @constructor
     */
    var LoginView = function(options) {
        // invoke the constructor of the parent object
        app.Views.CoreView.call(this, options);

        // injected dependencies
        this.auth = options.auth;
    };

    // chain the prototype of the parent object
    LoginView.prototype = Object.create(app.Views.CoreView.prototype);

    /**
     * Bind event actions on elements within the view
     */
    LoginView.prototype.addEventListeners = function() {
        var self = this;
        // bind click event to the login button
        this.addListener('#btn-login', 'click', function() {
            self.auth.login();
        });
    };

    /**
     * Return the main login page template as string
     *
     * @returns {string}
     */
    LoginView.prototype.getTemplate = function() {
        return '<div id="loginForm">' +
            '<div class="row mymp-login-wrapper">' +
                '<div class="col-1-3 text-right">' +
                    '<h1 class="mymp-login-logo">MY<br/>SP</h1>' +
                    '<h4>Welcome to <b>MY Spotify Player</b></h4>' +
                '</div>' +
                '<div class="col-2-3 text-center"><a id="btn-login" href="#"><h3>Login with Spotify</h3><br/><span class="spotify-logo"></div></a></span>' +
            '</div>' +
            '</div>';
    };

    app.Views.LoginView = LoginView;
})(MYMP);