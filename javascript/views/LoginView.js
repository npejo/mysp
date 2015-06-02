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
        return '<div id="loginForm">Please login <button id="btn-login">Login</button></div>';
    };

    app.Views.LoginView = LoginView;
})(MYMP);