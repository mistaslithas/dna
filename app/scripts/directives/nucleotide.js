'use strict';

/**
 * @ngdoc directive
 * @name dnaApp.directive:nucleotide
 * @description
 * # nucleotide
 */
angular.module('dnaApp')
  .directive('nucleotide', function (Highlighter, Connector, Configuration, Graph) {
    return {
      templateUrl: 'views/nucleotide.html',
      restrict: 'E',
      link: function postLink(scope, element, attrs) {

        // CONFIGURATION ------------------------------------------------------------------------------
        // set a scope variable to watch for changes to the Configuration service
        // see nucleotide.html for angular bindings
        scope.configuration = Configuration;

        // NEW NUCLEOTIDE CONNECTIONS ------------------------------------------------------------------
        // set a scope variable to watch for changes to the Connector service
        scope.connector = Connector;

        // when the user drags a nucleotide in the sequence directive a new connection state is initiated
        // only allow unpaired bases to initiate this sequence
        // upadte the Connector service for other directives to watch and respond to
        scope.startConnection = function() {
          if(scope.nucleotide.construct == '.') {
            Connector.connecting = true;
            Connector.compliment = {G:"C",C:"G",A:"T",T:"A"}[scope.nucleotide.base];
          }
        }
        
        // when the user drops a nucleotide over a complimentary base
        // notify the Graph service to update the structure
        // both the Visualization and Sequence directives watch Graph service's structure parameter and update accordingly
        scope.makeConnection = function(data,evt,index) {
          Graph.makeConnection(data, index);
        }

        // when the user drops a nucleotide anywhere other than a complimentary base
        // cancel the new connection by resetting the Connector service
        scope.cancelConnection = function() {
          Connector.connecting = false;
          Connector.compliment = null;
        }

        // when a connection begins, show all complimentary bases the user can connect to
        // this is accomplished via an angular ng-class binding; see sequence.html
        scope.$watch('connector.compliment', function(compliment){
          var isUncomplimentaryBase = compliment != scope.nucleotide.base || scope.nucleotide.construct != ".";
          scope.uncomplimentary = Connector.connecting ? isUncomplimentaryBase : false;
        })

        // HIGHLIGHTING TO THE VISUALIZATION DIRECTIVE ------------------------------------------------
        // when the user hovers over a nucleuotide in the sequence directive, 
        // set the selectedNucleotideIndex in the Highlither service
        // the visualization directive will watch for this and highlight the appropriate nucleotide
        scope.highlightNucleotide = function() {
          Highlighter.selectedNucleotideIndex = scope.$index;
        }

        // when a nucleotide in the sequence directive is un-hovered, reset the selectedNucleotideIndex in the Highlighter service
        // the visualization directive will listen for changes to Highlithghter.selectedNucleotideIndex and un-highlight all nucleotides
        scope.unhighlightNucleotide = function() {
          Highlighter.selectedNucleotideIndex = -1;
        }   

      }
    };
  });
