(function() {
  'use strict';

  module.exports = function(gulp, inject, wiredep, util, logger, config) {
    gulp.task('build-specs', ['templatecache'], function() {
      logger(util, 'Building the spec runner');
      console.log(config.specs);
      return gulp
        .src(config.specRunner)
        .pipe(wiredep(config.getWireDepDefaultOptions()))
        .pipe(inject(gulp.src(config.js, {read:false}), {
          ignorePath: '/front-end/resources'
        }))
        .pipe(inject(gulp.src(config.specs), {
          ignorePath: '/front-end/views',
          starttag: '<!-- inject:specs:js -->'
        }))
        .pipe(inject(gulp.src(config.temp + config.templateCache.file), {
          ignorePath: '/front-end',
          starttag: '<!-- inject:templates:js -->'
        }))
        .pipe(gulp.dest(config.client));
    });
  };
}());
