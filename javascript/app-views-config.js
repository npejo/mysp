(function(app) {
    'use strict';

    app.ViewsConfig.menu = getMenuView;
    app.ViewsConfig.content = getContentView;
    app.ViewsConfig.playlistPage = getPlaylistPageView;
    app.ViewsConfig.queuePage = getQueuePageView;
    app.ViewsConfig.searchPage = getSearchPageView;

    /**
     * Return configured instance of the main menu view
     * with all subviews
     *
     * @param route
     * @param User
     * @returns {MYMP.Views.MenuView}
     */
    function getMenuView(route, User) {
        return new app.Views.MenuView({
            element: 'mymp-menu',
            route: route,
            events: app.Events,
            subViews: {
                browseMenu: new app.Views.SearchMenuView({
                    element: 'mymp-menu-search',
                    route: route,
                    events: app.Events
                }),
                playlistsMenu: new app.Views.PlaylistsMenuView({
                    element: 'mymp-menu-playlists',
                    user: User,
                    events: app.Events,
                    playlistModel: new app.Models.Playlist(app.Utils.ajax)
                })
            }
        });
    }

    /**
     * Return configured instance of the content view
     * with all subviews
     *
     * @param route
     * @param User
     * @returns {MYMP.Views.ContentView}
     */
    function getContentView(route, User) {
        return new app.Views.ContentView({
            element: 'mymp-content',
            route: route,
            events: app.Events,
            subViews: {
                search: app.ViewsConfig.searchPage(route, User),
                playlist: app.ViewsConfig.playlistPage(route, User),
                queue: app.ViewsConfig.queuePage(route, User)
            }
        });
    }

    /**
     * Return configured instance of the playlist page view
     * with all subviews
     *
     * @param route
     * @param User
     * @returns {MYMP.Views.PlaylistPageView}
     */
    function getPlaylistPageView(route, User, Auth) {
        return new app.Views.PlaylistPageView({
            element: 'mymp-content',
            route: route,
            user: User,
            auth: Auth,
            playlistModel: new app.Models.Playlist(app.Utils.ajax),
            subViews: {
                playlistDetails: new app.Views.PlaylistDetailsView({
                    element: 'mymp-playlist-details',
                    events: app.Events,
                    user: User
                }),
                playlistTracks: new app.Views.PlaylistTracksView({
                    element: 'mymp-playlist-tracks',
                    events: app.Events,
                    user: User,
                    TracksTableView: app.Views.TracksTableView
                })
            }
        });
    }

    /**
     * Return configured instance of the current playing queue page with all subviews
     *
     * @returns {MYMP.Views.QueuePageView}
     */
    function getQueuePageView() {
        return new app.Views.QueuePageView({
            element: 'mymp-content',
            subViews: {
                queueTracks: new app.Views.QueueTracksView({
                    element: 'mymp-queue-tracks',
                    events: app.Events,
                    queueModel: new app.Models.Queue(app.Config),
                    TracksTableView: app.Views.TracksTableView
                })
            }
        });
    }

    /**
     * Return configured instance of the search page view
     * with all subviews
     *
     * @param route
     * @returns {MYMP.Views.SearchPageView}
     */
    function getSearchPageView(route, User) {
        return new app.Views.SearchPageView({
            element: 'mymp-content',
            route: route,
            subViews: {
                searchForm: new app.Views.SearchFormView({
                    element: 'mymp-search-form',
                    events: app.Events
                }),
                searchResults: new app.Views.SearchResultsView({
                    element: 'mymp-search-results',
                    events: app.Events,
                    user: User,
                    searchModel: new app.Models.Search(app.Utils.ajax),
                    playlistModel: new app.Models.Playlist(app.Utils.ajax),
                    queueModel: new app.Models.Queue(app.Config),
                    TracksTableView: app.Views.TracksTableView
                })
            }
        });
    }

})(MYMP);