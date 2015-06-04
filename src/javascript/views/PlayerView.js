(function(app) {
    'use strict';

    /**
     * Simulates playing and navigating through songs in current playing queue
     *
     * @extends CoreView
     * @param options
     * @constructor
     */
    var PlayerView = function(options) {
        // invoke the constructor of the parent object
        app.Views.CoreView.call(this, options);

        this.currentTrack = {
            index: null,
            model: null,
            length: 0
        };

        this.isPlaying = false;

        //injected dependencies
        this.appEvents = options.events;
        this.queueModel = options.queueModel;
    };

    // chain the prototype of the parent object
    PlayerView.prototype = Object.create(app.Views.CoreView.prototype);

    /**
     * Bind event actions on elements within the view
     */
    PlayerView.prototype.addEventListeners = function() {
        this.addListener('#mysp-player-play', 'click', this.play.bind(this));
        this.addListener('#mysp-player-stop', 'click', this.stop.bind(this));
        this.addListener('#mysp-player-next', 'click', this.next.bind(this));
        this.addListener('#mysp-player-prev', 'click', this.prev.bind(this));
    };

    /**
     * Start playing the current track.
     * When the track ends, go to next track.
     * Do nothing if there are no tracks in the queue or there is already playing track.
     */
    PlayerView.prototype.play = function() {
        if (this.isEmptyQueue() || this.isPlaying) {
            return;
        }

        var self = this;
        var curTime = this.currentTrack.length;
        this.isPlaying = setInterval(function() {
            if (curTime >= 0) {
                self.showCurrentTime(self.currentTrack.length - curTime);
                curTime = curTime - 300;
            } else {
                self.next();
            }
        }, 300);
    };

    /**
     * Reset the playing interval and playing time info
     */
    PlayerView.prototype.stop = function() {
        clearInterval(this.isPlaying);
        this.isPlaying = false;
        this.showCurrentTime(0);
    };

    /**
     * Go to next track
     */
    PlayerView.prototype.next = function() {
        this.playTrack(this.currentTrack.index + 1);
    };

    /**
     * Go to previous track
     */
    PlayerView.prototype.prev = function() {
        this.playTrack(this.currentTrack.index - 1);
    };

    /**
     * Stop currently playing track, start playing the track on the index received on input
     * Update the current track info box
     * Do nothing if the queue is empty
     *
     * @param trackIndex
     */
    PlayerView.prototype.playTrack = function(trackIndex) {
        if (this.isEmptyQueue()) {
            return;
        }

        this.stop();

        var nbrIndexes = this.queueModel.getLength() - 1;

        // start from beginning if it is the last track in the queue
        if (trackIndex > nbrIndexes) {
            trackIndex = 0;
        }

        var track = this.queueModel.getTrack(trackIndex);
        this.setCurrentTrack(trackIndex, track);

        this.play();
        this.showCurrentTrackInfo();
    };

    /**
     * Render the player template and initialize the current track and track info
     */
    PlayerView.prototype.render = function() {
        this.renderSelf();

        if (this.currentTrack.index === null) {
            this.initPlayer();
        }

        this.showCurrentTrackInfo();
    };

    /**
     * Update the `currentTrack` property
     *
     * @param index
     * @param trackModel
     */
    PlayerView.prototype.setCurrentTrack = function(index, trackModel) {
        this.currentTrack = {
            index: index,
            model: trackModel,
            playTime: 0,
            length: trackModel.duration_ms
        }
    };

    /**
     * Check if there are songs in the queue
     *
     * @returns {boolean}
     */
    PlayerView.prototype.isEmptyQueue = function() {
        var queueLength = this.queueModel.getLength();
        if (queueLength === 0) {
            this.appEvents.publish('logMsg', {
                type: 'info',
                msg: 'Playing queue is empty'
            });
            return true;
        } else {
            return false;
        }
    };

    /**
     * Set the first track in the playing queue as current queue in the player
     */
    PlayerView.prototype.initPlayer = function() {
        if (!this.isEmptyQueue()) {
            var trackModel = this.queueModel.getTrack(0);
            this.setCurrentTrack(0, trackModel);
        }
    };

    /**
     * Display the track name, artist and length in the track info section
     */
    PlayerView.prototype.showCurrentTrackInfo = function() {
        if (this.currentTrack.index !== null) {
            var trackLength = this.currentTrack.length;
            var trackName = this.currentTrack.model.name;
            var artistName = this.currentTrack.model.artists[0].name;

            var infoElement = this.element.getElementsByClassName('mysp-current-track')[0];
            infoElement.innerHTML = '<div class="mysp-player-track-name truncated">' + trackName + '</div>' +
                '<div>' + artistName + " - " + app.Utils.formatTime(trackLength) + '</div>';
        }
    };

    PlayerView.prototype.showCurrentTime = function(time) {
        document.getElementById('mysp-player-time').innerHTML = app.Utils.formatTime(time);
    };

    /**
     * Return the html template for the player as string
     *
     * @returns {string}
     */
    PlayerView.prototype.getTemplate = function() {
        return '<div class="mysp-player clearfix">' +
                '<a id="mysp-player-queue" href="#page=queue" class="mysp-player-btn">&#8694;</a>' +
                '<div class="mysp-player-btn" id="mysp-player-next">&#9654;&#9654;</div>' +
                '<div class="mysp-player-btn" id="mysp-player-stop">&#9632;</div>' +
                '<div class="mysp-player-btn" id="mysp-player-play">&#9654;</div>' +
                '<div class="mysp-player-btn" id="mysp-player-prev">&#9664;&#9664;</div>' +
                '<div class="mysp-player-time" id="mysp-player-time">0:00</div>' +
            '</div>' +
            '<div class="mysp-current-track"></div>';
    };

    app.Views.PlayerView = PlayerView;
})(MYSP);