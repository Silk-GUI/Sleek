var query = require('queryjs');

module.exports = function () {
  var parameters = query.get(location.href);
  console.dir(parameters);
  return parameters && parameters.localDebug === 'true';
};
