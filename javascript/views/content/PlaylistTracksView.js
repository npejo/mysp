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

        // local property
        this.playlistModel = null;

        // injected dependencies
        this.appEvents = options.events;

    };

    // chain the prototype of the parent object
    PlaylistTracksView.prototype = Object.create(app.Views.CoreView.prototype);

    /**
     * Bind event actions on elements within the view
     */
    PlaylistTracksView.prototype.addEventListeners = function() {
        // bind remove track action
        this.addListener('.playlist-track-remove', 'click', this.removeTrackFromPlaylist.bind(this));
    };

    /**
     * Render the table with playlist tracks
     */
    PlaylistTracksView.prototype.render = function() {
        this.renderSelf(true);

        var tracks = this.playlistModel.getTracks();

        var trackList = '';

        // draw row for each track
        tracks.forEach(function(track) {
            var track = track.track;
            trackList += '<tr id="track-' + track.uri + '">' +
            '<td>' + track.name + '</td>' +
            '<td>' + this.showArtists(track) + '</td>' +
            '<td>' + this.showAlbum(track) + '</td>' +
            '<td>' + track.duration_ms + '</td>' +
            '<td><a href="#" class="playlist-track-remove" rel="' + track.uri + '">Remove</a></td>' +
            '</tr>';
        }, this);

        this.element.getElementsByTagName('tbody')[0].innerHTML = trackList;

        this.addEventListeners();
    };

    /**
     * Return the tracks table template as string
     *
     * @returns {string}
     */
    PlaylistTracksView.prototype.getTemplate = function() {
        return '<table id="playlist-tracks-list">' +
            '<thead>' +
            '<tr>' +
            '<th>Song</th><th>Artist</th><th>Album</th><th>Time</th><th>&nbsp;</th>' +
            '</tr>' +
            '</thead>' +
            '<tbody></tbody>' +
            '</table>';
    };

    /**
     * Inject/Set the `playlistModel` dependency
     *
     * @param playlistModel
     */
    PlaylistTracksView.prototype.setPlaylistService = function(playlistModel) {
        this.playlistModel = playlistModel;
    };

    /**
     * Build the template for track artists
     *
     * @private
     * @param trackModel
     * @returns {string}
     */
    PlaylistTracksView.prototype.showArtists = function(trackModel) {
        var artists = '';
        trackModel.artists.forEach(function(artist) {
            artists += ', <a href="' + artist.external_urls.spotify + '" target="_blank">';
            artists += artist.name + '</a>';
        });

        return artists.substring(2);
    };

    /**
     * Build the template for track album
     *
     * @private
     * @param trackModel
     * @returns {string}
     */
    PlaylistTracksView.prototype.showAlbum = function(trackModel) {
        var album = '';

        album += '<a href="' + trackModel.album.external_urls.spotify + '" target="_blank">';
        album += trackModel.album.name + '</a>';


        return album;
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