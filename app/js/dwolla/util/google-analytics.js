(function (dwolla) {
    'use strict';

    var GOOGLE_TRACK_MAX_TRIES = 3,
        GOOGLE_TRACK_RETRY_SPEED = 1000;

    dwolla.namespace('util.googleAnalytics', {
        trackPageview: function (identifier, count) {
            count = count !== undefined ? count : 0;
            count += 1;

            try {
                ga('send', 'pageview', identifier);
            } catch (e) {
                //Google Analytics has not loaded yet
                if (count <= GOOGLE_TRACK_MAX_TRIES) {
                    setTimeout(function () {
                        dwolla.util.googleSnalytics.trackPageview(identifier, count);
                    }, GOOGLE_TRACK_RETRY_SPEED);
                }
            }
        },

        trackEvent: function (cat, action, label, count) {
            count = count !== undefined ? count : 0;
            label = label !== undefined ? label : null;
            count += 1;

            try {
                if (label !== null) {
                    ga('send', 'event', cat, action, label);
                } else {
                    ga('send', 'event', cat, action);
                }
            } catch (e) {
                //Google Analytics has not loaded yet
                if (count <= GOOGLE_TRACK_MAX_TRIES) {
                    setTimeout(function () {
                        dwolla.util.googleAnalytics.trackPageview.trackEvent(cat, action, label, count);
                    }, GOOGLE_TRACK_RETRY_SPEED);
                }
            }
        }
    });

}(dwolla));