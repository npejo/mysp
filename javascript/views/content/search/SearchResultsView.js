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
        this.searchModel = options.searchModel;
        this.TracksTableView = options.TracksTableView;
    };

    // chain the prototype of the parent object
    SearchResultsView.prototype = Object.create(app.Views.CoreView.prototype);

    /**
     * Bind event actions on elements within the view
     */
    SearchResultsView.prototype.addEventListeners = function() {
        // bind click to load next results button
        this.addListener('.mymp-next-search-results', 'click', this.loadNextResults.bind(this));
    };

    /**
     * Load search results and render them
     */
    SearchResultsView.prototype.render = function() {
        this.renderSelf(true);

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
        // get the markup for the search results table
        var resultsTable = (new this.TracksTableView(this.searchModel.tracks)).render();

        if (this.searchModel.hasNextResults()) {
            var loadNextBtn = '<button class="mymp-next-search-results">Load more</button>';
        }
        return resultsTable + loadNextBtn;
    };

    /**
     * Load next results for the same search query
     */
    SearchResultsView.prototype.loadNextResults = function() {
        var self = this;
        this.searchModel.loadNextResults(function(err) {
            if (err) return console.log('error on loading more search results');

            self.render();
        });
    };

    app.Views.SearchResultsView = SearchResultsView;
})(MYMP);
