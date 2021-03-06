(function(app) {
    'use strict';

    /**
     * Generic reusable view that renders table and handles actions of list of tracks
     *
     * @param options
     * @constructor
     */
    var TracksTableView = function(options) {
        this.tracks = options.tracks;
        this.playlists = options.playlists || []; // optional
        this.actions = options.actions;
        this.activeRow = options.activeRow;
    };

    /**
     * Return the complete markup for the table with tracks
     */
    TracksTableView.prototype.render = function() {
        var tracksTbl = this.startTableHeader();

        // draw row for each track
        this.tracks.forEach(function(track, index) {
            tracksTbl += this.drawTrackRow(track, index);
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
        return '<table class="mysp-tracks-table" rules="rows" cellspacing="0" cellpadding="3">' +
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
    TracksTableView.prototype.drawTrackRow = function(track, index) {
        var activeClass = (index === this.activeRow) ? 'class="active"' : '';
        var row = '<tr id="track-' + track.uri + '" ' + activeClass + '>' +
            '<td>' + track.name + '</td>' +
            '<td>' + this.showArtists(track) + '</td>' +
            '<td>' + this.showAlbum(track) + '</td>' +
            '<td>' + app.Utils.formatTime(track.duration_ms) + '</td>';

        // add actions
        row += '<td>&nbsp;';

        // add track to playlist or current queue action
        if (this.actions.indexOf('add-to') !== -1) {
            row += '&nbsp;<select style="width: 200px;" class="mysp-search-results-add-to" data-track-uri="' + track.uri + '">'
                + this.drawAddToOptions() +
            '</select>';
        }

        // add track to current queue action
        if (this.actions.indexOf('add-to-queue') !== -1) {
            row += '&nbsp;<a href="#" ' +
            'class="mysp-track-add-to-queue" ' +
            'rel="' + track.uri + '"' +
            'title="Add To Current Queue"' +
            '>Add To Queue</a>';
        }

        // remove track from playlist action
        if (this.actions.indexOf('remove-from-playlist') !== -1) {
            row += '&nbsp;<a href="#" ' +
                'class="mysp-playlist-track-remove" ' +
                'rel="' + track.uri + '" data-order="' + index + '"' +
                'title="Remove track from playlist"' +
                '>Remove</a>';
        }

        // remove track from current queue action
        if (this.actions.indexOf('remove-from-queue') !== -1) {
            row += '&nbsp;<a href="#" ' +
            'class="mysp-queue-track-remove" ' +
            'rel="' + track.uri + '" data-order="' + index + '"' +
            'title="Remove track from current queue"' +
            '>Remove</a>';
        }

        row += '</td></tr>';

        return row;
    };

    TracksTableView.prototype.drawAddToOptions = function() {
        var options = '<option val="">Add To...</option>' +
            '<option disabled>--------------------</option>' +
            '<option value="current-queue">Current Queue</option>' +
            '<option disabled>-------- or --------</option>';

        for (var id in this.playlists) {
            if (this.playlists.hasOwnProperty(id)) {
                options += '<option value="' + id + '">'
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

    app.Views.TracksTableView = TracksTableView;
})(MYSP);