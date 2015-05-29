/**
 *
 */
(function(app) {
    'use strict';

    var PlaylistTracksView = function(options) {
        app.Views.CoreView.call(this, options);

        this.playlistModel = null;
    };

    PlaylistTracksView.prototype = Object.create(app.Views.CoreView.prototype);

    PlaylistTracksView.prototype.render = function() {
        this.renderSelf();

        var tracks = this.playlistModel.getTracks();

        var trackList = '';
        tracks.forEach(function(track) {
            var track = track.track;
            trackList += '<tr>' +
            '<td>' + track.name + '</td>' +
            '<td>' + this.showArtists(track) + '</td>' +
            '</tr>';
        }, this);

        this.element.getElementsByTagName('tbody')[0].innerHTML = trackList;
    };

    PlaylistTracksView.prototype.addEventListeners = function() {
        //this.element.getElementsByClassName('dummy-link')[0]
        //    .addEventListener('click', function() {
        //        console.log({nikola: 123});
        //    }, false);
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



    app.Views.PlaylistTracksView = PlaylistTracksView;
})(MYMP);