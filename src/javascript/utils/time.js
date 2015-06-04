(function(app) {
    'use strict';
    app.Utils = app.Utils || {};

    /**
     * Parse the input milliseconds value in hh:mm:ss formatted string
     *
     * @param ms
     * @returns {string}
     */
    app.Utils.formatTime = function(ms) {
        var ms_rest = ms % 1000;
        var secs = Math.floor(ms / 1000);

        // add 1 second if there are more than 500ms left
        if (ms_rest > 500) {
            secs++;
        }
        var hrs = Math.floor(secs / (60 * 60));
        var minutes = Math.floor(secs / 60) - (hrs * 60);
        var secs = secs - (hrs * 60 * 60) - (minutes * 60);

        var hrsString = '';
        if (hrs > 0) {
            hrsString += hrs + ':';
            // pad minutes value with zero if the interval is longer than hour
            minutes = minutes < 10 ? '0' + minutes : minutes;
        }

        // pad seconds value with zero
        secs = secs < 10 ? '0' + secs : secs;

        return hrsString + minutes + ":" + secs;
    };

})(MYSP);