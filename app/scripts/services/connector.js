'use strict';

/**
 * @ngdoc service
 * @name dnaApp.Connector
 * @description
 * # Connector
 * Factory in the dnaApp.
 */
angular.module('dnaApp')
  .factory('Connector', function () {

    // this service is used to store new connection parameters
    // directives watch and respond when these parameters update

    // if a new connection is in progress
    var connecting = false;
    // the complimentary base of the selected base (G<-->C; A<-->T)
    var compliment;

    return {
      connecting: connecting,
      compliment: compliment
    };
  });
