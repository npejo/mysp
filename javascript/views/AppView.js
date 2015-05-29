/**
 *
 */
(function(app) {
    'use strict';

    var AppView = function(options) {
        app.Views.CoreView.call(this, options);
        this.auth = options.auth;
        this.subViews = options.subViews || {};
    };

    AppView.prototype = Object.create(app.Views.CoreView.prototype);

    AppView.prototype.addEventListeners = function() {
        var that = this;
        document.getElementById('btn-logout')
            .addEventListener('click', function() {
                that.auth.logout();
            }, false);
    };

    AppView.prototype.getTemplate = function() {
        return '<div id="mymp-menu">Here should be the menu</div>' +
            '<div id="mymp-content">this is content <h2>h2 123</h2></div>' +
            '<button id="btn-logout">Logout</button>';
    };
    
    app.Views.AppView = AppView;
})(MYMP);
