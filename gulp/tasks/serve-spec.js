(function() {
  'use strict';

  module.exports = function(args, browserSync, gulp, nodemon, util, logger, serve, config) {
    /**
     * Used for the constants in the logger
     * for Angularjs $log
     */
    process.env.NODE_ENV = 'development';
    gulp.task('serve-specs', ['build-specs'], function(done) {
      logger(util, 'Running Spec Runner');
      serve(true /*is Dev*/, true /*is specRunner*/, args, gulp, browserSync, nodemon, util, logger, config);
      done();
    });
  };
})();
