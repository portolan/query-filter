// Generated by CoffeeScript 1.6.3
var querystring, url;

url = require('url');

querystring = require('querystring');

module.exports = function(value, filters) {
  var filter, i, k, params, regex, urlInfo, v, _i, _j, _len, _len1;
  urlInfo = url.parse(value);
  if (!urlInfo.query) {
    return value;
  }
  params = querystring.parse(urlInfo.query);
  for (i = _i = 0, _len = filters.length; _i < _len; i = ++_i) {
    filter = filters[i];
    filters[i] = new RegExp(filter);
  }
  for (k in params) {
    v = params[k];
    for (_j = 0, _len1 = filters.length; _j < _len1; _j++) {
      regex = filters[_j];
      if (regex.test(k)) {
        delete params[k];
        break;
      }
    }
  }
  urlInfo.search = '?' + querystring.stringify(params);
  return url.format(urlInfo);
};