/**
 *
 */
(function(app) {
    'use strict';

    var CoreView = function(options) {
        this.elementId = options.element;
        this.element = null;
        this.subViews = {};
        this.listeners = {};
        this.route = {};
    };

    CoreView.prototype.clear = function() {
        this.element.innerHTML = '';
    };

    CoreView.prototype.render = function() {
        this.element = document.getElementById(this.elementId);

        this.selfRender();
        this.addEventListeners();

        for (var v in this.subViews) {
            if (this.subViews.hasOwnProperty(v)) {
                this.subViews[v].render();
            }
            console.log(this.subViews[v]);
        }
    };

    CoreView.prototype.selfRender = function() {
        this.element.innerHTML = this.getTemplate();
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

    app.Views.CoreView = CoreView;
})(MYMP);
