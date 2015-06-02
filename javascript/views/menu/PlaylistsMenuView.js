(function(app) {
    'use strict';

    /**
     * Handles the rendering and actions of playlist section in the main menu
     *
     * @extends CoreView
     * @param options
     * @constructor
     */
    var PlaylistsMenuView = function(options) {
        // invoke the constructor of the parent object
        app.Views.CoreView.call(this, options);

        // injected dependencies
        this.user = options.user;
        this.appEvents = options.events;
        this.playlistModel = options.playlistModel;
    };

    // chain the prototype of the parent object
    PlaylistsMenuView.prototype = Object.create(app.Views.CoreView.prototype);

    /**
     * Bind event actions on elements within the view and
     * subscribe on application level events
     */
    PlaylistsMenuView.prototype.addEventListeners = function() {
        // prevent subscribing more than once
        if (!this.subscribed) {
            this.subscribed = true;

            // subscribe to application level event
            this.appEvents.subscribe('playlistDetailsUpdate', this.render.bind(this));
        }

        // bind click to display create new playlist form
        this.addListener('#menu-add-playlist-link', 'click', this.showNewPlaylistForm.bind(this));

        // bind click to hide the create new playlist form
        this.addListener('.menu-new-playlist-cancel-btn', 'click', this.hideNewPlaylistForm.bind(this));

        // bind click to save new playlist form
        this.addListener('.menu-new-playlist-save-btn', 'click', this.saveNewPlaylist.bind(this));
    };

    /**
     * Render the playlists menu section
     */
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

    /**
     * Return the playlist menu section template as string,
     * together with the create new playlist form
     *
     * @returns {string}
     */
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

    /**
     * Return the markup for single playlist link in the menu
     *
     * @private
     * @param playlist
     * @returns {string}
     */
    PlaylistsMenuView.prototype.drawPlaylistLink = function(playlist) {
        var a = document.createElement('a');
        a.href = '#page=playlist&id=' + playlist.id;
        a.text = playlist.name;

        var li = document.createElement('li');
        li.appendChild(a);

        return li.outerHTML;
    };

    /**
     * Handler for the show new playlist form event
     *
     * @private
     */
    PlaylistsMenuView.prototype.showNewPlaylistForm = function () {
        event.preventDefault();
        var addForm = this.element.getElementsByClassName('menu-add-playlist-form')[0];
        var addFormNewClasses = addForm.className.replace('hidden', '');
        addForm.className = addFormNewClasses;
    };

    /**
     * Handler for the hide new playlist form event
     *
     * @private
     */
    PlaylistsMenuView.prototype.hideNewPlaylistForm = function () {
        event.preventDefault();
        var addForm = this.element.getElementsByClassName('menu-add-playlist-form')[0];
        addForm.className += ' hidden';
    };

    /**
     * Handler for the save/submit new playlist form event
     *
     * @private
     */
    PlaylistsMenuView.prototype.saveNewPlaylist = function () {
        event.preventDefault();

        // read the playlist name
        var plName = this.element.getElementsByClassName('new-playlist-name')[0].value;
        if (plName === '') {
            return console.log('display err msg, empty pl name');
        }

        // read the playlist type
        var isPublic = this.element.getElementsByClassName('public-playlist')[0].checked;

        var self = this;

        // save new playlist
        this.playlistModel.createPlaylist(
            this.user.getId(),
            {name: plName, 'public': isPublic},
            function(err, playlist) {
                if (err) return console.log('display msg error on creating new playlist!');

                // on successful response, update the user playlists and
                // re-render the playlist menu section
                self.user.setPlaylist(playlist);
                self.render();

                console.log('new playlist created');
            }
        );
    };

    app.Views.PlaylistsMenuView = PlaylistsMenuView;
})(MYMP);
