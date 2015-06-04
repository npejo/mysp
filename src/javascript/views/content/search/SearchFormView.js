(function(app) {
    'use strict';

    /**
     * Handles the rendering and actions of search form on search page
     *
     * @extends CoreView
     * @param options
     * @constructor
     */
    var SearchFormView = function(options) {
        // invoke the constructor of the parent object
        app.Views.CoreView.call(this, options);

        // injected dependencies
        this.appEvents = options.events;
    };

    // chain the prototype of the parent object
    SearchFormView.prototype = Object.create(app.Views.CoreView.prototype);

    /**
     * Bind event actions on elements within the view
     */
    SearchFormView.prototype.addEventListeners = function() {
        // bind click to make new search request from search page
        this.addListener('#mysp-search-form-btn', 'click', this.doSearch.bind(this));
        this.addListener('#mysp-search-form-input', 'keyup', this.doSearchOnEnter.bind(this));
    };

    /**
     * Return the main layout of the search page as string
     *
     * @returns {string}
     */
    SearchFormView.prototype.getTemplate = function() {
        var query = this.route.q || '';
        return '<input id="mysp-search-form-input" ' +
                'class="mysp-search-control" ' +
                'type="text" placeholder="Search for songs" ' +
                'value="' + query + '" />' +
            '<button id="mysp-search-form-btn" class="mysp-search-control">Search</button>';
    };

    /**
     * Handler for the make new search event
     *
     * @private
     */
    SearchFormView.prototype.doSearch = function() {
        var query = document.getElementById('mysp-search-form-input').value;
        if (query !== '') {
            this.goTo({page: 'search', q: query});
        }
    };

    /**
     * Handler for the make new search event on enter while focused in the search input
     *
     * @private
     */
    SearchFormView.prototype.doSearchOnEnter = function() {
        if (window.event.keyCode === 13) {
            this.doSearch();
        }
    };
    
    app.Views.SearchFormView = SearchFormView;
})(MYSP);
