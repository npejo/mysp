(function(app) {
    'use strict';

    /**
     * Handles the rendering and actions of playlist page
     *
     * @extends CoreView
     * @param options
     * @constructor
     */
    var SearchPageView = function(options) {
        // invoke the constructor of the parent object
        app.Views.CoreView.call(this, options);
    };

    // chain the prototype of the parent object
    SearchPageView.prototype = Object.create(app.Views.CoreView.prototype);

    /**
     * Render the playlist page
     */
    SearchPageView.prototype.render = function() {

    };

    /**
     * Return the main layout of the search page as string
     *
     * @returns {string}
     */
    SearchPageView.prototype.getTemplate = function() {
        return '<div id="search-form"></div>' +
            '<div id="search-results"></div>';
    };
    
    app.Views.SearchPageView = SearchPageView;
})(MYMP);
