(function() {
  'use strict';

  var io = appRequire('services/module.config');

  /* Express Configuration */
  module.exports = function (app) {
    if (process.env.NODE_ENV === 'production') {
      io.nunjucksEnvBuild.express(app);
      io.nunjucks.configure(io.nunjucksPathBuild, {
        autoescape: true,
        express: app,
        watch: true,
        tags: {
          variableStart: '<$',
          variableEnd: '$>',
        }
      });
    } else {
      io.nunjucksEnv.express(app);
      io.nunjucks.configure(io.nunjucksPath, {
        autoescape: true,
        express: app,
        watch: true,
        tags: {
          variableStart: '<$',
          variableEnd: '$>',
        }
      });
    }

    app.set('x-powered-by', false);
    app.set('port', io.port);
    app.set('env', process.env.NODE_ENV || io.environment);
    app.use(io.i18n);
    app.use(io.compression());
    app.use(io.favicon(io.faviconPath));
    app.use(io.logger('dev'));
    app.use(io.bodyParser.urlencoded({extended:true}));
    app.use(io.bodyParser.json());
    app.use(io.multer());
    app.use(io.methodOverride(function(req, res) {
      if (req.body && typeof req.body === 'object' && '_method' in req.body) {
        var method = req.body._method;
        delete req.body._method;
        return method;
      }
    }));
    app.use(io.passport.initialize());

    if (process.env.NODE_ENV === 'production') {
      app.set('json spaces', 0);
      app.use('/css', io.express.static(io.buildCss));
      app.use('/js', io.express.static(io.buildJs));
      app.use('/images', io.express.static(io.buildImg));
      app.use('/fonts', io.express.static(io.buildFonts));
      app.use('commons', io.express.static(io.commonViewsBuild));
    } else {
      app.set('json spaces', 2);
      app.use('/css', io.express.static(io.cssPath));
      app.use('/fonts', io.express.static(io.fonts));
      app.use('/images', io.express.static(io.images));
      app.use('/js', io.express.static(io.js));
      app.use('/bower', io.express.static(io.bower_components));
      app.use('/commons', io.express.static(io.html_common));
      app.use('/.tmp', io.express.static(io.css_compile));
    }

    /***
    ** Setup for CORS
    ***/
    app.use(function(req, res, next) {
      res.setHeader('Access-Control-Allow-Origin', '*');
      res.setHeader('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE');
      res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type, Authorization, Language');
      next();
    });
  };
}());
