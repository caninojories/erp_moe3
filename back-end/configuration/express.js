(function() {
  'use strict';

  var node_module = app_require( 'services/module.config' );

  /***
   ** Express Configuration
  ***/
  module.exports = function (app) {
    node_module.nunjucksEnv.express( app );
    node_module.nunjucks.configure( node_module.nunjucksPath, {
      autoescape: true,
      express: app,
      watch: true,
      tags: {
        variableStart: '<$',
        variableEnd: '$>',
      }
    });
    app.set( 'port', process.env.PORT || 3000 );
    app.set( 'view engine', 'html' );
    app.use( node_module.compression() );
    app.use( node_module.favicon( node_module.faviconPath ));
    app.use( node_module.logger('dev') );
    app.use( node_module.bodyParser.urlencoded({extended:true}) );
    app.use( node_module.bodyParser.json() );
    app.use( node_module.multer() );
    app.use( node_module.methodOverride(function(req, res){
      if (req.body && typeof req.body === 'object' && '_method' in req.body) {
        var method = req.body._method;
        delete req.body._method;
        return method;
      }
    }));
    app.use( node_module.passport.initialize() );
    app.use( '/css', node_module.express.static( node_module.cssPath ));
    app.use( '/fonts', node_module.express.static( node_module.fonts ));
    app.use( '/images', node_module.express.static( node_module.images ));
    app.use( '/js', node_module.express.static( node_module.js ));
    app.use( '/bower', node_module.express.static( node_module.bower_components ));
    app.use( '/commons', node_module.express.static( node_module.html_common ));
    app.use( '/.tmp', node_module.express.static( node_module.css_compile ));

    /***
    ** Setup for CORS
    ***/
    app.use(function( req, res, next ) {
      res.setHeader( 'Access-Control-Allow-Origin', '*' );
      res.setHeader( 'Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE' );
      res.setHeader( 'Access-Control-Allow-Headers', 'X-Requested-With,content-type, Authorization');
      next();
    });

  };
}());
