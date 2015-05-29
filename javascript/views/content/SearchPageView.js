/**
 *
 */
(function(app) {
    'use strict';

    var SearchPageView = function(options) {
        app.Views.CoreView.call(this, options);
        this.route = options.route || {};
    };

    SearchPageView.prototype = Object.create(app.Views.CoreView.prototype);

    SearchPageView.prototype.addEventListeners = function() {
        console.log(this.element);
        this.element.getElementsByClassName('dummy-link')[0]
            .addEventListener('click', function() {
                console.log({nikola: 123});
            }, false);
    };

    SearchPageView.prototype.getTemplate = function() {
        return '<h1>This is the search page</h1>' +
            'you are searching for: ' + (this.route.q || 'nothing') +
            '<br/><a href="javascript://" class="dummy-link">klikaj</a>';
    };
    
    app.Views.SearchPageView = SearchPageView;
})(MYMP);
