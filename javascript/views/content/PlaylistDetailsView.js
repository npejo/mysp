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

        this.delegate('.playlist-details-edit', 'click', setEditViewState.bind(this));
        this.delegate('.playlist-details-save', 'click', this.savePlaylistDetails.bind(this));

        //var self = this;
        function setEditViewState() {
            this.viewState = 'edit';
            this.render();
        }
    };

    PlaylistDetailsView.prototype.getTemplate = function() {
        var template = this.viewState === 'edit' ? this.showEditState() : this.showViewState();
        return template;
    };

    PlaylistDetailsView.prototype.showViewState = function() {
        var tmp = '<h1 class="playlist-name">' + this.playlistModel.getName() + '</h1>';

        var isPublic = this.playlistModel.isPublic() ? 'public' : 'private';
        tmp += '<span class="playlist-type">' + isPublic + '</span>';

        var image = this.playlistModel.getImage('small') || '';
        if (image) {
            tmp += '<img class="playlist-image" src="' + image + '"/>';
        }

        tmp += '<button class="playlist-details-edit">Edit</button>';

        return tmp;
    };

    PlaylistDetailsView.prototype.showEditState = function() {
        var tmp = '<input type="text" class="playlist-details-name" value="' + this.playlistModel.getName() + '"/>';

        var isPublic = this.playlistModel.isPublic();
        tmp += '<select class="playlist-details-type">' +
            '<option value="private" ' + (!isPublic ? 'selected': '') +'>Private</option>' +
            '<option value="public" ' + (isPublic ? 'selected': '') +'>Public</option>' +
        '</select>';

        var image = this.playlistModel.getImage('small') || '';
        if (image) {
            tmp += '<img class="playlist-image" src="' + image + '"/>';
        }

        tmp += '<button class="playlist-details-save">Save</button>';
        return tmp;
    };

    PlaylistDetailsView.prototype.setPlaylistService = function(playlistModel) {
        this.playlistModel = playlistModel;
    };

    PlaylistDetailsView.prototype.savePlaylistDetails = function() {
        var newName = this.element.getElementsByClassName('playlist-details-name')[0].value;
        var isPublic = this.element.getElementsByClassName('playlist-details-type')[0].value;
        isPublic = isPublic === 'public';
        this.playlistModel.setName(newName);
        this.playlistModel.setPublic(isPublic);
        var self = this;
        this.playlistModel.updatePlaylistDetails(
            {
                name: newName,
                public: isPublic
            },
            function(err) {
                if (err) return console.log('problem while updating playlist details');

                self.user.setPlaylist(self.playlistModel.getProfile());
                self.appEvents.trigger('playlistDetailsUpdate');
                self.viewState = 'view';
                self.render();
            }
        );
    };

    app.Views.PlaylistDetailsView = PlaylistDetailsView;
})(MYMP);