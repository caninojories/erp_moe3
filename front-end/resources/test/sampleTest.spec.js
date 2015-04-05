(function() {
  'use strict';

  describe('A suite', function() {
    it('contains spec with an expectation', function(done) {
      //expect(5).toEqual(50);
      window.Should(5).be.exactly(5);
      expect(true).toBeTruthy();
      done();
    });
  });
}());
