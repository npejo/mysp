(function(app) {
    'use strict';

    /**
     * Generic reusable view that renders table and handles actions of list of tracks
     *
     * @param options
     * @constructor
     */
    var TracksTableView = function(tracks, playlists, actions) {
        this.tracks = tracks;
        this.playlists = playlists;
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
        return '<table class="mymp-tracks-table" rules="rows" cellspacing="0" cellpadding="3">' +
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
        var row = '<tr id="track-' + track.uri + '">' +
            '<td>' + track.name + '</td>' +
            '<td>' + this.showArtists(track) + '</td>' +
            '<td>' + this.showAlbum(track) + '</td>' +
            '<td>' + this.showLength(track) + '</td>';

        // add actions
        row += '<td>&nbsp;';
        if (this.actions.indexOf('add-to') !== -1) {
            row += '&nbsp;<select style="width: 200px;" class="mymp-search-results-add-to">'
                + this.drawAddToOptions(track) +
            '</select>';
        }
        if (this.actions.indexOf('remove') !== -1) {
            row += '&nbsp;<a href="#" ' +
                'class="mymp-playlist-track-remove" ' +
                'rel="' + track.uri + '"' +
                'title="Remove track from playlist"' +
                '>Remove</a>';
        }

        row += '</td></tr>';

        return row;
    };

    TracksTableView.prototype.drawAddToOptions = function(track) {
        var options = '<option val="">Add To...</option>' +
            '<option disabled>--------------------</option>' +
            '<option value="current-queue">Current Queue</option>' +
            '<option disabled>-------- or --------</option>';

        for (var id in this.playlists) {
            if (this.playlists.hasOwnProperty(id)) {
                options += '<option value="' + id + '" data-track-uri="' + track.uri + '">'
                    + this.playlists[id].name +
                    '</option>';
            }
        }

        return options;
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

    /**
     * Show track length in mm:ss format
     *
     * @private
     * @param trackModel
     * @returns {string}
     */
    TracksTableView.prototype.showLength = function(trackModel) {
        var length = '';

        var time = new Date(trackModel.duration_ms);
        var mins = time.getMinutes();
        var secs = time.getSeconds();

        // pad seconds with 0
        secs = secs < 10 ? '0' + secs : secs;

        length += mins + ':' + secs + '</a>';

        return length;
    };

    app.Views.TracksTableView = TracksTableView;
})(MYMP);