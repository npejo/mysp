# MYSP - My Spotify Player

This application allows you to manage your music playlists on Spotify and simulates playing tracks queue.

## Installation

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
`http://localhost:8888/auth-callback.html`

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
this will start web server listening on the port set as `dev-port` in the config section in [Gruntfile.js](Gruntfile.js)
and will open web browser pointing to the `host` url set in `app-config-dev.js` (set url without trailing slash).
To change the host and port information these are the two places that should be updated.

In `dev` mode the application is served from the `src` folder, using the development source files.

##### Run in prod mode
To run the application in `prod` mode run:
```shell
grunt server:prod
```
this will start web server listening to the port set as `prod-port` in the config section in [Gruntfile.js](Gruntfile.js)
and will open web browser pointing to the `host` url set in `app-config-prod.js` (set url without trailing slash).

In `prod` mode the application is served from the `dist` folder, using minified and concatinated javascript files.

To re-build the code in `dist` folder run:
```shell
grunt build
```

#### Deploy on already running web server

##### Run in dev mode
Copy the content of the `src` folder somewhere on the web server and update the `host` in
[app-config.dev.js](src/javascript/app-config-dev.js). (set url without trailing slash)

##### Run in prod mode
Copy the content of the `dist` folder somewhere on the web server and update the `host` in
[app-config.js](dist/javascript/app-config.js). (set url without trailing slash)
