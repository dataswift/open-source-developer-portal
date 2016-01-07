describe('Custom Tracking', function () {
    'use strict';

    before(function () {
        var html = '<div>' +
            '<input id="mc-embedded-subscribe" class="js-code-snippet" />' +
            '<div class="js-code-snippet"><button></button>' +
            '<nav><button></button></nav></div>' +
            '<select class="js-language-select">' +
            '<option value="raw">raw</option><option value="javascript">javascript</option>' +
            '</select>' +
            '</div>';

        helpers.dom.addHTML(html);
    });

    it('should be able to track subscribe to emails submit button', function () {
        var subscribeEmailTrack = sinon.spy(dwolla.customTracking, 'subscribeEmailTrack'),
            subscribeButton = $('#mc-embedded-subscribe');

        dwolla.customTracking.init();

        subscribeButton.click();

        assert.equal(subscribeEmailTrack.called, true);
    });

    it('should be able to track when code copy happens', function () {
        var trackCodeCopy = sinon.spy(dwolla.customTracking, 'trackCodeCopy'),
            copyButton = $('.js-code-snippet > button');

        dwolla.customTracking.init();

        copyButton.click();

        assert.equal(trackCodeCopy.called, true);
    });

    it('should be able to track language change in code snippets', function () {
        var trackSnippetLanguageChange = sinon.spy(dwolla.customTracking, 'trackSnippetLanguageChange'),
            languageButton = $('.js-code-snippet nav button');

        dwolla.customTracking.init();

        languageButton.click();

        assert.equal(trackSnippetLanguageChange.called, true);
    });

    it('should be able to track global language changes', function () {
        var trackGlobalLanguageChange = sinon.spy(dwolla.customTracking, 'trackGlobalLanguageChange'),
            select = $('.js-language-select');

        dwolla.customTracking.init();

        select.change();

        assert.equal(trackGlobalLanguageChange.called, true);
    });
});