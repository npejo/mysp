(function(app) {
    'use strict';

    /**
     * Handles the rendering and actions of the application content section
     *
     * @extends CoreView
     * @param options
     * @constructor
     */
    var ContentView = function(options) {
        // invoke the constructor of the parent object
        app.Views.CoreView.call(this, options);

        // injected dependencies
        this.route = options.route;
        this.subViews = options.subViews || {};
        this.appEvents = options.events;
    };

    // chain the prototype of the parent object
    ContentView.prototype = Object.create(app.Views.CoreView.prototype);

    /**
     * Bind event actions
     */
    ContentView.prototype.addEventListeners = function() {
        // prevent subscribing more than once
        if (!this.subscribed) {
            this.subscribed = true;

            // subscribe to application level event
            this.appEvents.subscribe('routeChange', this.renderNewRoute.bind(this));
        }
    };

    /**
     * Overrides the parent `render` method
     * Depending on the route property value, renders the appropriate subView in the content section
     */
    ContentView.prototype.render = function() {
        this.renderSelf();
        var currentView = this.subViews[app.Config.defaultRoute.page];
        if (this.subViews[this.route.page]) {
            currentView = this.subViews[this.route.page];
        }
        currentView.updateRoute(this.route);
        currentView.render();
    };

    /**
     * Handler method for routeChange event subscription
     * Updates the route property and re-renders the view
     *
     * @private
     * @param newRoute
     */
    ContentView.prototype.renderNewRoute = function(newRoute) {
        this.route = newRoute;
        this.render();
    };

    app.Views.ContentView = ContentView;
})(MYMP);
