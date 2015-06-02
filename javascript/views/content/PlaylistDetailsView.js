(function(app) {
    'use strict';

    /**
     * Handles the rendering and actions of the playlist details section
     *
     * @extends CoreView
     * @param options
     * @constructor
     */
    var PlaylistDetailsView = function(options) {
        // invoke the constructor of the parent object
        app.Views.CoreView.call(this, options);

        // local property
        this.viewState = null;

        // injected dependencies
        this.appEvents = options.events;
        this.user = options.user;
        this.playlistModel = null;
    };

    // chain the prototype of the parent object
    PlaylistDetailsView.prototype = Object.create(app.Views.CoreView.prototype);

    /**
     * Bind event actions on elements within the view
     */
    PlaylistDetailsView.prototype.addEventListeners = function() {
        // bind click to display edit mode
        this.addListener('.playlist-details-edit', 'click', this.setViewMode.bind(this, 'edit'));

        // bind click to display view mode
        this.addListener('.playlist-details-cancel', 'click', this.setViewMode.bind(this, 'view'));

        // bind click to save playlist details data
        this.addListener('.playlist-details-save', 'click', this.savePlaylistDetails.bind(this));
    };

    /**
     * Display view or edit template depending on the `viewState` property
     *
     * @returns {string}
     */
    PlaylistDetailsView.prototype.getTemplate = function() {
        var template = this.viewState === 'edit' ? this.showEditState() : this.showViewState();
        return template;
    };

    /**
     * Inject/Set the `playlistModel` dependency
     *
     * @param playlistModel
     */
    PlaylistDetailsView.prototype.setPlaylistService = function(playlistModel) {
        this.playlistModel = playlistModel;
    };

    /**
     * Return the `view` mode template as string
     *
     * @private
     * @returns {string}
     */
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

    /**
     * Return the `edit` mode template as string
     *
     * @private
     * @returns {string}
     */
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

        tmp += '<button class="playlist-details-save">Save</button>&nbsp;' +
            '<button class="playlist-details-cancel">Cancel</button>';

        return tmp;
    };

    /**
     * Handler method for display mode switching event
     *
     * @private
     * @param mode
     */
    PlaylistDetailsView.prototype.setViewMode = function(mode) {
        this.viewState = mode;
        this.render();
    };

    /**
     * Collect playlist data from the form and make update request
     */
    PlaylistDetailsView.prototype.savePlaylistDetails = function() {
        var updateData = {
            name: '',
            public: ''
        };

        updateData.name = this.element.getElementsByClassName('playlist-details-name')[0].value;

        var isPublic = this.element.getElementsByClassName('playlist-details-type')[0].value;
        updateData.public = isPublic === 'public';

        this.playlistModel.setName(updateData.name);
        this.playlistModel.setPublic(updateData.public);

        var self = this;
        this.playlistModel.updatePlaylistDetails(updateData,
            function(err) {
                if (err) return console.log('problem while updating playlist details');

                self.user.setPlaylist(self.playlistModel.getData());
                self.appEvents.publish('playlistDetailsUpdate', updateData);
                self.viewState = 'view';
                self.render();
            }
        );
    };

    app.Views.PlaylistDetailsView = PlaylistDetailsView;
})(MYMP);