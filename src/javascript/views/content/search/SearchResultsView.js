(function(app) {
    'use strict';

    /**
     * Handles the rendering and actions of the search results section
     * on search page
     *
     * @extends CoreView
     * @param options
     * @constructor
     */
    var SearchResultsView = function(options) {
        // invoke the constructor of the parent object
        app.Views.CoreView.call(this, options);

        this.appEvents = options.events;
        this.user = options.user;
        this.searchModel = options.searchModel;
        this.playlistModel = options.playlistModel;
        this.queueModel = options.queueModel;
        this.TracksTableView = options.TracksTableView;
    };

    // chain the prototype of the parent object
    SearchResultsView.prototype = Object.create(app.Views.CoreView.prototype);

    /**
     * Bind event actions on elements within the view
     */
    SearchResultsView.prototype.addEventListeners = function() {
        // bind click to load next results button
        this.addListener('.mysp-search-results-next', 'click', this.loadNextResults.bind(this));
        this.addListener('.mysp-search-results-add-to', 'change', this.trackAddTo.bind(this));
    };

    /**
     * Load search results and render them
     */
    SearchResultsView.prototype.render = function() {
        this.renderSelf(true);

        // display logo by default
        this.element.innerHTML = '<p>Hello, this is <b>MY Spotify Player</b></p>' +
            '<p>Your playlist from Spotify are displayed in the left column.</p>' +
            '<p>You can manage the tracks or create new playlists from here.</p>';

        // load search results if there is `query` in current route
        if (this.route.q && this.route.q !== '') {

            // display initial message
            this.element.innerHTML = 'Searching...';

            // load the search results for the specified query
            var self = this;
            this.searchModel.loadResults(this.route.q, function(err, tracks) {
                if (err) return console.log('error on search request');

                if (tracks && tracks.length > 0) {
                    // display the results table
                    self.element.innerHTML = self.drawResults();
                    self.addEventListeners();
                } else {
                    // display message that there are no results
                    self.element.innerHTML = 'No results for: ' + self.route.q;
                }
            });
        }
    };

    /**
     * Return the markup with the current search results in the SearchModel
     * and the 'Load more' button
     *
     * @returns {string}
     */
    SearchResultsView.prototype.drawResults = function() {
        var userPlaylists = this.user.getPlaylists();

        // get the markup for the search results table
        var resultsTable = (new this.TracksTableView(
            {
                tracks: this.searchModel.tracks,
                playlists: userPlaylists,
                actions: ['add-to']
            }
        )).render();

        var loadNextBtn = '';
        if (this.searchModel.hasNextResults()) {
            loadNextBtn = '<div class="text-center"><button class="mysp-search-results-next btn">Load more</button></div>';
        }
        return resultsTable + loadNextBtn;
    };

    /**
     * Handler for load next results for the same search query
     */
    SearchResultsView.prototype.loadNextResults = function() {
        var self = this;
        this.searchModel.loadNextResults(function(err) {
            if (err) return console.log('error on loading more search results');

            self.render();
        });
    };

    /**
     * Handler for adding track to current queue or specific playlist
     */
    SearchResultsView.prototype.trackAddTo = function() {
        var self = this;
        var targetElement = window.event.currentTarget;
        var currentValue = targetElement.value;

        // do nothing if current value is empty
        if (currentValue === '') {
            return;
        }

        var trackUri = targetElement.getAttribute('data-track-uri');

        if (currentValue === 'current-queue') {
            var tModel = this.searchModel.getTrackModel(trackUri);
            if (tModel) {
                this.queueModel.addTracks(tModel);
                // reset current selection of target element
                targetElement.selectedIndex = 0;
                console.log('track added to current queue');
            } else {
                console.log('The track data is not found');
            }
        } else {
            var playlistProfile = this.user.getPlaylist(currentValue);

            this.playlistModel.setProfile(playlistProfile);
            this.playlistModel.addTracks([trackUri], function(err) {
                // reset current selection of target element
                targetElement.selectedIndex = 0;

                if (err) return console.log('error while adding track to list');
                console.log('The track was added to ' + self.playlistModel.getName());
            });
        }

    };

    app.Views.SearchResultsView = SearchResultsView;
})(MYSP);
