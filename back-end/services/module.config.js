(function() {
  'use strict';

  var path        = require('path'),
      mongoose    = require('mongoose'),
      nunjucks    = require('nunjucks'),
      Promise     = require('bluebird'),
      rootPath    = path.normalize(__dirname + '/../../'),
      routesAdmin = rootPath + 'back-end/routes/admin/',
      routesApi   = rootPath + 'back-end/routes/restApi/api/';

  module.exports = {
      rootPath            : rootPath,
      preRegister         : require('./preRegister'),
      authorize           : require('./authorize'),
      clusterService      : require('./cluster'),
      config              : require('./config'),
      createSendToken     : require('./createSendToken'),
      delete              : require('./delete'),
      error               : require('./error'),
      emailVerify         : require('./emailVerification'),
      facebookAuth        : require('./facebookAuth'),
      get                 : require('./get'),
      googleAuth          : require('./googleAuth'),
      i18n                : require('./i18n'),
      languageLocale      : require('./language.locale'),
      locaLogin          : require('./locaLogin'),
      mongoDB             : require('../configuration/mongodb'),
      Customer            : require('../model/Customer'),
      Invoice             : require('../model/Invoice'),
      InvoiceFromAddress  : require('../model/InvoiceFromAddress'),
      InvoiceToAddress    : require('../model/InvoiceToAddress'),
      SalesRep            : Promise.promisifyAll(require('../model/SalesRepresentative')),
      Quotation           : require('../model/Quotation'),
      save                : require('./save'),
      update              : require('./update'),
      useApi              : require('./useApi'),
      useApiConfig        : require('./useApi.config'),
      useApp              : require('./useApp'),
      useAppConfig        : require('./useApp.config'),
      User                : require('../model/User'),
      xPoweredBy          : require('./xPoweredBy'),

      async          : require('async'),
      bodyParser     : require('body-parser'),
      chalk          : require('chalk'),
      cluster        : require('cluster'),
      compression    : require('compression'),
      connectDB      : Promise.promisify(mongoose.connect, mongoose),
      express        : require('express'),
      favicon        : require('serve-favicon'),
      fs             : require('fs'),
      fse            : require('fs-extra'),
      jwt            : require('jwt-simple'),
      LocalStrategy  : require('passport-local').Strategy,
      logger         : require('morgan'),
      methodOverride : require('method-override'),
      mongoose       : Promise.promisifyAll(mongoose),
      moment         : require('moment'),
      multer         : require('multer'),
      nodemailer     : require('nodemailer'),
      nodeSmtp       : require('nodemailer-smtp-transport'),
      numCPUs        : require('os').cpus().length,
      nunjucks       : require('nunjucks'),
      nunjucksEnv    : new nunjucks.Environment(new nunjucks.FileSystemLoader(path.join(rootPath, 'views'))),
      nunjucksEnvBuild  : new nunjucks.Environment(new nunjucks.FileSystemLoader(path.join(rootPath, 'build'))),
      ObjectId       : require('mongodb').ObjectID,
      passport       : require('passport'),
      path           : path,
      Promise        : require('bluebird'),
      qs             : require('querystring'),
      request        : require('request-promise'),
      _              : require('underscore'),
      url            : require('url'),

      port              : process.env.PORT || 3000,
      environment       : process.env.NODE_ENV || 'development',

      faviconPath       : rootPath + 'front-end/resources/favicon.ico',
      nunjucksPath      : path.join(rootPath, 'front-end/views'),
      nunjucksPathBuild : path.join(rootPath, 'build'),
      cssPath           : path.join(rootPath, 'front-end/resources/css'),
      fonts             : path.join(rootPath, 'front-end/resources/fonts'),
      images            : path.join(rootPath, 'front-end/resources/img'),
      js                : path.join(rootPath, 'front-end/resources/js'),
      css_compile       : path.join(rootPath, 'front-end/.tmp'),
      bower_components  : path.join(rootPath, 'front-end/bower'),
      html_common       : path.join(rootPath, 'front-end/views/commons'),

      buildCss          : path.join(rootPath, 'build/css'),
      buildFonts        : path.join(rootPath, 'build/fonts'),
      buildImg          : path.join(rootPath, 'build/img'),
      buildJs           : path.join(rootPath, 'build/js'),
      commonViewsBuild  : path.join(rootPath, 'build/commons'),

      /* AdminImplementation Routes */
      INVOICE           : require(rootPath + 'back-end/configuration/require/routes/adminApImplementation/invoice'),
      SETTINGS          : require(rootPath + 'back-end/configuration/require/routes/adminApImplementation/settings')
  };
}());
