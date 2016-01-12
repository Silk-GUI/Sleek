var Vue = require('vue');
var isDebug = require('./js/debug.js')();
/*
 * If we are using port 8080, it is most likely
 * the webpack server. Create a new server instance
 * that points to the correct port.
 */
if(isDebug) {
  console.log('=== debug mode ===');
  window.DocumentHost = new Server('localhost', '3000');
}

Vue.config.debug = true;

require("./css/normalize.css");
require("./css/main.css");



var Main = require('./main.vue');

new Vue({
  el: 'body',
  components: {
    main: Main
  }
});


