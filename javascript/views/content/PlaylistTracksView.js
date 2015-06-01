/**
 *
 */
(function(app) {
    'use strict';

    var PlaylistTracksView = function(options) {
        app.Views.CoreView.call(this, options);

        // local property
        this.playlistModel = null;

        // injected dependencies
        this.appEvents = options.events;

    };

    PlaylistTracksView.prototype = Object.create(app.Views.CoreView.prototype);

    PlaylistTracksView.prototype.addEventListeners = function() {
        this.delegate('.playlist-track-remove', 'click', this.removeTrackFromPlaylist.bind(this));
    };

    PlaylistTracksView.prototype.render = function() {
        this.renderSelf(true);

        var tracks = this.playlistModel.getTracks();

        var trackList = '';
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

    PlaylistTracksView.prototype.setPlaylistService = function(playlistModel) {
        this.playlistModel = playlistModel;
    };

    PlaylistTracksView.prototype.showArtists = function(trackModel) {
        var artists = '';
        trackModel.artists.forEach(function(artist) {
            artists += ', <a href="' + artist.external_urls.spotify + '" target="_blank">';
            artists += artist.name + '</a>';
        });

        return artists.substring(2);
    };

    PlaylistTracksView.prototype.showAlbum = function(trackModel) {
        var album = '';

        album += '<a href="' + trackModel.album.external_urls.spotify + '" target="_blank">';
        album += trackModel.album.name + '</a>';


        return album;
    };

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