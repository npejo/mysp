/**
 *
 */
(function(app) {
    'use strict';

    var EventsModel = function() {
        this.subscriptions = {};
    };

    EventsModel.prototype = {
        on: function(eventName, callback) {
            if (!this.subscriptions[eventName]) {
                this.subscriptions[eventName] = [];
            }
            this.subscriptions[eventName].push(callback);
        },

        trigger: function(eventName, data) {
            if (!this.subscriptions[eventName]) {
                return;
            }
            this.subscriptions[eventName].forEach(function(callback) {
                callback(data);
            });
        }
    };

    app.Entities.EventsModel = EventsModel;
})(MYMP);
