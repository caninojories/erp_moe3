(function() {
  'use strict';

  module.exports = function( gulp, jsDoc ) {
    gulp.task( 'jsdoc',function() {
      return gulp.src( 'front-end/resources/js/*/*.js' )
      .pipe( jsDoc('front-end/OUT'));
    });
  };
}());
