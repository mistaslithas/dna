'use strict';

/**
 * @ngdoc service
 * @name dnaApp.Graph
 * @description
 * # Graph
 * Factory in the dnaApp.
 */
angular.module('dnaApp')
  .factory('Graph', function ($routeParams) {

    // this service is used to store and manipulate values necessary for displaying the 2D visualization
    // directives watch and respond when these parameters update

    // set the default sequence and structure when none are passed as URL params
    var sequence = $routeParams.sequence ? $routeParams.sequence : "TTGGGGGGACTGGGGCTCCCATTCGTTGCCTTTATAAATCCTTGCAAGCCAATTAACAGGTTGGTGAGGGGCTTGGGTGAAAAGGTGCTTAAGACTCCGT";
    var structure = $routeParams.structure ? $routeParams.structure : "...(((((.(...).)))))........(((((.....((..(.((((((..(((.((...)).)))..)))))).).)))))))...............";

    return {
      sequence: sequence,
      structure: structure,

      // when a new connection is made, 
      // update the structure here
      // both the visualization and sequence directives watch for updates to this structure parameter and udpate accordingly
      makeConnection: function(index1, index2) {
        var newStructure = structure.split('');
        newStructure.splice(Math.min(index1, index2),1,'(');
        newStructure.splice(Math.max(index1, index2),1,')');
        this.structure = newStructure.join('');
      }
    };
  });