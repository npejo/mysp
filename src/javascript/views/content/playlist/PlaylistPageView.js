(function(app) {
    'use strict';

    /**
     * Handles the rendering and actions of playlist page
     *
     * @extends CoreView
     * @param options
     * @constructor
     */
    var PlaylistPageView = function(options) {
        // invoke the constructor of the parent object
        app.Views.CoreView.call(this, options);

        // injected dependencies
        this.route = options.route;
        this.auth = options.auth;
        this.user = options.user;
        this.playlistModel = options.playlistModel;
    };

    // chain the prototype of the parent object
    PlaylistPageView.prototype = Object.create(app.Views.CoreView.prototype);

    /**
     * Render the playlist page
     */
    PlaylistPageView.prototype.render = function() {
        // check if the playlist id exists in the route object
        if (!this.route.id) {
            // redirect the user to search page
            return this.goTo({page: 'search'});
        }

        // check if requested playlist exists in user model
        var playlist = this.user.getPlaylist(this.route.id);
        if (!playlist) {
            // redirect the user to search page
            return this.goTo({page: 'search'});
        }

        this.renderSelf();

        this.playlistModel.reset();
        this.playlistModel.setProfile(playlist);

        // inject the loaded playlist model into page subViews
        this.subViews['playlistDetails'].setPlaylistModel(this.playlistModel);
        this.subViews['playlistTracks'].setPlaylistModel(this.playlistModel);

        // load playlist tracks
        var self = this;
        this.playlistModel.loadTracks(function(err, tracks) {
            if (err) {
                if (err.message.indexOf('401') !== -1) {
                    self.auth.logout();
                } else {
                    // redirect the user to search page
                    return self.goTo({page: 'search'});
                }
            }
            self.renderSubviews();
        });
    };

    /**
     * Return the main layout of the playlist page as string
     *
     * @returns {string}
     */
    PlaylistPageView.prototype.getTemplate = function() {
        return '<div id="mysp-playlist-details" class="row"></div>' +
            '<div id="mysp-playlist-tracks"></div>';
    };

    app.Views.PlaylistPageView = PlaylistPageView;
})(MYSP);