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
        this.queueModel = options.queueModel;
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

        // bind click to add playlist to current queue
        this.addListener('.playlist-add-to-queue', 'click', this.addPlaylistToQueue.bind(this));
    };

    /**
     * Display view or edit template depending on the `viewState` property
     *
     * @returns {string}
     */
    PlaylistDetailsView.prototype.getTemplate = function() {
        var template = '';
        var image = this.playlistModel.getImage('medium') || '';
        if (image) {
            template += '<div class="col-1-3 text-center">' +
                '<img class="playlist-image" src="' + image + '"/>' +
            '</div>';
        }

        var secondCol = image ? 'col-2-3' : 'col-3-3';
        template += '<div class="' + secondCol + '">'
                + (this.viewState === 'edit' ? this.showEditState() : this.showViewState()) +
            '</div>';

        // add Add to queue button
        template += '<button class="playlist-add-to-queue">Add To Queue</button>';
        return template;
    };

    /**
     * Inject/Set the `playlistModel` dependency
     *
     * @param playlistModel
     */
    PlaylistDetailsView.prototype.setPlaylistModel = function(playlistModel) {
        this.playlistModel = playlistModel;
    };

    /**
     * Return the `view` mode template as string
     *
     * @private
     * @returns {string}
     */
    PlaylistDetailsView.prototype.showViewState = function() {
        var tmp = '<h2 class="playlist-name">' + this.playlistModel.getName() + '</h2>';

        var isPublic = this.playlistModel.isPublic() ? 'public' : 'private';
        tmp += '<span class="playlist-type">' + isPublic + '</span>';

        tmp += '<button class="playlist-details-edit pl-btn">Edit</button>';

        return tmp;
    };

    /**
     * Return the `edit` mode template as string
     *
     * @private
     * @returns {string}
     */
    PlaylistDetailsView.prototype.showEditState = function() {
        var tmp = '<input type="text" class="playlist-details-name pl-control" value="' + this.playlistModel.getName() + '"/>';

        var isPublic = this.playlistModel.isPublic();
        tmp += '<select class="playlist-details-type pl-control">' +
            '<option value="private" ' + (!isPublic ? 'selected': '') +'>Private</option>' +
            '<option value="public" ' + (isPublic ? 'selected': '') +'>Public</option>' +
        '</select>';

        tmp += '<button class="playlist-details-save pl-btn">Save</button>&nbsp;' +
            '<button class="playlist-details-cancel pl-btn">Cancel</button>';

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
                if (err) {
                    return self.appEvents.publish('logMsg', {
                        type: 'error',
                        msg: 'Error while updating playlist details!'
                    });
                }

                self.user.setPlaylist(self.playlistModel.getData());
                self.appEvents.publish('playlistDetailsUpdate', updateData);
                self.viewState = 'view';
                self.render();

                self.appEvents.publish('logMsg', {
                    type: 'info',
                    msg: 'Playlist details updated'
                });
            }
        );
    };

    /**
     * Add the complete playlist to current playing queue
     */
    PlaylistDetailsView.prototype.addPlaylistToQueue = function() {
        this.queueModel.addTracks(this.playlistModel.getTracks());

        this.appEvents.publish('logMsg', {
            type: 'info',
            msg: 'Tracks from ' + this.playlistModel.getName() + ' are added to playing queue'
        });
    };

    app.Views.PlaylistDetailsView = PlaylistDetailsView;
})(MYSP);