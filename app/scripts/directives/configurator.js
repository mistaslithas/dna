'use strict';

/**
 * @ngdoc directive
 * @name dnaApp.directive:configurator
 * @description
 * # configurator
 */
angular.module('dnaApp')
  .directive('configurator', function (Configuration, Graph) {
    return {
      template: '<div></div>',
      restrict: 'E',
      link: function postLink(scope, element) {

      	// we are using DAT.GUI for configuration controls
      	// credit: http://workshop.chromeexperiments.com/examples/gui/#1--Basic-Usage

      	// create a gui controls object
		var configurator = new dat.GUI();

		// add editable parameters to the gui and bind them to the Configurator service
		// changes in the Configurator service will be watched and responded to by other directives

		// edit base A color
		configurator.addColor(Configuration.baseColors, 'A').onChange(function(value){
			scope.$apply();
		});
		// edit base C color
		configurator.addColor(Configuration.baseColors, 'C').onChange(function(value){
			scope.$apply();
		});
		// edit base G color
		configurator.addColor(Configuration.baseColors, 'G').onChange(function(value){
			scope.$apply();
		});
		// edit base N color
		configurator.addColor(Configuration.baseColors, 'N').onChange(function(value){
			scope.$apply();
		});
		// edit base T color
		configurator.addColor(Configuration.baseColors, 'T').onChange(function(value){
			scope.$apply();
		});
		// edit base radius
		configurator.add(Configuration, 'baseRadius', 0, 10).onChange(function(value){
			scope.$apply();
		});
		// edit base font
		configurator.add(Configuration, 'baseFont', { Times: 'times', Arial: 'arial', Courier: 'courier', Helvetica: 'helvetica' }).onChange(function(value){
			scope.$apply();
		});
		// edit base line width
		configurator.add(Configuration, 'lineWidth', 0, 10).onChange(function(value){
			scope.$apply();
		});

      }
    };
  });
