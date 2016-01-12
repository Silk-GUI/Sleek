<template>
  <h1>App</h1>
  <div v-if="!ready" transition="fade">
    <load-screen></load-screen>
  </div>
  <menu></menu>
  <taskbar></taskbar>
  <desktop></desktop>

</template>

<script>
  import './css/transitions.css';
  import loadScreen from './components/initialLoadScreen.vue';
  import taskBar from './components/taskbar.vue';
  import Menu from './components/menu.vue';
  import load from './js/load.js';
  import desktop from './components/desktop.vue';
  import {default as WindowManager} from './js/window_manager_2.js';
  export default {
    data() {
      return {
        ready: false
      }
    },
    components: {
      loadScreen,
      taskbar: taskBar,
      menu: Menu,
      desktop
    },
    created () {
      // loads data needed to start
      var self = this;
      try {
        load.load(function (err, data) {
          if(err) {
            console.log('error loading app data', err);
          }
          // wait .5 seconds
          setTimeout(function () {
            console.log('loaded');
            self.$data.ready = true;
          });
          WindowManager.updateAppData(data);
        });
      } catch (e) {
        console.log(e);
      }
    }
  };
</script>
