/**
 *
 */
(function(app) {
    'use strict';

    var PlaylistDetailsView = function(options) {
        app.Views.CoreView.call(this, options);

        this.appEvents = options.events;
        this.user = options.user;
        this.playlistModel = null;
        this.viewState = null;
    };

    PlaylistDetailsView.prototype = Object.create(app.Views.CoreView.prototype);

    PlaylistDetailsView.prototype.render = function() {
        this.renderSelf();
    };

    PlaylistDetailsView.prototype.addEventListeners = function() {

        this.delegate('.js-playlist-edit', 'click', setEditViewState, this);
        this.delegate('.js-playlist-update', 'click', doPlaylistUpdate, this);

        //var self = this;
        function setEditViewState() {
            this.viewState = 'edit';
            this.render();
        }

        function doPlaylistUpdate() {
            var newName = this.element.getElementsByClassName('js-playlist-name')[0].value;
            var isPrivate = this.element.getElementsByClassName('js-playlist-private-info')[0].value;
            isPrivate = isPrivate === 'private';
            this.playlistModel.setName(newName);
            this.playlistModel.setPrivate(isPrivate);
            var self = this;
            this.playlistModel.updatePlaylistDetails(
                {
                    name: newName,
                    public: isPrivate
                },
                function(err) {
                    if (err) return console.log('problem while updating playlist details');

                    self.user.setPlaylist(self.playlistModel.getProfile());
                    self.appEvents.trigger('playlistDetailsUpdate');
                    self.viewState = 'view';
                    self.render();
                }
            );
        }
    };

    PlaylistDetailsView.prototype.getTemplate = function() {
        var template = this.viewState === 'edit' ? this.showEditState() : this.showViewState();
        return template;
    };

    PlaylistDetailsView.prototype.showViewState = function() {
        var tmp = '<h1 class="playlist-name">' + this.playlistModel.getName() + '</h1>';

        var privateInfo = this.playlistModel.isPrivate() ? 'private' : 'public';
        tmp += '<span class="playlist-private-info">' + privateInfo + '</span>';

        var image = this.playlistModel.getImage('small') || '';
        if (image) {
            tmp += '<img class="playlist-image" src="' + image + '"/>';
        }

        tmp += '<button class="js-playlist-edit">Edit</button>';

        return tmp;
    };

    PlaylistDetailsView.prototype.showEditState = function() {
        var tmp = '<input type="text" class="js-playlist-name" value="' + this.playlistModel.getName() + '"/>';

        var privateInfo = this.playlistModel.isPrivate();
        tmp += '<select class="js-playlist-private-info">' +
            '<option value="private" ' + (privateInfo ? 'selected': '') +'>Private</option>' +
            '<option value="public" ' + (!privateInfo ? 'selected': '') +'>Public</option>' +
        '</select>';

        var image = this.playlistModel.getImage('small') || '';
        if (image) {
            tmp += '<img class="playlist-image" src="' + image + '"/>';
        }

        tmp += '<button class="js-playlist-update">Save</button>';
        return tmp;
    };

    PlaylistDetailsView.prototype.setPlaylistService = function(playlistModel) {
        this.playlistModel = playlistModel;
    };

    app.Views.PlaylistDetailsView = PlaylistDetailsView;
})(MYMP);