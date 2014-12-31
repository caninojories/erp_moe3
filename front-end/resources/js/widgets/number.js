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
          console.log( scope.registerSalesRepresentativeForm.salesOfficePhoneNumber );
          if( input === undefined || null ) return;
          // console.log( input.length );
          if( input.length === 0 ) return   ngModelCtrl.$setValidity('phoneNumber', true);
          var valid = ( input.match(/^[0-9 ]+$/) !== null );
          ngModelCtrl.$setValidity('phoneNumber', valid);
          return valid ? input : undefined;
        }

        ngModelCtrl.$parsers.push( validateNumber );
        ngModelCtrl.$formatters.push( validateNumber );

        scope.$watch( attrs.numberValid, function() {
          // console.log( ngModelCtrl );
          ngModelCtrl.$setViewValue( ngModelCtrl.$viewValue );
        });
      }
    }
}());
