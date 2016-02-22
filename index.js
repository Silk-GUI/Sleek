var path = require('path');
var fileSystems = [];

setTimeout(function () {
// Get a list of apps that add a file system
// This is used in the file picker.
  Silk.api.listen('apps/state', {}, function (e, d) {
    console.log('called', d.length);
    d.forEach(function (item) {
      if(item.fileSystem) {
        console.log(item);
        item.fileSystem.url = path.join(item.folder + item.id, item.fileSystem.url);
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
      send(null, data);
    });
  },
  'sleek/fileSystems': function () {
    return fileSystems;
  }
});
