var remote = require('./remote.js');
var debug = require('./debug.js')();

module.exports = {};
module.exports.load = function load(callback) {
  window.DocumentHost.pipe('sleek/apps', {}, function (err, data) {
   // console.log(err, data);
    // fix urls if remote
    if (remote.isRemote === true && (debug === false)) {
      console.log("fixing urls");
      for (var i = 0; i < data.length; ++i) {
        data[i].url = remote.fixURL(data[i].url);
        data[i].icon = remote.fixURL(data[i].icon);
      }
    }
    callback(err, data);
  });
};

//$(document).ready(function () {
//  $(".loader span").css("animationIterationCount", "1");
//  methods.listen('sleek/apps', {}, function (error, data) {
//    if (error) {
//      alert(error);
//    }
//    console.log(data);
//      // fix urls if remote
//      if (remote.isRemote === true) {
//        console.log("fixing urls");
//        for (var i = 0; i < data.length; ++i) {
//          data[i].url = remote.fixURL(data[i].url);
//          data[i].icon = remote.fixURL(data[i].icon);
//        }
//        console.log(JSON.stringify(data));
//      }
//      initializeManager(data);
//      window.setTimeout(function () {
//        $(".loader").fadeOut();
//      }, 80)
//    });
//});

// add nw class to body if in nw.js
(function () {
function isNW (evt) {
  var message;
  // nwjs message is from file://.
  //alert(evt.data);
  if(evt.data === "from nw.js"){
    $("body").addClass('nwjs');
    //alert('is nwjs');
  }
}

if (window.addEventListener) {
  // For standards-compliant web browsers
  window.addEventListener("message", isNW, false);
}
else {
  window.attachEvent("onmessage", isNW);
}
})();