(function() {
  'use strict';

  var express = require('express'),
  router      = express.Router();

  router.get('/admin/invoice/viewList.html', io.authorize, io.xPoweredBy, io.languageLocale, function(req, res) {
    // io._.templateSettings = {
    //   interpolate : /\{\{\{(.+?)\}\}\}/g
    // };
    // var path =  io.path.normalize(__dirname + '/../../../../') + 'front-end/views/admin/invoice/viewList.html';
    // var html = io.fs.readFileSync(path, {'encoding':'utf8'});
    // var header =  io.path.normalize(__dirname + '/../../../../') + 'front-end/views/commons/header.html';
    // var headerHtml = io.fs.readFileSync(header, {'encoding':'utf8'});
    // var compiled = io._.template(headerHtml + html);
    // var compileds = compiled({name: 'joriescanino'});
    // // console.log(compiled);
    // res.send(compileds);
    res.render('admin/invoice/viewList.html');
  });

  module.exports = router;
}());
