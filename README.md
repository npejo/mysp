# MYSP - My Spotify Player

This application allows you to manage your music playlists on Spotify and simulates playing tracks queue.

## Instalation

You can run this application locally using `grunt` or by deploying the code to running web server.

### Run using Grunt

Make sure that you have installed `grunt-cli`:
```shell
npm install -g grunt-cli
```

Install the development dependencies listed in `package.json`
```shell
npm install
```
There are two configuration files for the application, one for `development` and one for `production` environment.
They are set in [app-config.dev.js](mysp/src/javascript/app-config-dev.js) and [app-config-prod.js](mysp/src/javascript/app-config-prod.js) respectively.

To run the application in `dev` mode run:
```shell
grunt server:dev
```
this will open window in the default web browser on the machine pointing to the `host` url set in ``
