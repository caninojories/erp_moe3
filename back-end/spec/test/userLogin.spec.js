  var should  = require('should');
  var request = require('supertest');
  var express = require('express');
  var app     = require('../../server.js');

  describe("Saving User", function() {
    var user = {email: 'canino_jories@hotmail.com', username: 'canino_jories', password: 'demo123'};
    it("User credentials must be saved", function(done) {
      request(app)
        .post('/userApi/userLogin')
        .send(user)
        .end(function(err, res){
          if (err) return done(err);
          done();
        });
    });
  });
