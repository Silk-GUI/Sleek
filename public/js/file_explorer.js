var $ = require('jquery');

function FileExplorer (app, cb) {
  var self = this;
  self.id = Math.random() + '-' + new Date().getTime();
  self.component = 'file-explorer';
  self.channel = null;
  this.cb = cb;
}

FileExplorer.prototype.createChannel = function (el) {
  var self = this;
  var context = $(el).find('iframe')[0].contentWindow;
  var channel = new WinAbs(context);
  channel.add('open', function (data) {
    console.log(data);
    self.cb(null, data);
  });
};

FileExplorer.prototype.constructor = FileExplorer;

module.exports = FileExplorer;
