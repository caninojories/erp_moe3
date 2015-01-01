(function() {
  'use strict';

  angular
    .module( 'app.widgets' )
    .directive( 'numberValid', number );

    function number() {
      var directive = {
        restrict: 'A',
        require: 'ngModel',
        link: link
      };

      return directive;

      function link( scope, element, attrs, ngModelCtrl ) {
        function validateNumber( input ) {
          if( input === undefined || null ) return;

          if( input.length === 0 ) return   ngModelCtrl.$setValidity('number', true);
          var valid = ( input.match(/^[0-9 ]+$/) !== null );
          ngModelCtrl.$setValidity('number', valid);
          return valid ? input : undefined;
        }

        ngModelCtrl.$parsers.push( validateNumber );
        ngModelCtrl.$formatters.push( validateNumber );

        scope.$watch( attrs.numberValid, function() {
          ngModelCtrl.$setViewValue( ngModelCtrl.$viewValue );
        });
      }
    }
}());
