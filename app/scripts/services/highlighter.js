'use strict';

/**
 * @ngdoc service
 * @name dnaApp.Highlighter
 * @description
 * # Highlighter
 * Factory in the dnaApp.
 */
angular.module('dnaApp')
  .factory('Highlighter', function () {

    // this service is used to store highlight parameters
    // directives watch and respond when these parameters update

    // the selected nucleotide from the sequence directive
    var selectedNucleotideIndex = -1;
    // the selected nucleotide from the visualization directive
    var selectedBaseIndex = -1;

    return {
      selectedNucleotideIndex: selectedNucleotideIndex,
      selectedBaseIndex: selectedBaseIndex
    };
  });
