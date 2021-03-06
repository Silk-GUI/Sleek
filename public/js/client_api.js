// API available to apps
var WindowManager = require('./window_manager.js');
var FileExplorer = require('./file_explorer.js');
var $ = require('jquery');

module.exports = {
  open (params) {
    console.log("=============");
    console.log(params);

    // open text editor and include path in url
    // find text editor

    DocumentHost.get("Silk/appDefaults", params.mime).then(function (data) {
        function openWindow(title) {
          // get app id
          var apps = WindowManager.appData;
          var app;
          for (var i = 0; i < apps.length; i++) {
            app = apps[i];
            if(app.title === title) {
              break;
            }
          }
          console.log(app);
          app.url = app.url + '?file=' + encodeURIComponent(params.path);
          WindowManager.open(app.id, app);

          // clone app to not change original url
          //app = JSON.parse(JSON.stringify(app));
          //app.url = app.url + '?file=' + encodeURIComponent(params.path);
          //try {
          //  var win = new Win(app, windows, windowOrder);
          //  win.start();
          //  win.open();
          //} catch (e) {
          //  alert('error opening file');
          //}
        }

        console.log(data);

        // open using default program
        if(data.default !== "") {
          openWindow(data.default);
        }
        // if one app, use it if it is not for *.
        else if(data.available.length < 2 && data.mime != "*") {
          openWindow(data.available[0]);
        }
        // let user choose program
        else {
          var html = '<div class="title">Choose App To Open <br>';
          html += params.path;
          html += '</div> <div class="content"><ul>';
          for (var i = 0; i < data.available.length; ++i) {
            html += "<li>";
            html += data.available[i];
            html += "</li>";
          }
          html += '</ul> <lable><input type="checkbox" checked> Always Use This App </label><div><button>Cancel</button></div></div>'
          $("#appNotifications").append(html);
          $("#appNotifications").css("display", "block");

          // set up click hander
          $("#appNotifications .content button").click(function (e) {
            $("#appNotifications").css("display", "none");
            $("#appNotifications").html("");
          });
          $("#appNotifications .content li").click(function (e) {
            console.log($(e.target).html());
            openWindow($(e.target).html());
            // if chewckbox is checked, set up default app
            if($('#appNotifications input').is(':checked') == true) {
              DocumentHost.get("Silk/setDefault", {
                mime: params.mime,
                app: $(e.target).html()
              }).then(function () {
              });
            }
            $("#appNotifications").css("display", "none");
            $("#appNotifications").html("");
          });
        }
      })
      .catch(console.error);
  },
  'filePicker': function (params, message, send) {

    function indexFromId(list, id) {
      for (var i = 0; i < list.length; i++) {
        if(list[i].id === id) {
          return i;
        }
      }
    }

    console.log('filePicker');
    console.log(this);
    var self = this;
    var fileExplorer = new FileExplorer(this, function (e, d) {
      var index = indexFromId(fileExplorer.id);
      self.popups.splice(index, 1);
      send(e, d);
    });
    self.popups.push(fileExplorer);
  }
};
