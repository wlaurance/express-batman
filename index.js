var _ = require('underscore');
var fs = require('fs');

function batmanExpress(config) {
  var conf = config ? _.clone(config) : {};
  conf.base = conf.base || 'batcave';
  conf.root = process.cwd() + '/' + conf.base;
  conf.browserify = conf.browserify || false;

  function inTheBatCave(url) {
    return url.indexOf(conf.base) || url.indexOf(conf.base) === 0;
  }

  function middleware(req, res, next) {
    var url = req.path;
    if (inTheBatCave(url)) {
      var ext = _.last(url.split('.'));
      fs.readFile(conf.root + '/' + url, function(err, bytes) {
        if (err) {
          return res.send(404);
        } else {
          var ctype;
          switch (ext) {
            case 'js':
              ctype = 'application/javascript';
              break;
            case 'html':
              ctype = 'text/html';
              break;
            default:
              ctype = 'application/octect-stream';
          }
          res.set('Content-Type', ctype);
          res.send(bytes);
        }
      });
    } else {
      return next();
    }
  }
  return middleware;
}

module.exports = batmanExpress;
