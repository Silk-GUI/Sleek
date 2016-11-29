var path = require('path');
var fileSystems = [];

setTimeout(function () {
  // Get a list of apps that add a file system
  // This is used in the file picker.
  Silk.api.listen('apps/state', {}, function (e, d) {
    console.log('called', d.length);
    d.forEach(function (item) {
      if (item.fileSystem != null) {
        console.log(item);
        if (!('url' in item.fileSystem)) {
          item.fileSystem.url = item.url;
        }
        item.fileSystem.appId = item.id;
        fileSystems.push(item.fileSystem);
      }
    });
  });
}, 3000);

Silk.methods.add({
  /* Sends a list of the apps with their state */
  'sleek/apps': function (data, call_obj, send) {
    return Silk.api.listen('apps/state', {}, function (err, data) {
      //  console.log('received update');
      console.dir(data);
      send(null, data);
    });
  },
  'sleek/fileSystems': function () {
    return fileSystems;
  },
  'sleek/startApp': function (data, call_obj, send) {
    Silk.api.call('apps/start', data, function (e, result) {
      send(e, 'started');
    });
  }
});
