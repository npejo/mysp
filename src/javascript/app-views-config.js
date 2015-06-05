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
     * @returns {MYSP.Views.MenuView}
     */
    function getMenuView(route, User) {
        return new app.Views.MenuView({
            element: 'mysp-menu',
            route: route,
            events: app.Events,
            subViews: {
                browseMenu: new app.Views.SearchMenuView({
                    element: 'mysp-menu-search',
                    route: route,
                    events: app.Events
                }),
                playlistsMenu: new app.Views.PlaylistsMenuView({
                    element: 'mysp-menu-playlists',
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
     * @returns {MYSP.Views.ContentView}
     */
    function getContentView(route, User, Auth, Queue) {
        return new app.Views.ContentView({
            element: 'mysp-content',
            route: route,
            events: app.Events,
            subViews: {
                search: app.ViewsConfig.searchPage(route, User, Auth, Queue),
                playlist: app.ViewsConfig.playlistPage(route, User, Auth, Queue),
                queue: app.ViewsConfig.queuePage(route, User, Auth, Queue)
            }
        });
    }

    /**
     * Return configured instance of the playlist page view
     * with all subviews
     *
     * @param route
     * @param User
     * @param Auth
     * @param Queue
     * @returns {MYSP.Views.PlaylistPageView}
     */
    function getPlaylistPageView(route, User, Auth, Queue) {
        return new app.Views.PlaylistPageView({
            element: 'mysp-content',
            route: route,
            user: User,
            auth: Auth,
            playlistModel: new app.Models.Playlist(app.Utils.ajax),
            subViews: {
                playlistDetails: new app.Views.PlaylistDetailsView({
                    element: 'mysp-playlist-details',
                    events: app.Events,
                    user: User,
                    queueModel: Queue
                }),
                playlistTracks: new app.Views.PlaylistTracksView({
                    element: 'mysp-playlist-tracks',
                    events: app.Events,
                    user: User,
                    queueModel: Queue,
                    TracksTableView: app.Views.TracksTableView
                })
            }
        });
    }

    /**
     * Return configured instance of the current playing queue page with all subviews
     *
     * @returns {MYSP.Views.QueuePageView}
     */
    function getQueuePageView(route, User, Auth, Queue) {
        return new app.Views.QueuePageView({
            element: 'mysp-content',
            route: route,
            subViews: {
                queueTracks: new app.Views.QueueTracksView({
                    element: 'mysp-queue-tracks',
                    route: route,
                    events: app.Events,
                    queueModel: Queue,
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
     * @returns {MYSP.Views.SearchPageView}
     */
    function getSearchPageView(route, User, Auth, Queue) {
        return new app.Views.SearchPageView({
            element: 'mysp-content',
            route: route,
            subViews: {
                searchForm: new app.Views.SearchFormView({
                    element: 'mysp-search-form',
                    events: app.Events
                }),
                searchResults: new app.Views.SearchResultsView({
                    element: 'mysp-search-results',
                    events: app.Events,
                    user: User,
                    searchModel: new app.Models.Search(app.Utils.ajax),
                    playlistModel: new app.Models.Playlist(app.Utils.ajax),
                    queueModel: Queue,
                    TracksTableView: app.Views.TracksTableView
                })
            }
        });
    }

})(MYSP);