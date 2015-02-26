(function() {
  'use strict';

  angular
    .module('app.services')
    .factory('formReset', formReset);

    function formReset() {
      var resetForm = {
        setResetForm : function(vm) {
          var tempVm = vm;
          Object.keys(vm).forEach(function(key) {
            if (typeof vm[key] !== 'function') {
              vm[key] = '';
            }
          });
        }
      };

      return resetForm;
    }
}());
