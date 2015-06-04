(function(app) {
    'use strict';

    /**
     * Handles the search requests
     *
     * @param ajaxService
     * @constructor
     */
    var Search = function(ajaxService) {
        this.tracks = [];
        this.tracksObjMap = {};
        this.nextResultsUrl = '';
        this.currentQuery = '';
        // injected dependencies
        this.ajaxService = ajaxService;
    };

    /**
     * Load search results for the specified query
     * if the query is same with `currentQuery` and there are already stored tracks,
     * return the stored results, don't make search request
     *
     */
    Search.prototype.loadResults = function(query, callback) {

        if (this.currentQuery === query && this.tracks.length > 0) {
            callback(null, this.tracks);
        } else {
            this.reset(query);
            this.makeSearchRequest({url: '/search?type=track&q=' + query + '&market=from_token'}, callback);
        }
    };

    /**
     * Load next search results using the url stored in `nextResultsUrl` property
     */
    Search.prototype.loadNextResults = function(callback) {
        this.makeSearchRequest({url: this.nextResultsUrl}, callback);
    };

    /**
     * Reset the local properties related to the state of the search
     *
     * @param q
     */
    Search.prototype.reset = function(q) {
        this.currentQuery = q;
        this.nextResultsUrl = '';
        this.tracks = [];
        this.tracksObjMap = {};
    };

    Search.prototype.hasNextResults = function() {
        return !!this.nextResultsUrl;
    };
    /**
     * GET - Make search request for tracks using the specified options
     *
     * @param options
     * @param callback
     */
    Search.prototype.makeSearchRequest = function(options, callback) {
        var self = this;
        this.ajaxService.get(options,
            function(response) { // success
                if (response.tracks.items) {
                    // append the response items to `tracks` array
                    self.tracks = self.tracks.concat(response.tracks.items);
                    self.appendToObjMap(response.tracks.items);

                    // update the url for loading the next results
                    self.nextResultsUrl = response.tracks.next;

                    callback(null, self.tracks);
                }
            }, function(err) { // error
                callback(err);
            }
        );
    };

    /**
     * Map tracks list as object with the trackUri as key
     * The enable easy lookup for specific track
     *
     * @param tracks
     */
    Search.prototype.appendToObjMap = function(tracks) {
        tracks.forEach(function(t) {
            this.tracksObjMap[t.uri] = t;
        }, this);
    };

    /**
     * Return track object
     *
     * @param trackUri
     * @returns {object}
     */
    Search.prototype.getTrackModel = function(trackUri) {
        return this.tracksObjMap[trackUri] ? this.tracksObjMap[trackUri] : null;
    };

    app.Models.Search = Search;
})(MYSP);