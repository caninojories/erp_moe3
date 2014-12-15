
  'use strict';

  var nib     = require('nib');

  module.exports = function ( gulp, stylus, csslint, handleErrors ) {
    gulp.task('stylus', function () {
      return gulp.src( 'front-end/resources/css/stylus/app.styl' )
        .pipe( stylus({use: [nib()]}) )
        .pipe(csslint({
          gradients: false
        }))
        .pipe(csslint.reporter())
        .on( 'error', handleErrors )
        .pipe(gulp.dest( 'front-end/.tmp/stylus' ));
    });
  };
