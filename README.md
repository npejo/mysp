# MYSP - My Spotify Player

This application allows you to manage your music playlists on Spotify and simulates playing tracks queue.
It is deployed on Github and is accessible on the following urls:
  * http://nikola.pejoski.com/mysp/dist - production instance (minified and concatenated js)
  * http://nikola.pejoski.com/mysp/src - development instance (uses the source files)
  
Following are instructions how to install the application locally.
## Installation

clone this repository https://github.com/npejo/mysp.git

### Check configuration

There are two configuration files for the application, one for `development` and one for `production` environment.
They are set in [app-config.dev.js](src/javascript/app-config-dev.js) and [app-config-prod.js](src/javascript/app-config-prod.js) respectively.
Each of the configurations can use different `host`, `port`, and Spotify `client id`.

Set the `client id` of the Spotify application that you are going to use and make sure that you have listed 
valid **Redirect URIs** in the [application profile](https://developer.spotify.com/my-applications/).

Example:
For the default `development` web server configuration, the redirect uri should be:
`http://localhost:8888/auth-callback.html`

For the default `production` web server configuration, the redirect uri should be:
`http://localhost:8484/auth-callback.html`

### Run the application

You can run this application locally using `grunt` or by deploying the code to running web server.

#### Run using Grunt

Make sure that you have installed `grunt-cli`:
```shell
npm install -g grunt-cli
```

Install the development dependencies listed in `package.json`
```shell
npm install
```
##### Run in dev mode
To run the application in `dev` mode run:
```shell
grunt server:dev
```
this will start web server listening on the port set in `connect:dev` section in [Gruntfile.js](Gruntfile.js)
and will open web browser pointing to the `host` url set in `app-config-dev.js`.
To change the host and port information these are the two places that should be updated.

In `dev` mode the application is served from the `src` folder, using the development source files.

##### Run in prod mode
To run the application in `prod` mode run:
```shell
grunt server:prod
```
this will start web server listening to the port set in `connect:prod` section in [Gruntfile.js](Gruntfile.js)
and will open web browser pointing to the `host` url set in `app-config-prod.js`.

In `prod` mode the application is served from the `dist` folder, using minified and concatinated javascript files.

To re-build the code in `dist` folder run:
```shell
grunt build
```

##### Run unit tests
The testing environment is setup with `mochajs`, `chai` and `sinonjs`.
In interest of time I just wrote only few unit tests for one file.

Run tests using:
```shell
grunt test
```

#### Deploy on already running web server

##### Run in dev mode
Copy the content of the `src` folder somewhere on the web server and update the `host` in
[app-config.dev.js](src/javascript/app-config-dev.js).

##### Run in prod mode
Copy the content of the `dist` folder somewhere on the web server and update the `host` in
[app-config.js](dist/javascript/app-config.js).

## Content Description

* `src` - contains the source files
* `dist` - generated folder with `grunt build`, contains copy of the source files with minified and concatenated javascript
* `tests` - unit tests

### Source Code Description

* `index.html` - application entry point. Loads all dependencies and bootstraps the application
* `auth-callback.html` - file specified as redirect uri for the oauth authentication with Spotify. 
    The uri to this file should be specified in the list of redirect uris in the configuration of the Spotify App used for the authentication.

#### JS Source Code

The application is organized using the following logical entities:

* `utils` - generic helper methods used through the whole application
* `models` - handle the data and actions related to one segment of the application (User, Playlist, Queue...)
* `views` - handle the rendering and DOM interactions of application sections

*File by file description:*

* `app-config-dev.js` - development configuration
* `app-config-prod.js` - production configuration
* `app-initialize.js` - setup namespace for the application
* `app-run.js` - create instances of all application level models, check authentication and bootstrap the application
* `app-views-config.js` - configure the views with all its subviews (create instances and pass dependencies)

#### `models`
* `Auth.js` - Manage authentication information in localStorage and handle login, logout actions
* `Events.js` - Application level events subscribing and publishing. Allows interaction between views with custom events
* `User.js` - Handle data related to logged in user. Load his profile and playlists.
* `Playlist.js` - Handle data for single playlist and manage the CRUD over the tracks in it
* `Queue.js` - Handle the actions related to the current playing queue. Read/Write to localStorage
* `Search.js` - Manage search requests. Caches the loaded results for the last search query. 
The results list is refreshed when the query is changed.

#### `utils`
* `ajax.js` - Helper methods that simplify creating XHR (ajax) requests
* `querystring.js` - Helper methods for parsing simple querystring into object and object to querystring
* `time.js` - Helper method for parsing milliseconds timestamp in hh:mm:ss format

#### `views`
* `CoreView.js` - Parent view extended by all views (except TracksTableView) in the application. Implements the methods that are common for all views
* `LoginView.js` - Render the login page
* `LoggerView.js` - Display info and error messages in the header section for all "important" events
* `PlayerView.js` - Render and manage the actions of the player control. It is always visible in the header section.
* `AppView.js` - Root view of the application. Binded to the app root element and renders the layout of the app sections: Header, Menu, Content.
* `menu/MenuView.js` - Render the main menu by rendering the subviews: `PlaylistMenuView.js` and `SearchMenuView.js`. The search menu section is hidden with the user is on the search page.
* `content/ContentView.js` - Depending on the `#page=<page-value>` in url renders the appropriate views
* `content/common/TracksTableView.js` - Renders table for given list of tracks on input. It is reused on: Playlist, Search and Queue pages.
* `content/search/SearchPageView.js` - Render the search page. It has two sections/subviews: `SearchFormView.js` and `SearchResultsView.js`
* `content/playlist/PlaylistPageView.js` - Render the playlist page. It has two sections/subviews: `PlaylistDetailsView.js` and `PlaylistTracksView.js`
* `content/queue/QueuePageView.js` - Render the content of the current playing queue. It has one subview: `QueueTracksView.js`

**Potential improvements of the application**
* In this version there is no pagination for the playlists.
* The management of view templates should be updated. Parsing them as inline strings is fast for development but reduces readability and scalability.

## About this task
Thank you for challenging me to code this project using **vanilla Javascript**! It was fun week for me.
