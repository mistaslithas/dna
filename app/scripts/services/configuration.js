'use strict';

/**
 * @ngdoc service
 * @name dnaApp.Configuration
 * @description
 * # Configuration
 * Factory in the dnaApp.
 */
angular.module('dnaApp')
  .factory('Configuration', function () {

    // this service is used to store configuration parameters
    // the Configurator directive allows the user to update these parameters
    // directives watch and respond when these parameters update

    // the base colors
    var baseColors = {
      A:"#FF0000",
      C:"#FF0000",
      G:"#FF0000",
      N:"#FF0000",
      T:"#FF0000"
    };
    // the base radius
    var baseRadius = 5;
    // the base font
    var baseFont = 'Times';
    // the base line width
    var lineWidth = 1;

    return {
      baseColors: baseColors,
      baseRadius: baseRadius,
      baseFont: baseFont,
      lineWidth: lineWidth
    };

  });