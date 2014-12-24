(function() {
  'use strict';

  var path     = require( 'path' ),
      nunjucks = require( 'nunjucks' ),
      Promise  = require( 'bluebird' ),
      rootPath = path.normalize(__dirname + '/../../');

  var config = {
    config          : require( './config' ),
    createSendToken : require( './createSendToken' ),
    facebookAuth    : require( './facebookAuth' ),
    googleAuth      : require( './googleAuth' ),
    mongoDB         : require( '../configuration/mongodb' ),
    User            : require( '../model/User' ),

    bodyParser     : require( 'body-parser' ),
    cookieParser   : require('cookie-parser'),
    compression    : require('compression'),
    express        : require('express'),
    favicon        : require('serve-favicon'),
    jwt            : require( 'jwt-simple' ),
    LocalStrategy  : require('passport-local').Strategy,
    logger         : require('morgan'),
    methodOverride : require('method-override'),
    mongoose       : require( 'mongoose' ),
    moment         : require( 'moment' ),
    multer         : require('multer'),
    nunjucks       : require('nunjucks'),
    nunjucksEnv    : new nunjucks.Environment(new nunjucks.FileSystemLoader( path.join( rootPath, 'views' ) )),
    passport       : require('passport'),
    Promise        : require( 'bluebird' ),
    qs             : require( 'querystring' ),
    request        : require( 'request-promise' ),

    faviconPath       : rootPath + 'front-end/resources/favicon.ico',
    nunjucksPath      : path.join( rootPath, 'front-end/views' ),
    cssPath           : path.join( rootPath, 'front-end/resources/css' ),
    fonts             : path.join( rootPath, 'front-end/resources/fonts' ),
    images            : path.join( rootPath, 'front-end/resources/img' ),
    js                : path.join( rootPath, 'front-end/resources/js' ),
    css_compile       : path.join( rootPath, 'front-end/.tmp' ),
    bower_components  : path.join( rootPath, 'front-end/bower' ),
    html_common       : path.join( rootPath, 'front-end/views/commons' )
  };

  module.exports = config;
}());
