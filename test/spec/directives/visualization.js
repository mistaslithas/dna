'use strict';

describe('Directive: visualization', function () {

  // load the directive's module
  beforeEach(module('dnaApp'));

  var element,
    scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<visualization></visualization>');
    element = $compile(element)(scope);
    expect(element.text()).toBe('this is the visualization directive');
  }));
});
