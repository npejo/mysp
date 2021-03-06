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

        // injected dependencies
        this.route = options.route;
    };

    // chain the prototype of the parent object
    SearchPageView.prototype = Object.create(app.Views.CoreView.prototype);

    /**
     * Render the search page
     */
    SearchPageView.prototype.render = function() {
        this.renderSelf();
        this.updateSubviewsRoute(this.route);
        this.renderSubviews();
    };

    /**
     * Return the main layout of the search page as string
     *
     * @returns {string}
     */
    SearchPageView.prototype.getTemplate = function() {
        return '<div id="mysp-search-form" class="content-section text-center">' + this.route.q + '</div>' +
            '<div id="mysp-search-results" class="content-section text-center"></div>';
    };
    
    app.Views.SearchPageView = SearchPageView;
})(MYSP);
