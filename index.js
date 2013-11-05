var _ = require('underscore');

function batmanExpress(config) {
  var conf = _.clone(config);
  function middleware(req, res, next) {

  }
  return middleware;
}

module.exports = batmanExpress;
