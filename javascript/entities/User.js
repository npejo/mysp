/**
 *
 */
(function(app) {
    'use strict';

    var User = function(profileData, token, ajaxService) {
        this.profile = profileData || {};
        this.playlists = {};

        this.token = token;
        this.ajaxService = ajaxService;
    };

    User.prototype.isLoggedIn = function() {
        return this.token !== '';
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

    User.prototype.loadProfile = function(callback) {
        if (!this.token) {
            return null;
        }

        var that = this;
        this.ajaxService.get({
            url: '/me',
            headers: {
                'Authorization': 'Bearer ' + this.token
            }
        }, function(data, xhr) {
            console.log('user loaded');
            that.profile = data;
            callback(null, this, xhr);
        }, function(err) {
            console.log(err);
            callback(err, null);
        });
    };

    User.prototype.loadPlaylists = function(callback) {
        if (!this.token) {
            return null;
        }

        var limit = 50;
        var offset = 0;

        var that = this;
        this.ajaxService.get({
            url: '/users/' + encodeURIComponent(this.getId()) + '/playlists' +
            '?offset=' + offset + '&limit=' + limit,
            headers: {
                'Authorization': 'Bearer ' + this.token
            }
        }, function(playlists, xhr) {
            console.log('playlists loaded');
            that.playlists = playlists;
            callback(null, xhr);
        }, function(err) {
            console.log(err.message);
            callback(err, null);
        });
    };

    app.Entities.User = User;
})(MYMP);
