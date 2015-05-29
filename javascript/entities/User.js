/**
 *
 */
(function(app) {
    'use strict';

    var User = function(profileData, ajaxService) {
        this.profile = profileData || {};
        this.playlists = {};

        this.ajaxService = ajaxService;
    };

    User.prototype.getId = function() {
        return this.profile.id;
    };

    User.prototype.getName = function() {
        return this.profile.displayName;
    };

    User.prototype.getProfile = function() {
        return this.profile;
    };

    User.prototype.getPlaylists = function() {
        return this.playlists.items;
    };

    User.prototype.getPlaylist = function(playlistId) {
        return this.playlists.items[playlistId] || null;
    };

    User.prototype.loadProfile = function(callback) {
        var usr = this;
        this.ajaxService.get({url: '/me'},
            function(data, xhr) {
                console.log('user loaded');
                usr.profile = data;
                callback(null, usr, xhr);
            }, function(err) {
                console.log(err);
                callback(err, null);
            }
        );
    };

    User.prototype.loadPlaylists = function(callback) {
        var limit = 50;
        var offset = 0;

        var usr = this;
        this.ajaxService.get(
            {
                url: '/users/' + encodeURIComponent(this.getId()) + '/playlists' +
                '?offset=' + offset + '&limit=' + limit
            },
            function(response) {
                console.log('playlists loaded');
                usr.playlists = response;

                var itemsObj = {};
                usr.playlists.items.forEach(function(pl) {
                    itemsObj[pl.id] = pl;
                }, this);
                usr.playlists.items = itemsObj;

                callback(null, usr);
            }, function(err) {
                console.log(err.message);
                callback(err, null);
            }
        );
    };

    app.Entities.User = User;
})(MYMP);
