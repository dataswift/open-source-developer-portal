function updateSnippets(show) {
    'use strict';

    [
        '.language-ruby',
        '.language-python',
        '.language-javascript',
        '.language-java',
        '.language-php',
        '.language-raw'
    ].forEach(function (lang) {
        if (lang.indexOf(show) > -1) {
            $(lang).fadeIn(0);
        } else {
            $(lang).fadeOut(0);
        }
    });
}

function updateBodySelectors(show) {
    'use strict';

    $('.selector_switch').toggleClass('active', false);
    $('.selector_switch').each(function (i, element) {
        $(element).toggleClass('active', element.id.indexOf(show) > -1);
    });
}

$(document).ready(function () {
    'use strict';

    var sp = new StatusPage.page({page: 'tnynfs0nwlgr'}),
        current_language;

    if (!sessionStorage.getItem('current_language')) {
        $('.js-language-select').val('ruby');
        updateSnippets('ruby');
        sessionStorage.setItem('current_language', 'ruby');
        updateBodySelectors('ruby');
    } else {
        current_language = sessionStorage.getItem('current_language');
        updateSnippets(current_language);
        $('.js-language-select').val(current_language);
        updateBodySelectors(current_language);
    }

    // Update value of language selector on change
    $('.js-language-select').change(function () {
        // set both top tier nav (mobile, desktop) to same lang
        $('.js-language-select').val($(this).val());
        sessionStorage.setItem('current_language', $(this).val());
        updateSnippets($(this).val());
        updateBodySelectors($(this).val());
    });

    // If someone switches the language on page, just swap
    // what is visible and not the default value
    $('.selector_switch').click(function () {
        updateSnippets(this.id);
        updateBodySelectors(this.id);
        // change global language selector as well:
        $('.js-language-select').val(this.id);
        sessionStorage.setItem('current_language', $('.js-language-select :selected').val());
    });

    // Status page JS
    sp.summary({
        success: function (data) {
            // adds the text description to the dropdown
            $('.dwolla-sp-status').text(data.status.description);

            if (data.status.description.indexOf('Outage') > -1) {
                $('.dwolla-sp-status').addClass('icon-status-partially-degraded');
            } else {
                $('.dwolla-sp-status').addClass('icon-status-operational');
            }
        }
    });
});