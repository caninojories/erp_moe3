(function() {
  'use strict';

  var mongo  = require( 'mongodb' ).Db,
      mongoose = require( 'mongoose' ),
      server = require( 'mongodb' ).Server,
      Promise = require( 'bluebird' );
  // var bodyParser = Promise.promisify(require('body-parser').json());

  exports.db = function ( dbName ) {
    if( mongoose.connection.readyState !== 1 ) {
      var db  = Promise.all([mongoose.connect( process.env.MONGODB || 'mongodb://localhost:27017/' + dbName )]);
      return db;
    } else {
      return Promise.all([mongoose]);
    }
  };

}());
