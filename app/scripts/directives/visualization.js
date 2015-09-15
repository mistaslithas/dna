'use strict';

/**
 * @ngdoc directive
 * @name dnaApp.directive:visualization
 * @description
 * # visualization
 */
angular.module('dnaApp')
  .directive('visualization', function (Graph, Configuration, Highlighter) {
    return {
      template: '<div></div>',
      restrict: 'E',
      link: function postLink(scope, element, attrs) {

      	// set a scope variable to watch for changes to the graph
      	scope.graph = Graph;

      	// build the visualization when the graph changes
      	// graph changes occur when the app starts and when the user makes new connections
      	scope.$watch("graph.structure", function() {
      		buildVisualization();
      	});

      	// visualization builder
      	var buildVisualization = function() {
      		// create a fornac.js container to display the visualization
      		// fornac.js credit: Peter kerpedjiev; https://github.com/pkerpedjiev
		  	var fornac = new FornaContainer(element[0], {'applyForce': true, 'allowPanningAndZooming': true, 'labelInterval': 0});
			var options = { 'structure': Graph.structure, 'sequence': Graph.sequence };
			var graph = fornac.addRNA(options.structure, options);

			// CONFIGURATION ------------------------------------------------------------------
			// get references to the parts of the D3 visualization we will be configuring
			var nodes = d3.selectAll("[node_type=nucleotide]");
			var lines = d3.selectAll("[link_type=backbone], [link_type=basepair]");
			var texts = d3.selectAll("text");

			// store the Configuration service in scope so we can watch for changes on it
			scope.configuration = Configuration;

			// watch for changes on the Configuration service and update the D3 visualization
			// the Configuration service parameters are updated via the Configurator directive

			// update the base colors
			scope.$watch('configuration.baseColors', function(){
				var scale = d3.scale.ordinal().range(_.values(Configuration.baseColors)).domain(["A", "C", "G", "U", "T"]); 
		        nodes.style("fill", function(b) {
		            return scale(b.name)
		        });
			}, true);

			// update the base radius
			scope.$watch('configuration.baseRadius', function(val){
				nodes.attr("r", val);
			}, true);

			// update the line (edge) width
			scope.$watch('configuration.lineWidth', function(val){
				lines.attr("stroke-width", val);
			}, true);

			// update the base font
			scope.$watch('configuration.baseFont', function(val){
				texts.attr("class", val);
			}, true);

			// HIGHLIGHTING FROM THE SEQUENCE DIRECTIVE EVENTS -----------------------------------
			// store the Highlighter service in scope so we can watch for changes on it
			scope.highlighter = Highlighter;

			// when the user hovers over a nucleuotide in the sequence directive, 
			// the selectedNucleotideIndex is set in the Highlither service
			// set all nodes except the matching nucleotide in the D3 visualization to be transparent
			scope.$watch('highlighter.selectedNucleotideIndex', function(val){
				if(val >= 0) {
					nodes.style('opacity', .2);
					d3.select(nodes[0][val]).style('opacity', 1);
				} else {
					nodes.style('opacity', 1);
				}
			})

			// HIGHLIGHTING TO THE SEQUENCE DIRECTIVE---------------------------------------------
			// when a nucleotide in the D3 visualization is hovered, set its base index in the Highlighter service
			// the sequence directive will listen for changes Highlithghter.selectedBaseIndex and highlight the matching nucleotide
			nodes.on('mouseenter', function(node) {
				Highlighter.selectedBaseIndex = node.num-1;
				scope.$apply();
			});

			// when a nucleotide in the D3 visualization is un-hovered, reset the selectedBaseIndex in the Highlighter service
			// the sequence directive will listen for changes to Highlithghter.selectedBaseIndex and un-highlight all nucleotides
			nodes.on('mouseleave', function(node) {
				Highlighter.selectedBaseIndex = -1;
				scope.$apply();
			});
      	}


      }
    };
  });
