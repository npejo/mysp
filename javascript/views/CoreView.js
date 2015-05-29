/**
 *
 */
(function(app) {
    'use strict';

    var CoreView = function(options) {
        this.elementId = options.element;
        this.subViews = options.subViews || {};
        this.route = options.route || {};

        this.element = null;
        this.listeners = {};
    };

    CoreView.prototype.clear = function() {
        this.element.innerHTML = '';
    };

    CoreView.prototype.render = function() {
        this.renderSelf();
        this.renderSubviews();
    };

    CoreView.prototype.renderSelf = function() {
        this.element = document.getElementById(this.elementId);
        this.element.innerHTML = this.getTemplate();

        this.addEventListeners();
    };

    CoreView.prototype.renderSubviews = function() {
        for (var v in this.subViews) {
            if (this.subViews.hasOwnProperty(v)) {
                this.subViews[v].render();
            }
        }
    };

    CoreView.prototype.getTemplate = function() {
        return '';
    };

    CoreView.prototype.addEventListeners = function() {};

    CoreView.prototype.checkListener = function(element, eventType) {
        return !!this.listeners[element + '-' + eventType];
    };

    CoreView.prototype.addListener = function(element, eventType) {
        if (this.listeners[element + '-' + eventType]) {
            throw new Error('Event listener for ' + element + '-' + eventType + ' already exists!');
        }

        this.listeners[element + '-' + eventType] = true;
    };

    CoreView.prototype.updateRoute = function(newRoute) {
        this.route = newRoute;
    };

    CoreView.prototype.goTo = function(route) {
        window.location.hash = app.Utils.objToQuerystring(route);
    };

    app.Views.CoreView = CoreView;
})(MYMP);
