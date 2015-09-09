var should = require('should');
var sinon = require('sinon');
var yasts = require('../index');

describe("middleware", function() {
    var spy, sts;
    var res = {set:function(key, val) {spy(val)}};
    function test() {sts(null,res,function(){})};
    before(function() {spy=sinon.spy()});
    afterEach(function() {sts=function(){};spy.reset()});
    it("should parse raw ms", function() {
        sts = yasts(5000);
        test();
        spy.callCount.should.equal(1);
        spy.args[0][0].should.equal("max-age=5000");
    });
    it("should parse raw ms + includeSubdomains", function() {
        sts = yasts(5000, true);
        test();
        spy.callCount.should.equal(1);
        spy.args[0][0].should.equal("max-age=5000; includeSubDomains");
    });
    it("should parse an object", function() {
        sts = yasts({years: 1});
        test();
        spy.callCount.should.equal(1);
        spy.args[0][0].should.equal("max-age=31536000000");
    });
    it("should parse an object + includeSubdomains", function() {
        sts = yasts({years: 1}, true);
        test();
        spy.callCount.should.equal(1);
        spy.args[0][0].should.equal("max-age=31536000000; includeSubDomains");
    });
    it("should parse an number + string", function() {
        sts = yasts(7, 'days');
        test();
        spy.callCount.should.equal(1);
        spy.args[0][0].should.equal("max-age=604800000");
    });
    it("should parse an number + string + includeSubdomains", function() {
        sts = yasts(7, 'days', false);
        test();
        spy.callCount.should.equal(1);
        spy.args[0][0].should.equal("max-age=604800000");
    });
});
