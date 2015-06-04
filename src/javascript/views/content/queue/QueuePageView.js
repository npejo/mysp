(function(app) {
    'use strict';

    /**
     * Handles the rendering and actions of the current playing queue page
     *
     * @extends CoreView
     * @param options
     * @constructor
     */
    var QueuePageView = function(options) {
        // invoke the constructor of the parent object
        app.Views.CoreView.call(this, options);
    };

    // chain the prototype of the parent object
    QueuePageView.prototype = Object.create(app.Views.CoreView.prototype);

    /**
     * Return the main layout of the playlist page as string
     *
     * @returns {string}
     */
    QueuePageView.prototype.getTemplate = function() {
        return '<div id="mysp-queue-header" class="row"><h1>Playing Queue</h1></div>' +
            '<div id="mysp-queue-tracks"></div>';
    };

    app.Views.QueuePageView = QueuePageView;
})(MYSP);