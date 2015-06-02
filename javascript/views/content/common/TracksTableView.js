(function(app) {
    'use strict';

    /**
     * Generic reusable view that renders table and handles actions of list of tracks
     *
     * @param options
     * @constructor
     */
    var TracksTableView = function(tracks, actions) {
        this.tracks = tracks;
        this.actions = actions;
    };

    /**
     * Return the complete markup for the table with tracks
     */
    TracksTableView.prototype.render = function() {
        var tracksTbl = this.startTableHeader();

        // draw row for each track
        this.tracks.forEach(function(track) {
            tracksTbl += this.drawTrackRow(track);
        }, this);

        tracksTbl += this.endTable();

        return tracksTbl;
    };

    /**
     * Start the html markup for the table as string
     *
     * @returns {string}
     */
    TracksTableView.prototype.startTableHeader = function() {
        return '<table class="mymp-tracks-table">' +
            '<thead>' +
                '<tr>' +
                    '<th>Song</th>' +
                    '<th>Artist</th>' +
                    '<th>Album</th>' +
                    '<th>Time</th>' +
                    '<th>&nbsp;</th>' +
                '</tr>' +
            '</thead>' +
            '<tbody>';
    };

    /**
     * Return the closing tags for the table as string
     *
     * @returns {string}
     */
    TracksTableView.prototype.endTable = function() {
        return '</tbody></table>';
    };

    /**
     * Return the markup for one track, row in the table
     *
     * @param track
     * @returns {string}
     */
    TracksTableView.prototype.drawTrackRow = function(track) {
        return '<tr id="track-' + track.uri + '">' +
            '<td>' + track.name + '</td>' +
            '<td>' + this.showArtists(track) + '</td>' +
            '<td>' + this.showAlbum(track) + '</td>' +
            '<td>' + track.duration_ms + '</td>' +
            '<td><a href="#" class="mymp-playlist-track-remove" rel="' + track.uri + '">Remove</a></td>' +
            '</tr>';
    };

    /**
     * Build the template for track artists
     *
     * @private
     * @param trackModel
     * @returns {string}
     */
    TracksTableView.prototype.showArtists = function(trackModel) {
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
    TracksTableView.prototype.showAlbum = function(trackModel) {
        var album = '';

        album += '<a href="' + trackModel.album.external_urls.spotify + '" target="_blank">';
        album += trackModel.album.name + '</a>';


        return album;
    };

    app.Views.TracksTableView = TracksTableView;
})(MYMP);