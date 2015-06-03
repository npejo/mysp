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
        this.addListener('#mymp-search-form-btn', 'click', this.doSearch.bind(this));
    };

    /**
     * Return the main layout of the search page as string
     *
     * @returns {string}
     */
    SearchFormView.prototype.getTemplate = function() {
        var query = this.route.q || '';
        return '<input id="mymp-search-form-input" ' +
                'class="mymp-search-control" ' +
                'type="text" placeholder="Search for songs" ' +
                'value="' + query + '" />' +
            '<button id="mymp-search-form-btn" class="mymp-search-control">Search</button>';
    };

    /**
     * Handler for the make new search event
     *
     * @private
     */
    SearchFormView.prototype.doSearch = function() {
        var query = document.getElementById('mymp-search-form-input').value;
        if (query !== '') {
            this.goTo({page: 'search', q: query});
        }
    };
    
    app.Views.SearchFormView = SearchFormView;
})(MYMP);
