/**
 *
 */
(function(app) {
    'use strict';

    var SearchMenuView = function(options) {
        app.Views.CoreView.call(this, options);

        this.route = options.route;
        this.appEvents = options.events;

        this.hideSearch = false;
    };

    SearchMenuView.prototype = Object.create(app.Views.CoreView.prototype);

    SearchMenuView.prototype.addEventListeners = function() {
        if (!this.subscribed) {
            this.subscribed = true;
            this.appEvents.on('SearchMenuView', 'routeChange', this.reRenderSearchMenuSection.bind(this));
        }

        this.delegate('#mymp-menu-search-btn', 'click', this.doSearch.bind(this));
    };

    SearchMenuView.prototype.render = function() {
        this.hideSearch = this.route.page && this.route.page === 'search' ? true : false;
        this.renderSelf();
    };

    SearchMenuView.prototype.getTemplate = function() {
        var hide = this.hideSearch ? 'class="hidden"' : '';
        return '<div ' + hide + '>' +
            '<input type="text" id="mymp-menu-search-input" value=""/>' +
            '<button id="mymp-menu-search-btn">Search</button>' +
            '</div>';
    };

    SearchMenuView.prototype.doSearch = function() {
        var query = document.getElementById('mymp-menu-search-input').value;
        if (query !== '') {
            this.goTo({page: 'search', q: query});
        }
    };

    SearchMenuView.prototype.reRenderSearchMenuSection = function(newRoute) {
        this.route = newRoute;
        this.render();
    };

    app.Views.SearchMenuView = SearchMenuView;
})(MYMP);
