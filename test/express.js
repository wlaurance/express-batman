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
var namespace = 'batcave';

describe('express', function() {
  var port;
  before(function(done) {
    var app = express();
    app.use(joker({base: base}));
    app.get('/', function(req,res) {
      res.send(200);
    });
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
      files = _.map(files, function(f) { return f.replace(process.cwd() + '/' + base, namespace); });
      function iterator(file, cb) {
        request('http://localhost:' + port + '/' + file, function(e,r,b) {
          var ext = _.last(file.split('.'));
          var ctype = r.headers['content-type'];
          switch (ext) {
            case 'coffee':
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

  it('should be able to get to the rest of the app!!!', function(done) {
    request('http://localhost:' + port + '/', function(e,r,b) {
      r.statusCode.should.equal(200);
      done();
    });
  });
});
