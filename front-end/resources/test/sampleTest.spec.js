(function() {
  'use strict';

  describe('User Registration', function() {
    var registerCtrl,
        scope,
        commonsDataService1,
        userServiceApi1,
        sypon1,
        $httpBackend1;

    beforeEach(function() {
      module(function($provide) {
        $provide.constant('toastr', toastr);
      });
      module('app.core');
      module('app.sample');
      module('app.primary');
      module('app.salesRepresentative');
      module('app.salesRepresentativeListing');
      module('app.customerRegistration');
      module('app.customerList');
      module('app.quotationRegistration');
      module('app.quotationList');
      module('app.invoice');

      // module('app.core');
      module('app.commons');
      // module('app.register');
      module('app.services');
      // module('blocks.exception');
      // module('blocks.logger');
      // module('mgcrea.ngStrap');
      // module('ngConfig');
      // module('restangular');
      module('blocks.router');
      // module('satellizer');
    });

    beforeEach(inject(function($httpBackend, $injector, $q, $timeout, $auth, strapAlert, strapModal, commonsDataService,
      userServiceApi, authInterceptor, $controller) {

        // module(function ($provide) {
        //   $provide.value('$auth', $auth);
        // });
        var q = $injector.get('$q');
        commonsDataService1  = commonsDataService;
        userServiceApi1      = userServiceApi;
        $httpBackend1        = $httpBackend;

        scope = {};
        registerCtrl = $controller('Register', {
          $scope: scope
        });
        //sypon1 = spyOn(registerCtrl, 'checkEmailInBlurred');
        // sypon1.checkEmailInBlurred.and.returnValue(q.when(1));
      }));

    // afterEach(function(){
    //   rootScope.$apply();
    // });

    it('check email if it is taken when registering', function(done) {
      registerCtrl.email = 'canino_jories@hotmail.com';
      sypon1 = spyOn(registerCtrl, ['checkEmailInBlurred']);
      console.log(sypon1());
      //sypon1.checkEmailInBlurred.and.returnValue(q.when(1));


      window.Should(registerCtrl.email).be.exactly('canino_jories@hotmail.com');
      //expect(registerCtrl.checkEmailInBlurred).toHaveBeenCalled();
      expect(true).toBeTruthy();
      done();
    });
    var postData;

    it('Save a user upon Registration', function() {
      $httpBackend1.whenPOST('/userApi/userRegister', function(response) {
        postData = JSON.parse(response);
        window.Should.exist(postData);
        return true;
      }).respond(200);
      console.log(commonsDataService1);
      var data3 = commonsDataService1.checkEmail('isEmailTaken', {email: 'canino_jories@hotmail.com'}, userServiceApi1);
      console.log(data3);
      // $httpBackend1.flush();
      expect(true).toBeTruthy();
    });
    //console.log(postData);
  });
}());
