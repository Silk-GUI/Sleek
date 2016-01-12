var Vue = require('vue');
var isDebug = require('./js/debug.js')();


if(isDebug) {
  /**
   * The page has ?localDebug=true in the url.
   * This is used when we are running from the webpack server but need to connect
   * to Silk on port 3000.
   */
  console.log('=== sleek debug mode ===');
  window.DocumentHost = new Server('localhost', '3000');
  Vue.config.debug = true;
}

require("./css/normalize.css");
require("./css/main.css");
var Main = require('./main.vue');

new Vue({
  el: 'body',
  components: {
    main: Main
  }
});


