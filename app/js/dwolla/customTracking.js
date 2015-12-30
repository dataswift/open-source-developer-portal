(function (dwolla) {
    'use strict';

    function addEventListeners() {
        $('#mc-embedded-subscribe').on('click', dwolla.customTracking.subscribeEmailTrack);
        $('.js-code-snippet > button').on('click', dwolla.customTracking.trackCodeCopy);
        $('.js-code-snippet nav button').on('click', dwolla.customTracking.trackSnippetLanguageChange);
        $('.js-language-select').on('change', dwolla.customTracking.trackGlobalLanguageChange);
    }

    dwolla.namespace('customTracking', {

        init: function () {
            addEventListeners();
        },

        subscribeEmailTrack: function () {
            dwolla.util.googleAnalytics.trackEvent('subscribe to emails', 'click');
        },

        trackCodeCopy: function () {
            dwolla.util.googleAnalytics.trackEvent('code sample', 'copy', window.location.href);
        },

        trackSnippetLanguageChange: function () {
            dwolla.util.googleAnalytics.trackEvent('code sample', 'language change', $(this).attr('id'));
        },

        trackGlobalLanguageChange: function () {
            dwolla.util.googleAnalytics.trackEvent('global language select', 'language change', $(this).val());
        }
    });

    $(dwolla.customTracking.init);
}(dwolla));
