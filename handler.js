'use strict';

var is = require('is');

module.exports = function($opts) {
    var deflt = $opts.default || null,
        item = $opts.item;

    return function(err, $resolver, $res, $next, $finish) {
        if (err && item !== 'err') {
            $next();
            return;
        }

        var value = is.string(item) ? item === 'err' ? err : $resolver(item) : item;
        $res.json(value || deflt);
        $finish();
    };
};
