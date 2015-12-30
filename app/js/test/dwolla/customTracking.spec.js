describe('Custom Tracking', function () {
    'use strict';

    before(function () {
        helpers.dom.addHTML('<input id="mc-embedded-subscribe" />');
    });

    it('should be able to track subscribe to emails submit button', function () {
        var subscribeEmailTrack = sinon.spy(dwolla.customTracking, 'subscribeEmailTrack'),
            subscribeButton = $('#mc-embedded-subscribe');

        dwolla.customTracking.init();

        subscribeButton.click();

        assert.equal(subscribeEmailTrack.called, true);
    });

});