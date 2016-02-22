// channel for each window
var Channel = require('jschannel');
var $ = require('jquery');
var WindowManager = require('./window_manager.js');
var clientAPI = require('./client_api.js');
var channels = {};

function CreateChannel(index) {
  var self = this;
  var app = WindowManager.windows[index];
  if(channels[app.windowId]) {
    // we already have a channel to the app
    return channels[app.windowId];
  }
  var context = $("#desktop .window iframe[data-name='" + app.title + "']")[0].contentWindow;
  console.log(context);
  WinAbs.call(self, context);

  for(var key in clientAPI) {
    this.add(key, clientAPI[key].bind(app));
  }

  channels[app.windowId] = this;

}

CreateChannel.prototype = Object.create(WinAbs.prototype);
CreateChannel.prototype.constructor = Channel;

//TODO: add method to remove channels
module.exports = CreateChannel;
module.exports.channels = channels;
