'use strict';

describe('Service: Graph', function () {

  // load the service's module
  beforeEach(module('dnaApp'));

  // instantiate service
  var Graph;
  beforeEach(inject(function (_Graph_) {
    Graph = _Graph_;
  }));

  it('should do something', function () {
    expect(!!Graph).toBe(true);
  });

});
