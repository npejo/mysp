/**
 *
 */
(function(app) {
    'use strict';

    var PlaylistDetailsView = function(options) {
        app.Views.CoreView.call(this, options);

        this.playlistModel = null;
    };

    PlaylistDetailsView.prototype = Object.create(app.Views.CoreView.prototype);

    PlaylistDetailsView.prototype.render = function() {
        console.log(this.playlistModel.getProfile());
        this.renderSelf();
    };

    PlaylistDetailsView.prototype.addEventListeners = function() {
        //this.element.getElementsByClassName('dummy-link')[0]
        //    .addEventListener('click', function() {
        //        console.log({nikola: 123});
        //    }, false);
    };

    PlaylistDetailsView.prototype.getTemplate = function() {
        return this.showViewState();
    };

    PlaylistDetailsView.prototype.showViewState = function() {
        var tmp = '<h1 class="playlist-name">' + this.playlistModel.getName() + '</h1>';

        var privateInfo = this.playlistModel.isPrivate() ? 'private' : 'public';
        tmp += '<span class="playlist-private-info">' + privateInfo + '</span>';

        var image = this.playlistModel.getImage('small') || '';
        console.log(image);
        if (image) {
            tmp += '<img src="' + image + '"/>';
        }

        return tmp;
    };

    PlaylistDetailsView.prototype.setPlaylistService = function(playlistModel) {
        this.playlistModel = playlistModel;
    };

    app.Views.PlaylistDetailsView = PlaylistDetailsView;
})(MYMP);