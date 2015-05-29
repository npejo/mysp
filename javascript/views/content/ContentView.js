/**
 *
 */
(function(app) {
    'use strict';

    var ContentView = function(options) {
        app.Views.CoreView.call(this, options);

        this.route = options.route;
        this.subViews = options.subViews || {};
    };

    ContentView.prototype = Object.create(app.Views.CoreView.prototype);

    ContentView.prototype.addEventListeners = function() {
        var event = 'window-hashchange';
        if (this.checkListener(event)) {
            return;
        }

        var that = this;
        window.addEventListener("hashchange", function(e) {
            var hashString = e.newURL.split('#')[1];
            that.route = app.Utils.hashToObject(hashString);
            that.render();
        }, false);
        this.addListener(event);
    };

    ContentView.prototype.render = function() {
        this.renderSelf();
        var currentView = this.subViews[app.Config.defaultRoute];
        if (this.subViews[this.route.page]) {
            currentView = this.subViews[this.route.page];
        }
        currentView.updateRoute(this.route);
        currentView.render();
    };

    ContentView.prototype.getTemplate = function() {
        return '<div><pre>' + JSON.stringify(this.route) + '</div>';
    };

    app.Views.ContentView = ContentView;
})(MYMP);
