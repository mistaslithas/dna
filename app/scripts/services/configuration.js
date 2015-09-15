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
      A:"rgb(127,203,222)",
      C:"rgb(127,203,222)",
      G:"rgb(127,203,222)",
      N:"rgb(127,203,222)",
      T:"rgb(127,203,222)"
    };
    // the base radius
    var baseRadius = 5;
    // the base font
    var baseFont = 'Source Code Pro';
    // the base line width
    var lineWidth = 1;

    return {
      baseColors: baseColors,
      baseRadius: baseRadius,
      baseFont: baseFont,
      lineWidth: lineWidth
    };

  });