/**
 *
 */
(function(app) {
    'use strict';

    var ContentView = function(options) {
        app.Views.CoreView.call(this, options);

        this.route = options.route;
        this.subViews = options.subViews || {};
        this.appEvents = options.events;
    };

    ContentView.prototype = Object.create(app.Views.CoreView.prototype);

    ContentView.prototype.addEventListeners = function() {
        if (!this.subscribed) {
            this.subscribed = true;
            this.appEvents.on('ContentView', 'routeChange', this.renderNewRoute.bind(this));
        }
    };

    ContentView.prototype.render = function() {
        this.renderSelf();
        var currentView = this.subViews[app.Config.defaultRoute.page];
        if (this.subViews[this.route.page]) {
            currentView = this.subViews[this.route.page];
        }
        currentView.updateRoute(this.route);
        currentView.render();
    };

    ContentView.prototype.getTemplate = function() {
        return '<div><pre>' + JSON.stringify(this.route) + '</div>';
    };

    ContentView.prototype.renderNewRoute = function(newRoute) {
        this.route = newRoute;
        this.render();
    };

    app.Views.ContentView = ContentView;
})(MYMP);
