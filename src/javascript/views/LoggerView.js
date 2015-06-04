(function(app) {
    'use strict';

    /**
     * Handles the displaying of info and error messages for user actions
     *
     * @extends CoreView
     * @param options
     * @constructor
     */
    var LoggerView = function(options) {
        // invoke the constructor of the parent object
        app.Views.CoreView.call(this, options);

        this.msgType = ''; // [error, info]
        this.msg = '';
        this.timeout = null;

        //injected dependencies
        this.appEvents = options.events;
    };

    // chain the prototype of the parent object
    LoggerView.prototype = Object.create(app.Views.CoreView.prototype);

    /**
     * Bind event actions on elements within the view
     */
    LoggerView.prototype.addEventListeners = function() {
        // prevent subscribing more than once
        if (!this.subscribed) {
            this.subscribed = true;

            // subscribe to application level event
            this.appEvents.subscribe('logMsg', this.displayMessage.bind(this));
        }
    };

    LoggerView.prototype.displayMessage = function(data) {
        this.msgType = data.type;
        this.msg = data.msg;
        this.render();

        // hide the message after 3 seconds
        var self = this;
        this.timeout = null;
        this.timeout = setTimeout(function() {
            self.msg = '';
            self.render();
        }, 3000);
    };

    /**
     * Return the main login page template as string
     *
     * @returns {string}
     */
    LoggerView.prototype.getTemplate = function() {
        // don't display anything if there isn't message
        if (this.msg === '') {
            return '';
        }

        return '<div class="mysp-alert-' + this.msgType + '">' + this.msg + '</div>';
    };

    app.Views.LoggerView = LoggerView;
})(MYSP);