(function (helpers) {
    'use strict';

    helpers.namespace('dom', {
        addHTML: function (str) {
            var html = document.createElement('div');
            html.innerHTML = str;
            document.body.appendChild(html.firstChild);
        }
    });
}(helpers));