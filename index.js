'use strict';

module.exports = function($$resolver) {
    $$resolver.add('$json', require('./handler'));
};
