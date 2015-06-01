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
        this.subscribed = false;
    };

    CoreView.prototype.render = function() {
        this.renderSelf();
        this.renderSubviews();
    };

    CoreView.prototype.renderSelf = function(ignoreBinding) {
        this.element = document.getElementById(this.elementId);
        this.element.innerHTML = this.getTemplate();

        if (!ignoreBinding) {
            this .addEventListeners();
        }
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

    //CoreView.prototype.checkListener = function(element, eventType) {
    //    return !!this.listeners[element + '-' + eventType];
    //};

    //CoreView.prototype.addListener = function(element, eventType) {
    //    if (this.listeners[element + '-' + eventType]) {
    //        throw new Error('Event listener for ' + element + '-' + eventType + ' already exists!');
    //    }
    //
    //    this.listeners[element + '-' + eventType] = true;
    //};

    CoreView.prototype.updateRoute = function(newRoute) {
        this.route = newRoute;
    };

    CoreView.prototype.goTo = function(route) {
        window.location.hash = app.Utils.objToQuerystring(route);
    };

    CoreView.prototype.delegate = function(selector, eventName, callback) {
        //var listenerName = selector + '-' + eventName;
        //if (this.checkListener(listenerName)) {
        //    return;
        //} else {
        //    this.addListener(listenerName);
        //}
        var cleanSelector = selector.substring(1);
        switch(selector.charAt(0)) {
            case '#':
                addListenerById(cleanSelector, eventName, callback);
                break;
            case '.':
                addListenerByClass(cleanSelector, eventName, callback);
                break;
            //case 'window':
            //    window.addEventListener(eventName, callback, false);
            //    break;
        }

        function addListenerById(elementId, eventName, callback) {
            var element = document.getElementById(elementId);
            if (!element) {
                return;
            }

            element.addEventListener(eventName, function() {
                callback();
            }, false);
        }

        function addListenerByClass(className, eventName, callback) {
            var elements = document.getElementsByClassName(className);
            if (!elements.length) {
                return;
            }
            var nbrElements = elements.length;
            for (var i=0; i < nbrElements; i++) {
                elements[i].addEventListener(eventName, function() {
                    callback();
                }, false);
            }
        }
    };

    app.Views.CoreView = CoreView;
})(MYMP);
