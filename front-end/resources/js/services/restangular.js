
  'use strict';

  angular.module('app.restangular', [])
    .factory( 'salesRepresentativeServiceApi', function ( Restangular ) {
      return Restangular.all( 'salesRepresentativeApi' );
    });
