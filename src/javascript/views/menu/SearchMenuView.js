(function(app) {
    'use strict';

    /**
     *
     * @extends CoreView
     * @param options
     * @constructor
     */
    var SearchMenuView = function(options) {
        // invoke the constructor of the parent object
        app.Views.CoreView.call(this, options);

        // local property
        this.hideSearch = false;

        // injected dependencies
        this.route = options.route;
        this.appEvents = options.events;

    };

    // chain the prototype of the parent object
    SearchMenuView.prototype = Object.create(app.Views.CoreView.prototype);

    /**
     * Bind event actions on elements within the view and
     * subscribe on application level events
     */
    SearchMenuView.prototype.addEventListeners = function() {
        // prevent subscribing more than once
        if (!this.subscribed) {
            this.subscribed = true;

            // subscribe to application level event
            this.appEvents.subscribe('routeChange', this.reRenderSearchMenuSection.bind(this));
        }

        // bind click to make new search request from main menu
        this.addListener('#mysp-menu-search-btn', 'click', this.doSearch.bind(this));
        this.addListener('#mysp-menu-search-input', 'keyup', this.doSearchOnEnter.bind(this));
    };

    /**
     * Render the search menu section
     * This is the search form that is displayed when the user is on any other page than the search page
     */
    SearchMenuView.prototype.render = function() {
        // hide this view when the user is on the search page
        this.hideSearch = this.route.page && this.route.page === 'search' ? true : false;
        this.renderSelf();
    };

    /**
     * Return the search menu section template as string
     *
     * @returns {string}
     */
    SearchMenuView.prototype.getTemplate = function() {
        var hide = this.hideSearch ? 'hidden' : '';
        return '<div class="menu-search-form ' + hide + '">' +
            '<input type="text" id="mysp-menu-search-input" value="" placeholder="Search for songs"/>' +
            '<button id="mysp-menu-search-btn">Search</button>' +
            '</div>';
    };

    /**
     * Handler for the make new search event
     *
     * @private
     */
    SearchMenuView.prototype.doSearch = function() {
        var query = document.getElementById('mysp-menu-search-input').value;
        if (query !== '') {
            this.goTo({page: 'search', q: query});
        }
    };

    /**
     * Handler for the make new search event on enter while focused in the search input
     *
     * @private
     */
    SearchMenuView.prototype.doSearchOnEnter = function() {
        if (window.event.keyCode === 13) {
            this.doSearch();
        }
    };

    /**
     * Handler for the route change event
     *
     * @private
     * @param newRoute
     */
    SearchMenuView.prototype.reRenderSearchMenuSection = function(newRoute) {
        this.route = newRoute;
        this.render();
    };

    app.Views.SearchMenuView = SearchMenuView;
})(MYSP);
