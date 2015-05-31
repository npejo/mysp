/**
 *
 */
(function(app) {
    'use strict';

    var PlaylistsMenuView = function(options) {
        app.Views.CoreView.call(this, options);

        this.user = options.user;
        this.appEvents = options.events;
    };

    PlaylistsMenuView.prototype = Object.create(app.Views.CoreView.prototype);

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

    PlaylistsMenuView.prototype.addEventListeners = function() {
        this.appEvents.on('playlistDetailsUpdate', reRenderPlaylistMenu, this);

        this.delegate('#menu-add-playlist-link', 'click', function(event) {
            console.log(event);
            console.log('aaaaaaaaaaaaa');
        }, this);

        function reRenderPlaylistMenu(data) {
            console.log(data);
            console.log(this.user.getPlaylists());
            this.render();
        }

        function showNewPlaylistForm(e) {
            alert('vleze');
            e.preventDefault();
            console.log('show it!!!');
        }
    };

    PlaylistsMenuView.prototype.getTemplate = function() {
        return '<h2 class="menu-section-header">Playlists</h2>' +
            '<a id="menu-add-playlist-link" href="#">+ Add new playlist</a>' +
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

    app.Views.PlaylistsMenuView = PlaylistsMenuView;
})(MYMP);
