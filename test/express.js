var joker = require(__dirname + '/../index');
var should = require('should');
var portfinder = require('portfinder');
var express = require('express');
var http = require('http');
var glob = require('glob');
var _ = require('underscore');
var async = require('async');
var request = require('request');
var fs = require('fs');

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
      files = _.filter(files, function(f) {
        return fs.statSync(f).isFile();
      });
      files = _.map(files, function(f) { return f.replace(process.cwd() + '/' + base + '/', ''); });
      function iterator(file, cb) {
        request('http://localhost:' + port + '/' + file, function(e,r,b) {
          var ext = _.last(file.split('.'));
          var ctype = r.headers['content-type'];
          switch (ext) {
            case 'js':
              ctype.should.be.equal('application/javascript');
              break;
            case 'html':
              ctype.should.be.equal('text/html');
              break;
            default:
              break;
          }
          r.statusCode.should.equal(200);
          cb();
        });
      }
      async.each(files, iterator, done);
    });
  });
});
