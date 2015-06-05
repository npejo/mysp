(function(app) {
    'use strict';

    /**
     * Parent view extended by most of the views in the application
     * It implements the method which define the structure of the `view` concept
     * The default characteristics of each view are following:
     *  - it is bind to an existing element by `id`. The root element `id` is passed in the constructor
     *  - has object of subviews that should be rendered within its root element
     *  - knows how to render its template and triggers render for all subviews
     *  - can add listeners for events to elements within the view
     *  - can navigate users to another page (hash url)
     *
     *  This functionality can be extended by overriding the appropriate methods
     *
     * @param options
     * @constructor
     */
    var CoreView = function(options) {
        // local properties
        this.element = null;
        this.subscribed = false;

        // injected dependencies
        this.elementId = options.element;
        this.subViews = options.subViews || {};
        this.route = options.route || {};
    };

    /**
     * Renders its template and triggers render for all subviews and triggers adding event listeners
     */
    CoreView.prototype.render = function() {
        this.renderSelf();
        this.renderSubviews();
    };

    /**
     * Selects the root element and sets the template of the view as its innerHTML
     * If binding is not ignored by setting `ignoreBinding=true`, this method will trigger adding event listeners
     * for elements within its template
     *
     * @param ignoreBinding
     */
    CoreView.prototype.renderSelf = function(ignoreBinding) {
        this.element = document.getElementById(this.elementId);
        this.element.innerHTML = this.getTemplate();

        if (!ignoreBinding) {
            this.addEventListeners();
        }
    };

    /**
     * Invoke render for each of the subviews
     */
    CoreView.prototype.renderSubviews = function() {
        for (var v in this.subViews) {
            if (this.subViews.hasOwnProperty(v)) {
                this.subViews[v].render();
            }
        }
    };

    /**
     * Return the html markup temlate as string
     *
     * @returns {string}
     */
    CoreView.prototype.getTemplate = function() {
        return '';
    };

    /**
     * Add event listeners to elements within the template
     */
    CoreView.prototype.addEventListeners = function() {
    };

    /**
     * Update the `route` property
     * @param newRoute
     */
    CoreView.prototype.updateRoute = function(newRoute) {
        this.route = newRoute;
    };

    /**
     * Update the `route` properties in all subviews
     * @param newRoute
     */
    CoreView.prototype.updateSubviewsRoute = function(newRoute) {
        for (var v in this.subViews) {
            if (this.subViews.hasOwnProperty(v)) {
                this.subViews[v].updateRoute(newRoute);
            }
        }
    };

    /**
     * Navigate to another hash url
     * @param route
     */
    CoreView.prototype.goTo = function(route) {
        window.location.hash = app.Utils.objToQuerystring(route);
    };

    /**
     * Select the element by id or class and add bind event listener for the specified `eventName`
     * with the specified `callback`
     *
     * @param selector
     * @param eventName
     * @param callback
     */
    CoreView.prototype.addListener = function(selector, eventName, callback) {
        var cleanSelector = selector.substring(1);
        switch (selector.charAt(0)) {
            case '#':
                this.addListenerById(cleanSelector, eventName, callback);
                break;
            case '.':
                this.addListenerByClass(cleanSelector, eventName, callback);
                break;
        }
    };

    /**
     * Select element by id and adds event listener using the specified event name and callback
     * @private
     * @param elementId
     * @param eventName
     * @param callback
     */
    CoreView.prototype.addListenerById = function(elementId, eventName, callback) {
        var element = document.getElementById(elementId);
        if (!element) {
            return;
        }

        element.addEventListener(eventName, function() {
            callback();
        }, false);
    };

    /**
     * Select element by class name and adds event listener using the specified event name and callback
     *
     * @private
     * @param className
     * @param eventName
     * @param callback
     */
    CoreView.prototype.addListenerByClass = function(className, eventName, callback) {
        var elements = document.getElementsByClassName(className);
        if (!elements.length) {
            return;
        }
        var nbrElements = elements.length;
        for (var i = 0; i < nbrElements; i++) {
            elements[i].addEventListener(eventName, function() {
                callback();
            }, false);
        }
    };

    app.Views.CoreView = CoreView;
})(MYSP);
