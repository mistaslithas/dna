'use strict';

describe('Service: Connector', function () {

  // load the service's module
  beforeEach(module('dnaApp'));

  // instantiate service
  var Connector;
  beforeEach(inject(function (_Connector_) {
    Connector = _Connector_;
  }));

  it('should do something', function () {
    expect(!!Connector).toBe(true);
  });

});
