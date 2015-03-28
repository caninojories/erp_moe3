(function() {
  'use strict';

  module.exports = function(gulp, jasmine, reporters) {
    gulp.task('jasmine-test', function () {
    return gulp.src('back-end/spec/test/*[sS]pec.js')
      .pipe(jasmine({
        reporter: new reporters.TapReporter()
      }));
    });
  };
}());
