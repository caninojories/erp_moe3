(function() {
  'use strict';

  angular.module('app.restangular', [])
  .factory( 'salesRepresentativeServiceApi', function ( Restangular ) {
    return Restangular.all( 'salesRepresentativeApi' );
  })
  .factory( 'customerServiceApi', function( Restangular ) {
    return Restangular.all( 'customerApi');
  })
  .factory( 'userServiceApi', function( Restangular ) {
    return Restangular.all( 'userApi' );
  });
}());
