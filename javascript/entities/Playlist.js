/**
 *
 */
(function(app) {
    'use strict';

    var Playlist = function(ajaxService) {
        this.profile = {};
        this.tracks = [];

        this.ajaxService = ajaxService;
    };

    Playlist.prototype.getId = function() {
        return this.profile.id;
    };

    Playlist.prototype.getName = function() {
        return this.profile.name;
    };

    Playlist.prototype.setName = function(name) {
        this.profile.name = name;
    };

    Playlist.prototype.isPublic = function() {
        return this.profile.public;
    };

    Playlist.prototype.setPublic = function(isPublic) {
        this.profile.public = isPublic;
    };

    Playlist.prototype.setProfile = function(playlistObj) {
        this.profile = playlistObj;
    };

    Playlist.prototype.getProfile = function() {
        return this.profile;
    };

    Playlist.prototype.getTracks = function() {
        return this.tracks.items;
    };

    Playlist.prototype.getImage = function(size) {
        var img = '';

        if (this.profile.images.length === 1) {
            img = this.profile.images[0].url;
        } else if (this.profile.images.length > 1) {
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
            img = this.profile.images[index].url;
        }

        return img;
    };

    Playlist.prototype.loadTracks = function(callback) {
        var self = this;
        this.ajaxService.get({url: self.profile.tracks.href},
            function(response) {
                console.log('tracks loaded');
                self.tracks = response;
                callback(null, response.items);
            }, function(err) {
                console.log(err);
                callback(err);
            }
        );
    };

    Playlist.prototype.updatePlaylistDetails = function(data, callback) {
        var self = this;
        this.ajaxService.put(
            {
                url: self.profile.href,
                data: data
            },
            function() {
                console.log('playlists updated');
                self.profile.name = data.name || self.profile.name;
                self.profile.public = data.public || self.profile.public;

                callback();

            }, function(err) {
                console.log(err.message);
                callback(err);
            }
        );
    };

    Playlist.prototype.createPlaylist = function(username, data, callback) {
        var self = this;
        this.ajaxService.post(
            {
                url: '/users/' + encodeURIComponent(username) + '/playlists',
                data: data
            },
            function(response) {
                console.log('playlists created');
                self.profile = response;

                callback(null, response);

            }, function(err) {
                console.log(err.message);
                callback(err, null);
            }
        );
    };

    Playlist.prototype.addTracks = function(uris, callback) {
        var self = this;
        this.ajaxService.post(
            {
                url: self.profile.tracks.href,
                data: {
                    uris: uris
                }
            },
            function(response) {
                console.log('tracks added');
                self.profile.snapshot_id = response.snapshot_id;

                callback();

            }, function(err) {
                console.log(err.message);
                callback(err);
            }
        );
    };

    Playlist.prototype.removeTrack = function(uri, callback) {
        var self = this;
        this.ajaxService.delete(
            {
                url: self.profile.tracks.href,
                data: {
                    tracks: [{
                        uri: uri
                    }]
                }
            },
            function(response) {
                console.log('track removed');
                self.profile.snapshot_id = response.snapshot_id;

                callback();

            }, function(err) {
                console.log(err.message);
                callback(err);
            }
        );
    };


    app.Entities.Playlist = Playlist;
})(MYMP);
