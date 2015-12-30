describe('header', function () {
    'use strict';

    before(function () {
        helpers.dom.addHTML('<a href="http://www.somewhere.com" class="js-track-link" data-ga-label="stay in touch - twitter">');
    });

    it('should be able to track a link', function () {
        var trackLink = sinon.spy(dwolla.util.googleAnalytics, 'trackLink'),
            trackLinkButton = $('.js-track-link');

        dwolla.util.googleAnalytics.init();

        trackLinkButton.click();

        assert.equal(trackLink.called, true);
    });

    it('should be able to get ga label from a track link', function () {
        var trackEvent = sinon.spy(dwolla.util.googleAnalytics, 'trackEvent'),
            trackLinkButton = $('.js-track-link');

        trackLinkButton.click();

        assert.equal(trackEvent.args[0][2], 'stay in touch - twitter');
        dwolla.util.googleAnalytics.trackEvent.restore();
    }); 

    it('should be able to track a page view', function () {
        var trackPageView = sinon.spy(dwolla.util.googleAnalytics, 'trackPageview');

        dwolla.util.googleAnalytics.trackPageview('/somepage');

        assert.equal(trackPageView.called, true);
    });

    it('should be able to track an event', function () {
        var trackEvent = sinon.spy(dwolla.util.googleAnalytics, 'trackEvent');

        dwolla.util.googleAnalytics.trackEvent('home', 'click', 'cta');

        assert.equal(trackEvent.called, true);
    });

});