// this requires the ga (google analytics) object to be loaded.
(function (dwolla) {
    'use strict';

    var GOOGLE_TRACK_MAX_TRIES = 3,
        GOOGLE_TRACK_RETRY_SPEED = 1000;

    function addEventListeners() {
        $('.js-track-link').on('click', dwolla.util.googleAnalytics.trackLink);
    }

    dwolla.namespace('util.googleAnalytics', {

        init: function () {
            addEventListeners();
        },

        trackLink: function (e) {
            // this removes any race condition with normal link tracking
            // link structure should be
            // <a href="http://www.somewhere.com" class="js-track-link">
            var targ = $(this),
                url = targ.attr('href');

            e.preventDefault();
            e.stopPropagation();

            dwolla.util.googleAnalytics.trackEvent('outbound', 'click', url, function () {
                window.location = url;
            });
        },

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

        trackEvent: function (cat, action, label, callback, count) {
            count = count !== undefined ? count : 0;
            label = label !== undefined ? label : null;
            callback = callback !== undefined ? callback : null;
            count += 1;

            try {
                if (label !== null) {
                    ga('send', 'event', cat, action, label, {
                        'hitCallback': callback
                    });
                } else {
                    ga('send', 'event', cat, action);
                }
            } catch (e) {
                //Google Analytics has not loaded yet
                if (count <= GOOGLE_TRACK_MAX_TRIES) {
                    setTimeout(function () {
                        dwolla.util.googleAnalytics.trackPageview.trackEvent(cat, action, label, callback, count);
                    }, GOOGLE_TRACK_RETRY_SPEED);
                }
            }
        }
    });

    $(dwolla.util.googleAnalytics.init);
}(dwolla));
