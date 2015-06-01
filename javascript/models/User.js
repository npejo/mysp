(function(app) {
    'use strict';

    /**
     * Handles data and actions related to the logged in user
     *
     * @param profileData
     * @param ajaxService
     * @constructor
     */
    var User = function(ajaxService) {
        // local properties
        this.profile = {};
        this.playlists = {};

        // injected dependencies
        this.ajaxService = ajaxService;
    };

    /**
     * Return the `id` property from user profile
     * @returns {string}
     */
    User.prototype.getId = function() {
        return this.profile.id;
    };

    /**
     * Return the `displayName` (full name) property from user profile
     * @returns {string}
     */
    User.prototype.getName = function() {
        return this.profile.displayName;
    };

    /**
     * Return the full user profile object
     * @returns {object}
     */
    User.prototype.getProfile = function() {
        return this.profile;
    };

    /**
     * Return the list of user's playlists
     * @returns {string}
     */
    User.prototype.getPlaylists = function() {
        return this.playlists.items;
    };

    /**
     * Return the user's playlist with id = `playlistId`
     * Return null if the playlist for the requested id doesn't exist
     * @returns {null|object}
     */
    User.prototype.getPlaylist = function(playlistId) {
        return this.playlists.items[playlistId] || null;
    };

    /**
     * Add playlist object in the list of user's playlists
     * @returns {string}
     */
    User.prototype.setPlaylist = function(playlistObj) {
        this.playlists.items[playlistObj.id] = playlistObj;
    };

    /**
     * Load the profile of the logged user authenticated with valid oauth token
     * Invoke the `callback` function received on input and pass the response data or error
     * @returns {string}
     */
    User.prototype.loadProfile = function(callback) {
        var self = this;

        this.ajaxService.get({url: '/me'},
            function(data) { // success
                console.log('user loaded');

                // update the `profile` property with received data
                self.profile = data;
                callback(null, self);

            }, function(err) { // error
                console.log(err);
                callback(err, null);
            }
        );
    };

    /**
     * Load the playlists of the logged user
     * This method is fixed to loading maximum 50 playlists,
     * pagination is not implemented in this version
     * 
     * @returns {string}
     */
    User.prototype.loadPlaylists = function(callback) {
        var limit = 50;
        var offset = 0;

        var self = this;
        this.ajaxService.get(
            {
                url: '/users/' + encodeURIComponent(this.getId()) + '/playlists' +
                '?offset=' + offset + '&limit=' + limit
            },
            function(response) { // success
                console.log('playlists loaded');

                // update the `playlists` property with received data
                self.playlists = response;

                // map the `playlists.items` array into object that has the `playlistId` as key
                var itemsObj = {};
                self.playlists.items.forEach(function(pl) {
                    itemsObj[pl.id] = pl;
                }, this);
                self.playlists.items = itemsObj;

                callback();

            }, function(err) { // error
                console.log(err.message);
                callback(err);
            }
        );
    };

    app.Models.User = User;
})(MYMP);
