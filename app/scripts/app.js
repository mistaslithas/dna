'use strict';

/**
 * @ngdoc overview
 * @name dnaApp
 * @description
 * # dnaApp
 *
 * Main module of the application.
 */
angular
  .module('dnaApp', [
    'ngRoute',
    'ngDraggable'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl',
        controllerAs: 'main'
      })
      .when('/about', {
        templateUrl: 'views/about.html',
        controller: 'AboutCtrl',
        controllerAs: 'about'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
