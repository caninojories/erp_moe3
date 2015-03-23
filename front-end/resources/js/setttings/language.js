(function() {
  'use strict';

  angular
    .module('app.settings')
    .controller('Language', Language);

    Language.$inject = ['$timeout', '$window', 'commonsDataService', 'languageToken', 'settingServiceApi'];

    function Language($timeout, $window, commonsDataService, languageToken, settingServiceApi) {
      var vm = this;

      vm.language = language;

      function language(lang) {
        languageToken.setToken(lang);
        commonsDataService
          .httpGETRouteParams('',
            lang, settingServiceApi)
          .then(function(response) {
            if (response.language !== undefined) {
              $timeout(function() {
                $window.location.reload();
              }, 200);
            }
          });
      }
    }
})();
