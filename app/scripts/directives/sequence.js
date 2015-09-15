'use strict';

/**
 * @ngdoc directive
 * @name dnaApp.directive:sequence
 * @description
 * # sequence
 */
angular.module('dnaApp')
  .directive('sequence', function (Graph) {
    return {
      templateUrl: 'views/sequence.html',
      restrict: 'E',
      link: function postLink(scope, element, attrs) {

        // set a scope variable to watch for changes to the Graph service
      	scope.graph = Graph;

        // when the structure changes in the Graph service
        // update the sequence and structure displays
      	scope.$watch("graph.structure", function(structure) {
      		scope.nucleotides = _.map(Graph.sequence, function(base, index) {
  		      return {base: base, construct: structure[index]};
  		    });
      	});

      }
    };
  });
