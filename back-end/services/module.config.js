(function() {
  'use strict';

  var path        = require('path'),
      mongoose    = require('mongoose'),
      nunjucks    = require('nunjucks'),
      Promise     = require('bluebird'),
      rootPath    = path.normalize(__dirname + '/../../'),
      routesAdmin = rootPath + 'back-end/routes/admin/',
      routesApi   = rootPath + 'back-end/routes/restApi/API/';

  module.exports = {
      clusterService  : require('./cluster'),
      config          : require('./config'),
      createSendToken : require('./createSendToken'),
      delete          : require('./delete'),
      error           : require('./error'),
      emailVerify     : require('./emailVerification'),
      facebookAuth    : require('./facebookAuth'),
      get             : require('./get'),
      googleAuth      : require('./googleAuth'),
      modelConfig     : require('./model.config')(),
      mongoDB         : require('../configuration/mongodb'),
      Customer        : require('../model/Customer'),
      Invoice         : require('../model/Invoice'),
      SalesRep        : Promise.promisifyAll(require('../model/SalesRepresentative')),
      Quotation       : require('../model/Quotation'),
      save            : require('./save'),
      update          : require('./update'),
      useApi          : require('./useApi'),
      useApp          : require('./useApp'),
      User            : require('../model/User'),

      bodyParser     : require('body-parser'),
      chalk          : require('chalk'),
      cluster        : require('cluster'),
      compression    : require('compression'),
      connectDB      : Promise.promisify(mongoose.connect, mongoose),
      express        : require('express'),
      favicon        : require('serve-favicon'),
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
      passport       : require('passport'),
      Promise        : require('bluebird'),
      qs             : require('querystring'),
      request        : require('request-promise'),
      underscore     : require('underscore'),
      url            : require('url'),

      port              : process.env.PORT || 3000,

      faviconPath       : rootPath + 'front-end/resources/favicon.ico',
      nunjucksPath      : path.join(rootPath, 'front-end/views'),
      cssPath           : path.join(rootPath, 'front-end/resources/css'),
      fonts             : path.join(rootPath, 'front-end/resources/fonts'),
      images            : path.join(rootPath, 'front-end/resources/img'),
      js                : path.join(rootPath, 'front-end/resources/js'),
      css_compile       : path.join(rootPath, 'front-end/.tmp'),
      bower_components  : path.join(rootPath, 'front-end/bower'),
      html_common       : path.join(rootPath, 'front-end/views/commons'),

      /*require for nodejs Implementation*/
      primary                             : require(routesAdmin + 'primary'),
      salesRepresentativeRegistration     : require(routesAdmin + 'salesRepresentativeRegistration'),
      salesRepresentativeListing          : require(routesAdmin + 'salesRepresentativeListing'),
      editSalesRepresentativeListing      : require(routesAdmin + 'salesRepresentativeListing/edit'),
      customerRegistration                : require(routesAdmin + 'customerRegistration'),
      customerList                        : require(routesAdmin + 'customerList'),
      editCustomerList                    : require(routesAdmin + 'customerList/edit'),
      quotationRegistration               : require(routesAdmin + 'quotationRegistration'),
      quotationList                       : require(routesAdmin + 'quotationList'),
      editQuotationList                   : require(routesAdmin + 'quotationList/edit'),
      invoiceRegistration                 : require(routesAdmin + 'invoiceRegistration'),
      invoiceList                         : require(routesAdmin + 'invoiceList'),
      editInvoiceList                     : require(routesAdmin + 'invoiceList/edit'),
      salesRepresentativeRegistrationApi  : require(routesApi + 'salesRepresentativeRegistrationApi'),
      salesRepresentativeListingApi       : require(routesApi + 'salesRepresentativeListingApi'),
      customerRegistrationApi             : require(routesApi + 'customerRegistrationApi'),
      customerListApi                     : require(routesApi + 'customerListApi'),
      quotationRegistrationApi            : require(routesApi + 'quotationRegistrationApi'),
      quotationListApi                    : require(routesApi + 'quotationListApi'),
      invoiceRegistrationApi              : require(routesApi + 'invoiceRegistrationApi'),
      invoiceListApi                      : require(routesApi + 'invoiceListApi'),
      emailTakenApi                       : require(routesApi + 'strapApi'),
      userSignUpApi                       : require(routesApi + 'strapApi')
  };
}());
