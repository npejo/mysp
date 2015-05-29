/**
 *
 */
(function(app) {
    'use strict';

    var PlaylistPageView = function(options) {
        app.Views.CoreView.call(this, options);

        this.user = options.user;
        this.playlistModel = options.playlistModel;
    };

    PlaylistPageView.prototype = Object.create(app.Views.CoreView.prototype);

    PlaylistPageView.prototype.render = function() {
        if (!this.route.id) {
            console.log('missing playlist id');
            return this.goTo({page: 'search'});
        }

        var playlist = this.user.getPlaylist(this.route.id);
        if (!playlist) {
            console.log('requested playlist doesn\'t exist');
            return this.goTo({page: 'search'});
        }

        this.renderSelf();

        this.playlistModel.setProfile(playlist);

        this.subViews['playlistDetails'].setPlaylistService(this.playlistModel);
        this.subViews['playlistTracks'].setPlaylistService(this.playlistModel);

        var self = this;
        this.playlistModel.loadTracks(function(err, tracks) {
            if (err) {
                console.log('problem while loading tracks');
                return self.goTo({page: 'search'});
            }
            self.renderSubviews();
        });
    };

    PlaylistPageView.prototype.addEventListeners = function() {
        //this.element.getElementsByClassName('dummy-link')[0]
        //    .addEventListener('click', function() {
        //        console.log({nikola: 123});
        //    }, false);
    };

    PlaylistPageView.prototype.getTemplate = function() {
        return '<div id="playlist-details"></div>' +
            '<div id="playlist-tracks"></div>';
    };

    app.Views.PlaylistPageView = PlaylistPageView;
})(MYMP);