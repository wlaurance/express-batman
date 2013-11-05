var _ = require('underscore');

function batmanExpress(config) {
  var conf = config ? _.clone(config) : {};
  conf.base = conf.base ? process.cwd() + '/' + conf.base : process.cwd() + '/batcave';
  conf.browserify = conf.browserify || false;
  function middleware(req, res, next) {

  }
  return middleware;
}

module.exports = batmanExpress;
