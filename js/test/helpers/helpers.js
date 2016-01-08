(function (global) {
    'use strict';

    function namespace(ns, provided) {
        var object = this,
            levels = ns.split('.'),
            levelCount = levels.length,
            i;

        for (i = 0; i < levelCount; i += 1) {
            if (object[levels[i]] === undefined) {
                if (i === levelCount - 1) {
                    object[levels[i]] = provided || {};
                } else {
                    object[levels[i]] = {};
                }
            }

            object = object[levels[i]];
        }
    }

    global.helpers = {
        namespace: namespace
    };
}(this));