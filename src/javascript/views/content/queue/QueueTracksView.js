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

        this.currentTrack = null;

        // injected dependencies
        this.route = options.route;
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
        // prevent subscribing more than once
        if (!this.subscribed) {
            this.subscribed = true;

            var self = this;
            // subscribe to application level event
            this.appEvents.subscribe('currentTrack', function(trackIndex) {
                if (self.route.page === 'queue') {
                    self.currentTrack = trackIndex;
                    self.render();
                }
            });
        }

        // bind remove track action
        this.addListener('.mysp-queue-track-remove', 'click', this.removeTrackFromQueue.bind(this));
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
                    actions: ['remove-from-queue'],
                    activeRow: this.currentTrack
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

        this.appEvents.publish('logMsg', {
            type: 'info',
            msg: 'Track removed from playing queue'
        });
        this.appEvents.publish('trackRemovedFromQueue', trackOrder);
    };

    app.Views.QueueTracksView = QueueTracksView;
})(MYSP);