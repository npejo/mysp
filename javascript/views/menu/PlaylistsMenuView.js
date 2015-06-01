/**
 *
 */
(function(app) {
    'use strict';

    var PlaylistsMenuView = function(options) {
        app.Views.CoreView.call(this, options);

        this.user = options.user;
        this.appEvents = options.events;
        this.playlistModel = options.playlistModel;
    };

    PlaylistsMenuView.prototype = Object.create(app.Views.CoreView.prototype);

    PlaylistsMenuView.prototype.addEventListeners = function() {
        if (!this.subscribed) {
            this.subscribed = true;
            this.appEvents.on('PlaylistsMenuView', 'playlistDetailsUpdate', this.render.bind(this));
        }

        this.delegate('#menu-add-playlist-link', 'click', this.showNewPlaylistForm.bind(this));
        this.delegate('.menu-new-playlist-cancel-btn', 'click', this.hideNewPlaylistForm.bind(this));
        this.delegate('.menu-new-playlist-save-btn', 'click', this.saveNewPlaylist.bind(this));

    };

    PlaylistsMenuView.prototype.render = function() {
        this.renderSelf();

        var content = '';

        // get the already loaded playlists in the user model
        var playlists = this.user.getPlaylists();

        // draw user playlists menu links
        var menuList = this.element.getElementsByClassName('menu-items-list')[0];
        for (var pl in playlists) {
            if (playlists.hasOwnProperty(pl)) {
                content += this.drawPlaylistLink(playlists[pl]);
            }
        }

        menuList.innerHTML = content;
    };

    PlaylistsMenuView.prototype.getTemplate = function() {
        return '<h2 class="menu-section-header">Playlists</h2>' +
            '<a id="menu-add-playlist-link" href="#">+ Add new playlist</a>' +
            '<div class="menu-add-playlist-form hidden">' +
                '<div class="form-row">' +
                    '<input type="text" class="new-playlist-name" name="new-playlist-name" value=""/>' +
                '</div>' +
                '<div class="form-row">' +
                    'Private <input type="radio" class="new-playlist-type private-playlist" name="new-playlist-type" value="private" checked />&nbsp;' +
                    'Public <input type="radio" class="new-playlist-type public-playlist" name="new-playlist-type" value="public"/>' +
                '</div>' +
                '<div class="form-row">' +
                    '<button class="menu-new-playlist-save-btn">Save</button>&nbsp;' +
                    '<button class="menu-new-playlist-cancel-btn">Cancel</button>' +
                '</div>' +

            '</div>' +
            '<ul class="menu-items-list"></ul>';
    };

    PlaylistsMenuView.prototype.drawPlaylistLink = function(playlist) {
        var a = document.createElement('a');
        a.href = '#page=playlist&id=' + playlist.id;
        a.text = playlist.name;

        var li = document.createElement('li');
        li.appendChild(a);

        return li.outerHTML;
    };

    PlaylistsMenuView.prototype.showNewPlaylistForm = function () {
        event.preventDefault();
        var addForm = this.element.getElementsByClassName('menu-add-playlist-form')[0];
        var addFormNewClasses = addForm.className.replace('hidden', '');
        addForm.className = addFormNewClasses;
    };

    PlaylistsMenuView.prototype.hideNewPlaylistForm = function () {
        event.preventDefault();
        var addForm = this.element.getElementsByClassName('menu-add-playlist-form')[0];
        addForm.className += ' hidden';
    };

    PlaylistsMenuView.prototype.saveNewPlaylist = function () {
        event.preventDefault();

        var plName = this.element.getElementsByClassName('new-playlist-name')[0].value;
        if (plName === '') {
            return console.log('display err msg, empty pl name');
        }

        var isPublic = this.element.getElementsByClassName('public-playlist')[0].checked;

        var self = this;
        this.playlistModel.createPlaylist(
            this.user.getId(),
            {name: plName, 'public': isPublic},
            function(err, playlist) {
                if (err) return console.log('display msg error on creating new playlist!');

                self.user.setPlaylist(playlist);
                self.render();
                console.log('new playlist created');
            }
        );
    };

    app.Views.PlaylistsMenuView = PlaylistsMenuView;
})(MYMP);
