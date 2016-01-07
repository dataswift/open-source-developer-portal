var selfTest = (function () {
    'use strict';

    function addListeners() {
        document.getElementById('test-button').onclick = selfTest.clickHand;
    }

    return {
        init: function () {
            addListeners();
        },

        callback: function () {
            return true;
        },

        clickHand: function () {
            this.className = 'has-been-clicked';
        }
    };
}());


describe('self', function () {
    'use strict';

    beforeEach(function () {
        document.getElementsByTagName('html')[0].innerHTML = '<a id="test-button">Click me</a>';
    });

    afterEach(function () {
        document.getElementsByTagName('html')[0].innerHTML = '';
    });

    it('should be able to use chai assert', function () {
        assert.equal(true, true);
    });

    it('should be able to use sinon spies', function () {
        var callback = sinon.spy(selfTest, 'callback');

        selfTest.callback();

        assert.equal(callback.called, true);
    });

    it('should allow DOM interaction with phantomjs', function () {
        var clickHand = sinon.spy(selfTest, 'clickHand'),
            testButton = document.getElementById('test-button');

        selfTest.init();
        testButton.onclick();

        assert.equal(clickHand.called, true);
        assert.equal(testButton.className, 'has-been-clicked');
    });
});