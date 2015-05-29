/**
 *
 */
(function(app) {
    'use strict';

    var PlaylistsMenuView = function(options) {
        app.Views.CoreView.call(this, options);

        this.playlists = options.playlists;
    };

    PlaylistsMenuView.prototype = Object.create(app.Views.CoreView.prototype);

    PlaylistsMenuView.prototype.render = function() {
        app.Views.CoreView.prototype.render.call(this);

        // draw user playlists menu links
        var menuList = this.element.getElementsByClassName('menu-items-list')[0];
        var items = '';
        this.playlists.forEach(function(playlist) {
            items += this.drawPlaylistLink(playlist);
        }, this);

        menuList.innerHTML = items;
    };

    PlaylistsMenuView.prototype.addEventListeners = function() {
        document.getElementById('mymp-menu-search-btn')
            .addEventListener('click', function() {
                var query = document.getElementById('mymp-menu-search').value;
                if (query !== '') {
                    window.location.hash = app.Utils.objToQuerystring({
                        page: 'search',
                        q: query
                    });
                }
            }, false);
    };

    PlaylistsMenuView.prototype.getTemplate = function() {
        return '<h2 class="menu-section-header">Playlists</h2>' +
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
