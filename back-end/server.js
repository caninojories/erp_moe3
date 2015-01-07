(function() {
  'use strict';

  global.app_require = function(name) {
    return require( __dirname + '/' + name );
  };

  global.app_root = function( name ) {
    // return require( __dirname + '/' + name;
    var pathSerialize = require( './services/module.config' );
    return require( './services/module.config' );
  };

  // console.log( modulesko );

  var express     = require( 'express' ),
      _           = require( 'underscore' )._,
      path        = require( 'path' ),
      colors      = require( 'colors' ),
      passport    = require( 'passport' ),
      cluster     = require( 'cluster' ),
      numCPUs     = require( 'os' ).cpus().length,

      sample      = require( './routes/client/sample' ),
      primary     = require( './routes/admin/primary' ),

      salesRepresentativeRegistration = require( './routes/admin/salesRepresentativeRegistration' ),
      salesRepresentativeListing      = require( './routes/admin/salesRepresentativeListing' ),
      editSalesRepresentativeListing  = require( './routes/admin/salesRepresentativeListing/edit' ),
      customerRegistration            = require( './routes/admin/customerRegistration' ),
      customerList                    = require( './routes/admin/customerList' ),
      editCustomerList                = require( './routes/admin/customerList/edit' ),
      quotationRegistration           = require( './routes/admin/quotationRegistration' ),
      quotationList                   = require( './routes/admin/quotationList' ),
      invoiceRegistration             = require( './routes/admin/invoiceRegistration' ),

      salesRepresentativeRegistrationApi = require( './routes/restApi/API/salesRepresentativeRegistrationApi' ),
      salesRepresentativeListingApi      = require( './routes/restApi/API/salesRepresentativeListingApi' ),

      customerRegistrationApi            = require( './routes/restApi/API/customerRegistrationApi' ),
      customerListApi                    = require( './routes/restApi/API/customerListApi' ),
      quotationRegistrationApi           = require( './routes/restApi/API/quotationRegistrationApi' ),
      quotationListApi                   = require( './routes/restApi/API/quotationListApi' ),

      emailTakenApi = require( './routes/restApi/API/strapApi' ),
      userSignUpApi = require( './routes/restApi/Api/strapApi' ),

      catchAll    = require( './routes' );

    /**
     ** Configuration File NoSQL Database
    ***/
    require( './configuration/mongodb' ); //mongodb integration

    /**
     ** Start our Express Server
    ***/
    var app = express();

    /**
     ** Require our Configuration Files
    ***/
    require( './configuration/express' )(app);
    require( './configuration/passport' )(passport);

    /**
     ** Routes
    ***/
    app.use( '/salesRepresentativeApi', salesRepresentativeRegistrationApi );
    app.use( '/salesRepresentativeApi', salesRepresentativeListingApi );
    app.use( '/customerApi', customerRegistrationApi );
    app.use( '/customerApi', customerListApi );
    app.use( '/qoutationApi', quotationRegistrationApi );
    app.use( '/quotationApi', quotationListApi );
    app.use( '/userApi', emailTakenApi );
    app.use( '/userApi', userSignUpApi);
    app.use( '/', sample );
    app.use( '/', primary );
    app.use( '/', salesRepresentativeRegistration );
    app.use( '/', salesRepresentativeListing );
    app.use( '/', editSalesRepresentativeListing);
    app.use( '/', customerRegistration );
    app.use( '/', customerList );
    app.use( '/', editCustomerList);
    app.use( '/', quotationRegistration );
    app.use( '/', quotationList );
    app.use( '/', invoiceRegistration );
    app.use( '*', catchAll );

    /**
     ** Cluster Configuration
    ***/
    if (cluster.isMaster) {
      /**
       ** Fork Workers
      ***/
      var timeouts = [];
      /**
       ** Use a Vanilla for loop
       ** to fork our Clusters
      ***/
      for (var i = 0; i < numCPUs; i++) {
        cluster.fork();
      }
      cluster.on('fork', function(worker) {
        timeouts[worker.id] = setTimeout(errorMsg, 2000);
      });
      cluster.on('online', function(worker) {
        console.log( worker.id + ' is online' );
      });
      cluster.on('listening', function(worker, address) {
        clearTimeout(timeouts[worker.id]);
        console.log('A worker is now connected to ' + address.address + ':' + address.port);
      });
    } else {
      app.listen(app.get('port'), function() {
        console.log('listening to port '.cyan + '%s'.magenta, app.get('port'));
      });
    }

    /**
     ** Function for using Error Message
     ** for the Worker
    ***/
    function errorMsg() {
      console.error('Something must be wrong with the connection ...');
    }
}());
