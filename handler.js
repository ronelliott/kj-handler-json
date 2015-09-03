'use strict';

module.exports = function($opts) {
    var deflt = $opts.default || null,
        name = $opts.item;
    return function(err, $resolver, $res, $next, $finish) {
        if (err && name !== 'err') {
            $next();
            return;
        }

        var value = name === 'err' ? err : $resolver(name);
        $res.json(value || deflt);
        $finish();
    };
};
