var joker = require(__dirname + '/../index');
var should = require('should');
var portfinder = require('portfinder');
var express = require('express');
var http = require('http');
var glob = require('glob');
var _ = require('underscore');
var async = require('async');
var request = require('request');

var base = 'test/batcave';

describe('express', function() {
  var port;
  before(function(done) {
    var app = express();
    app.use(joker({base: base}));
    portfinder.getPort(function(err, p) {
      port = p;
      http.createServer(app).listen(port, done);
    });
  });

  it('should serve up batman up at server:port/batcave', function(done) {
    glob(process.cwd() + '/' + base + '/**/*', function(err, files) {
      var processed = _.map(files, function(f) { return f.replace(process.cwd() + '/', ''); });
      function iterator(file, cb) {
        request('http://localhost:' + port + '/' + file, function(e,r,b) {
          if (e) throw e;
          r.statusCode.should.equal(200);
          done();
        });
      }
      async.each(processed, iterator, done);
    });
  });
});
