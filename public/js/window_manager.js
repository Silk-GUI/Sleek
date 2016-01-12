/**
 * Manages apps and their windows
 * @constructor
 */
function WindowManager() {
  this.appData = [];
  this.windows = [];
  this.activeWindows = [];
  this.windowId = 0;
}

/**
 * Updates the app data to the supplied data
 * @param {Object} data Data from the 'apps/state' server api
 */
WindowManager.prototype.updateAppData = function (data) {
  if('$set' in this.appData) {
    for (var i = 0; i < data.length; i++) {
      // help vue to detect the changes
      //TODO: this will not work if the length is different from the origional data
      this.appData.$set(i, data[i]);
    }
  } else {
    //Vue is not using the data yet.
    console.log('no $set');
  }
};

/**
 * Returns app that has the id
 * @param {number} id
 * @returns {Object} App data
 */
WindowManager.prototype.findAppById = function (id) {
  for (var i = 0; i < this.appData.length; i++) {
    if(this.appData[i].id === id) {
      return this.appData[i];
    }
  }
};

/**
 * Finds windows that have the app id
 * @param {number} appId
 * @returns {Array} List of windows
 */
WindowManager.prototype.windowsForApp = function (appId) {
  var results = [];
  this.windows.forEach((item) => {
    if(item.id === appId) {
      results.push(item);
    }
  });
  return results;
};

/**
 * Opens a new window. If the app only allows one window, we first check if
 * one is open. If one is, we make it active.
 * @param {number} id app id to create window from
 * @param {Object} [app] app object. If supplied used instead of id
 * @return {Object} app object
 */
WindowManager.prototype.open = function (id, app) {
  app = app || this.findAppById(id);
  if(app.multipleWindows === false) {
    var appWindows = this.windowsForApp(id);
    if(appWindows.length > 0) {
      // find index of first item
      for (var i = 0; i < this.windows.length; i++) {
        var _window = this.windows[i];
        if(_window.windowId === appWindows[0].windowId) {
          this.maximizeWindow(i);
          return appWindows[0];
        }
      }
    }
  }

  console.log(app);
  // clone
  var win = JSON.parse(JSON.stringify(app));
  win.windowId = this.windowId;
  this.windowId += 1;
  win.running = true;
  this.windows.push(win);
  this.maximizeWindow(this.windows.length - 1);
  return win;
};

/**
 * Recalculates zIndex for windows. Gives windows that are active a zIndex of 2
 * and all other widows a zIndex of 0.
 */
WindowManager.prototype.reorder = function () {
  for (var i = 0; i < this.windows.length; i++) {
    var win = this.windows[i];
    if(this.activeWindows.indexOf(win.windowId)) {
      win.zIndex = 2;
    } else {
      win.zIndex = 0;
    }
  }
};

/**
 * Maximizes the window and minimizes all other windows
 * @param {number} index - index of window in window array
 */
WindowManager.prototype.maximizeWindow = function (index) {
  this.windows.forEach((item, index)=> {
    if(item.minimized === false) {
      this.minimizeWindow(index);
    }
  });
  this.windows[index].minimized = false;
  this.activeWindows.push(this.windows[index].windowId);
};

/**
 * Minimizes a window
 * @param {number} index - index of window in window array
 */
WindowManager.prototype.minimizeWindow = function (index) {
  this.windows[index].minimized = true;
  var windowId = this.windows[index].windowId;
  var activeIndex = this.activeWindows.indexOf(windowId);
  if(activeIndex > -1) {
    this.activeWindows.splice(activeIndex, 1);
  }
};

/**
 * Closes the window, then makes the first opened window active
 * @param {number} index in WindowManager#windows
 */
WindowManager.prototype.closeWindow = function (index) {
  var activeIndex = this.activeWindows.indexOf(this.windows[index].windowId);
  if(activeIndex > -1) {
    this.activeWindows.splice(activeIndex, 1);
    if(this.windows.length > 0) {
      this.maximizeWindow(0);
    }
  }
  this.windows.splice(index, 1);
  this.reorder();
};


var WM = new WindowManager();

module.exports = WM;
