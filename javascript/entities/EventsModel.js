/**
 *
 */
(function(app) {
    'use strict';

    var EventsModel = function() {
        this.subscriptions = {};
    };

    EventsModel.prototype = {
        on: function(eventName, callback, contextObj) {
            if (!this.subscriptions[eventName]) {
                this.subscriptions[eventName] = [];
            }
            this.subscriptions[eventName].push({obj: contextObj, method: callback});
        },

        trigger: function(eventName, data) {
            if (!this.subscriptions[eventName]) {
                return;
            }
            this.subscriptions[eventName].forEach(function(sub) {
                sub.method.call(sub.obj, data);
            });
        }
    };

    app.Entities.EventsModel = EventsModel;
})(MYMP);
