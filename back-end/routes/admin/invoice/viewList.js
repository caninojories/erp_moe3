(function() {
  'use strict';

  var express = require('express'),
  router      = express.Router();

  router.get('/admin/invoice/viewList.html', function(req, res) {
    io._.templateSettings = {
      interpolate : /\{\{\{(.+?)\}\}\}/g
    };
    var path =  io.path.normalize(__dirname + '/../../../../') + 'front-end/views/admin/invoice/viewList.html';
    var html = io.fs.readFileSync(path, {'encoding':'utf8'});
    var header =  io.path.normalize(__dirname + '/../../../../') + 'front-end/views/commons/header.html';
    var headerHtml = io.fs.readFileSync(header, {'encoding':'utf8'});
    var compiled = io._.template(headerHtml + html);
    var compileds = compiled({name: 'joriescanino'});
    // console.log(compiled);
    res.send(compileds);
  });

  module.exports = router;
}());
// '<div class="container-fluid" ng-cloak ng-show="showContent">' +
//   '<table datatable="" dt-options="dtOptions" dt-columns="dtColumns"' +
//   'class="table table-striped table-bordered">' +
// '</table>' +
// '</div>'
// var path =  node.path.normalize(__dirname + '/../../') + 'back-end/views/postSubscription.html';
//       var html = node.fs.readFileSync(path, {'encoding':'utf8'});
//
//       var template = node._.template(html);
//       model.body += post.content;
//       model.postUrl = 'https://hauangelite.herokuapp.com/post/';
//       model.postUrl += post._id;
//       return template(model);
