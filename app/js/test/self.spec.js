var selfTest = (function () {
    'use strict';

    function addListeners() {
        $('#test-button').on('click', selfTest.clickHand);
    }

    return {
        init: function () {
            addListeners();
        },

        callback: function () {
            return true;
        },

        clickHand: function () {
            $(this).addClass('has-been-clicked');
        }
    };
}());

describe('Self', function () {
    'use strict';

    beforeEach(function () {
        $('html').html('<a id="test-button">Click me</a>');
    });

    afterEach(function () {
        $('html').html('');
    });

    it('should be able to use chai assert', function () {
        assert.equal(true, true);
    });

    it('should be able to use sinon spies', function () {
        var callback = sinon.spy(selfTest, 'callback');

        selfTest.callback();

        assert.equal(callback.called, true);
    });

    it('should allow jquery interaction', function () {
        var clickHand = sinon.spy(selfTest, 'clickHand'),
            testButton = $('#test-button');

        selfTest.init();

        testButton.click();

        assert.equal(clickHand.called, true);
        assert.equal($(testButton).attr('class'), 'has-been-clicked');
    });
});