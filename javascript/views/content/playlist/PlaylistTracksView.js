(function(app) {
    'use strict';

    /**
     * Handles the rendering and actions of playlist tracks section
     *
     * @extends CoreView
     * @param options
     * @constructor
     */
    var PlaylistTracksView = function(options) {
        // invoke the constructor of the parent object
        app.Views.CoreView.call(this, options);

        // injected dependencies
        this.user = options.user;
        this.TracksTableView = options.TracksTableView;
        this.playlistModel = options.playlistModel || null; // optional in constructor
    };

    // chain the prototype of the parent object
    PlaylistTracksView.prototype = Object.create(app.Views.CoreView.prototype);

    /**
     * Bind event actions on elements within the view
     */
    PlaylistTracksView.prototype.addEventListeners = function() {
        // bind remove track action
        this.addListener('.mymp-playlist-track-remove', 'click', this.removeTrackFromPlaylist.bind(this));
    };

    /**
     * Render the table with playlist tracks
     */
    PlaylistTracksView.prototype.render = function() {
        this.renderSelf(true);

        var tracks = this.playlistModel.getTracks();
        var userPlaylists = this.user.getPlaylists();

        // get the markup for the search results table
        var trackTableTpl = (new this.TracksTableView(
                {
                    tracks: tracks,
                    playlists: userPlaylists,
                    actions: ['remove-from-playlist']
                }
            )).render();

        this.element.innerHTML = trackTableTpl;

        this.addEventListeners();
    };

    /**
     * Inject/Set the `playlistModel` dependency
     *
     * @param playlistModel
     */
    PlaylistTracksView.prototype.setPlaylistModel = function(playlistModel) {
        this.playlistModel = playlistModel;
    };

    /**
     * Remove track from playlist
     */
    PlaylistTracksView.prototype.removeTrackFromPlaylist = function() {
        event.preventDefault();
        var trackUri = event.currentTarget.rel;

        this.playlistModel.removeTrack(trackUri, function(err) {
            if (err) return console.log('track remove error!');

            console.log('track ' + trackUri + ' was removed!');
            document.getElementById('track-' + trackUri).style.display = 'none';
        });
    };

    app.Views.PlaylistTracksView = PlaylistTracksView;
})(MYMP);