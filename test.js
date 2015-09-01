'use strict';

var should = require('should'),
    sinon = require('sinon'),
    reflekt = require('reflekt'),
    handler = require('./handler');

describe('json', function() {
    beforeEach(function() {
        this.finish = sinon.spy();
        this.next = sinon.spy();
        this.res = { json: sinon.spy() };
        this.resolver = new reflekt.ObjectResolver();
    });

    it('should finish the request', function() {
        handler({ item: 'foo' })(null, this.resolver, this.res, this.next, this.finish);
        this.finish.called.should.equal(true);
    });

    it('should resolve the defined item', function() {
        this.resolver.add('foo', 'foo');
        handler({ item: 'foo' })(null, this.resolver, this.res, this.next, this.finish);
        this.next.called.should.equal(false);
        this.finish.called.should.equal(true);
        this.res.json.calledWith('foo').should.equal(true);
    });

    it('should skip to the next handler if err is defined and not the item to resolve', function() {
        handler({ item: 'foo' })('err', this.resolver, this.res, this.next, this.finish);
        this.next.called.should.equal(true);
        this.finish.called.should.equal(false);
    });

    it('should send err if err is defined and is the item to resolve', function() {
        handler({ item: 'err' })('err', this.resolver, this.res, this.next, this.finish);
        this.next.called.should.equal(false);
        this.finish.called.should.equal(true);
        this.res.json.called.should.equal(true);
        this.res.json.calledWith('err').should.equal(true);
    });
});
