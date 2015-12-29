describe('header', function () {
    'use strict';

    it('slides should be able to track a page view', function () {
        var trackPageView = sinon.spy(dwolla.util.googleAnalytics, 'trackPageview');

        dwolla.util.googleAnalytics.trackPageview('/somepage');

        assert.equal(trackPageView.called, true);
    });

    it('slides should be able to track an event', function () {
        var trackEvent = sinon.spy(dwolla.util.googleAnalytics, 'trackEvent');

        dwolla.util.googleAnalytics.trackEvent('home', 'click', 'cta');

        assert.equal(trackEvent.called, true);
    });

});