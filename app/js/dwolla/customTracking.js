(function (dwolla) {
    'use strict';

    function addEventListeners() {
        $('#mc-embedded-subscribe').on('click', dwolla.customTracking.subscribeEmailTrack);
    }

    dwolla.namespace('customTracking', {

        init: function () {
            addEventListeners();
        },

        subscribeEmailTrack: function () {
            dwolla.util.googleAnalytics.trackEvent('subscribe to emails', 'click');
        }
    });

    $(dwolla.customTracking.init);
}(dwolla));
