'use strict';

describe('Service: Highlighter', function () {

  // load the service's module
  beforeEach(module('dnaApp'));

  // instantiate service
  var Highlighter;
  beforeEach(inject(function (_Highlighter_) {
    Highlighter = _Highlighter_;
  }));

  it('should do something', function () {
    expect(!!Highlighter).toBe(true);
  });

});
