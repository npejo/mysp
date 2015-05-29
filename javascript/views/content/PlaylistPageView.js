/**
 *
 */
(function(app) {
    'use strict';

    var PlaylistPageView = function(options) {
        app.Views.CoreView.call(this, options);
        this.route = options.route || {};
    };

    PlaylistPageView.prototype = Object.create(app.Views.CoreView.prototype);

    PlaylistPageView.prototype.addEventListeners = function() {
        this.element.getElementsByClassName('dummy-link')[0]
            .addEventListener('click', function() {
                console.log({nikola: 123});
            }, false);
    };

    PlaylistPageView.prototype.getTemplate = function() {
        return '<h1>This is the playlist page</h1>' +
            'you are looking at playlist: ' + (this.route.id || 'none') +
            '<br/><a href="javascript://" class="dummy-link">klikaj playlist</a>';
    };

    app.Views.PlaylistPageView = PlaylistPageView;
})(MYMP);