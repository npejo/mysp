(function(app) {
    'use strict';

    /**
     * Object that manages the current playing queue,
     * preserve the state in localStorage, add, remove tracks from it
     *
     * @constructor
     */
    var Queue = function(config) {
        this.appPrefix = config.appPrefix;
        this.tracks = [];
    };

    /**
     * Return the array of tracks in the current playing queue
     *
     * @returns Array
     */
    Queue.prototype.getTracks = function() {
        if (this.tracks.length === 0) {
            var tracks = localStorage.getItem(this.appPrefix + 'queue') || '[]';
            this.tracks = JSON.parse(tracks);
        }
        return this.tracks;
    };

    /**
     * Add tracks in the current playing queue
     */
    Queue.prototype.addTracks = function(tracks) {
        if (!tracks) {
            return;
        }

        var currentTracks = this.getTracks();

        if (Array.isArray(tracks)) {
            tracks.forEach(function(t) {
                currentTracks.push(t);
            }, this);
        } else {
            currentTracks.push(tracks);
        }

        this.saveQueue(currentTracks);
    };

    /**
     * Remove track from the current playing queue
     *
     * @param trackOrder
     */
    Queue.prototype.removeTrack = function(trackOrder) {
        var tracks = this.getTracks();
        tracks.splice(parseInt(trackOrder, 10), 1);
        this.saveQueue(tracks);
    };

    /**
     * Store the input tracks array in localStorage and update the local tracks array property
     *
     * @private
     */
    Queue.prototype.saveQueue = function(tracks) {
        this.tracks = tracks;
        localStorage.setItem(this.appPrefix + 'queue', JSON.stringify(tracks));
    };



    app.Models.Queue = Queue;
})(MYSP);
