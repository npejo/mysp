(function(app) {
    'use strict';

    /**
     * Handles the rendering and actions of tracks in current playing queue
     *
     * @extends CoreView
     * @param options
     * @constructor
     */
    var QueueTracksView = function(options) {
        // invoke the constructor of the parent object
        app.Views.CoreView.call(this, options);

        // injected dependencies
        this.appEvents = options.events;
        this.TracksTableView = options.TracksTableView;
        this.queueModel = options.queueModel;
    };

    // chain the prototype of the parent object
    QueueTracksView.prototype = Object.create(app.Views.CoreView.prototype);

    /**
     * Bind event actions on elements within the view
     */
    QueueTracksView.prototype.addEventListeners = function() {
        // bind remove track action
        this.addListener('.mymp-queue-track-remove', 'click', this.removeTrackFromQueue.bind(this));
    };

    /**
     * Render the table with playlist tracks
     */
    QueueTracksView.prototype.render = function() {
        this.renderSelf(true);

        var tracks = this.queueModel.getTracks();

        if (tracks.length === 0) {
            queueTpl = '<p>The playing queue is empty. <a href="#page=search">Search for songs</a></p>';
        } else {
            // get the markup for the current queue tracks table
            var queueTpl = (new this.TracksTableView(
                {
                    tracks: tracks,
                    actions: ['remove-from-queue']
                }
            )).render();
        }

        this.element.innerHTML = queueTpl;

        this.addEventListeners();
    };

    /**
     * Remove track from current queue
     */
    QueueTracksView.prototype.removeTrackFromQueue = function() {
        event.preventDefault();
        var trackOrder = event.currentTarget.getAttribute('data-order');

        this.queueModel.removeTrack(trackOrder);
        this.render();
    };

    app.Views.QueueTracksView = QueueTracksView;
})(MYMP);