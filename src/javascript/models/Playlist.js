(function(app) {
    'use strict';

    /**
     *
     * @param ajaxService
     * @constructor
     */
    var Playlist = function(ajaxService) {
        this.data = {};
        this.tracks = [];
        this.tracksObjMap = {};

        // injected dependencies
        this.ajaxService = ajaxService;
    };

    /**
     * Set empty all data properties of the playlist model
     *
     * @returns {string}
     */
    Playlist.prototype.reset = function() {
        this.data = {};
        this.tracks = [];
        this.tracksObjMap = {};
    };

    /**
     * Return the `id` property from playlist object
     * @returns {string}
     */
    Playlist.prototype.getId = function() {
        return this.data.id;
    };

    /**
     * Return the playlist name - `name` property
     * @returns {string}
     */
    Playlist.prototype.getName = function() {
        return this.data.name;
    };

    /**
     * Set the playlist name - `name` property
     */
    Playlist.prototype.setName = function(name) {
        this.data.name = name;
    };

    /**
     * Return:
     * `true` - if the playlist is public,
     * `false` - if the playlist is private
     *
     * @returns {bool}
     */
    Playlist.prototype.isPublic = function() {
        return this.data.public;
    };

    /**
     * Set the playlist type - `publc` property `true` or `false`
     */
    Playlist.prototype.setPublic = function(isPublic) {
        this.data.public = isPublic;
    };

    /**
     * Set the playlist data - `data` local property
     */
    Playlist.prototype.setProfile = function(playlistObj) {
        this.data = playlistObj;
    };

    /**
     * Return the full playlist data object
     *
     * @returns {object}
     */
    Playlist.prototype.getData = function() {
        return this.data;
    };

    /**
     * Return the array of tracks in the playlist data object
     *
     * @returns {object}
     */
    Playlist.prototype.getTracks = function() {
        return this.tracks;
    };

    /**
     * Return track object
     *
     * @param trackUri
     * @returns {object}
     */
    Playlist.prototype.getTrackModel = function(trackUri) {
        return this.tracksObjMap[trackUri] ? this.tracksObjMap[trackUri] : null;
    };

    /**
     * Return the url of the image related to the playlist
     * If there is more than 1 image, return the medium sized image by default
     *
     * @returns {string}
     */
    Playlist.prototype.getImage = function(size) {
        var img = '';

        if (this.data.images.length === 1) {
            img = this.data.images[0].url;
        } else if (this.data.images.length > 1) {
            var index = 0;
            switch(size) {
                case 'large':
                    index = 0;
                    break;
                case 'medium':
                    index = 1;
                    break;
                case 'small':
                    index = 2;
                    break;
            }
            img = this.data.images[index].url;
        }

        return img;
    };

    /**
     * GET - Load playlist tracks and invoke the input callback function passing the response data or error
     */
    Playlist.prototype.loadTracks = function(callback) {
        var self = this;
        this.ajaxService.get({url: self.data.tracks.href},
            function(response) { // success
                console.log('tracks loaded');
                // update the playlist `tracks` property with loaded data
                response.items.forEach(function(obj) {
                    self.tracks.push(obj.track);
                    self.tracksObjMap[obj.track.uri] = obj.track;
                });

                callback(null, self.tracks);

            }, function(err) { // error
                console.log(err);
                callback(err);
            }
        );
    };

    /**
     * PUT - Update playlist model information and invoke the input callback function
     */
    Playlist.prototype.updatePlaylistDetails = function(data, callback) {
        var self = this;
        this.ajaxService.put(
            {
                url: self.data.href,
                data: data
            },
            function() { // success
                console.log('playlists updated');
                // update local playlist properties with updated values
                self.data.name = data.name || self.data.name;
                self.data.public = data.public || self.data.public;

                callback();

            }, function(err) { // error
                console.log(err.message);
                callback(err);
            }
        );
    };

    /**
     * POST - Create new playlist and invoke the input callback function
     */
    Playlist.prototype.createPlaylist = function(username, data, callback) {
        var self = this;
        this.ajaxService.post(
            {
                url: '/users/' + encodeURIComponent(username) + '/playlists',
                data: data
            },
            function(response) { // success
                console.log('playlists created');
                self.data = response;

                callback(null, response);

            }, function(err) { // error
                console.log(err.message);
                callback(err, null);
            }
        );
    };

    /**
     * POST - Add tracks to the playlist and invoke the input callback function
     * `uris` parameter should be array of one or more track `uri`
     */
    Playlist.prototype.addTracks = function(uris, callback) {
        console.log(this);
        var self = this;
        this.ajaxService.post(
            {
                url: self.data.tracks.href,
                data: {
                    uris: uris
                }
            },
            function(response) { // success
                console.log('tracks added');
                // update the local playlist snapshot_id after response is received
                self.data.snapshot_id = response.snapshot_id;

                callback();

            }, function(err) { // error
                console.log(err.message);
                callback(err);
            }
        );
    };

    /**
     * DELETE - Remove single track from the playlist and invoke the input callback function
     */
    Playlist.prototype.removeTrack = function(uri, callback) {
        var self = this;
        this.ajaxService.delete(
            {
                url: self.data.tracks.href,
                data: {
                    tracks: [{
                        uri: uri
                    }]
                }
            },
            function(response) { // success
                console.log('track removed');
                // update the local playlist snapshot_id after response is received
                self.data.snapshot_id = response.snapshot_id;

                callback();

            }, function(err) { // error
                console.log(err.message);
                callback(err);
            }
        );
    };

    /**
     * Map tracks list as object with the trackUri as key
     * The enable easy lookup for specific track
     *
     * @param tracks
     */
    Playlist.prototype.appendToObjMap = function(tracks) {
        tracks.forEach(function(t) {
            this.tracksObjMap[t.uri] = t;
        }, this);
    };

    app.Models.Playlist = Playlist;
})(MYMP);
