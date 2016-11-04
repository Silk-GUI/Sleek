<template>
  <div id="taskBar">
    <div class="app menu" @click="menu">
      <img src="../img/menu.png">
    </div>
    <template v-for="window in windows">
      <taskbar-item :window="window" :index="$index"></taskbar-item>
    </template>
  <clock></clock>
    <!--</div>-->
  </div>
</template>

<script>
  import {default as WindowManager} from '../js/window_manager';
  import {default as Menu} from '../js/menu.js';
  import clock from './clock.vue';
  import taskBarItem from './taskbar-item.vue';
  export default {
    data() {
      return {
        windows: WindowManager.windows,
        activeWindows: WindowManager.activeWindows
      }
    },
    computed: {
      active (window) {
        console.log(this.activeWindows);
        if(this.activeWindows.indexOf(window.windowId) > -1) {
          return true;
        }
        return false;
      }
    },
    methods: {
      open (index) {
        WindowManager.maximizeWindow(index);
      },
      menu () {
        console.log(Menu);
        Menu.state.show = !Menu.state.show;
      },
      close (index) {
        WindowManager.closeWindow(index);
      }
    },
    components: {
      'taskbar-item': taskBarItem,
      'clock': clock
    }
  };
</script>

<style>
  #taskBar {
    background-color: rgba(53, 115, 121, 0.76);
    border-top: none;
    box-shadow: 0px 2px 8px 0px rgba(0,0,0,0.75);
  }
  #taskBar .app {
    min-width: 50px;
    width: auto;
    margin-left: 3px;
    background-color: rgba(256, 256, 256, 0.80);
    border-top: 3px solid transparent;
  }

  #taskBar .app:hover {
    background-color: rgba(256, 256, 256, 0.9);
  }

  #taskBar .menu {
    margin-left: 0px;
  }
  #taskBar .app.running {
    border-top: 3px solid transparent;
  }
  #taskBar .app.active {
    border-top: 3px solid #026873;
  }
  .app .title {
    display: inline-block;
    position: relative;
    top: -12px;
  }
  .app .close {
    color: white;
    position: relative;
    top: -12px;
    padding: 4px 7px;
    margin-right: 5px;
    opacity: 1;
    color: rgba(30, 30, 30, .5);
    -webkit-transition: .3s background-color;
  }

  .app .close:hover {
    color: #D62727;
  }

  /*.app-popup {*/
    /*width: 300px;*/
    /*display: none;*/
  /*}*/

  /*.app-popup .content {*/
    /*opacity: 0;*/
    /*position: relative;*/
    /*bottom: 80px;*/
    /*background-color: white;*/
    /*padding: 10px;*/
    /*display: inline-block;*/
  /*}*/

  /*.app-popup .close {*/
  /*}*/

  /*.app:hover .app-popup {*/
    /*display: block;*/
  /*}*/
  /*.app:hover .app-popup .content {*/
    /*opacity: 1;*/
  /*}*/
</style>
