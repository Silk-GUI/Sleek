<template>
  <div id="desktop">
    <div v-for="window in windows" class="window" v-show="!window.minimized" :style="{zIndex: window.zIndex}">
      <iframe v-if="window.running" class="content" @load="buildChannel($index)" :src="window.url"
              data-name="{{window.title}}"></iframe>
      <div class="popup" v-if="window.popups" v-for="popup in window.popups">
        <component :popup="popup" :is="popup.component"></component>
      </div>
    </div>
    <div id="appNotifications"></div>
  </div>
</template>

<script>
  import WindowManager from '../js/window_manager';
  import Channel from '../js/channel';

  //popups
  import FileExplorer from './fileExplorer.vue';

  export default {
    data() {
      return {
        windows: WindowManager.windows
      }
    },
    methods: {
      buildChannel (index) {
        console.log('channel');
        new Channel(index);
      },
      minimize (index) {
        WindowManager.minimizeWindow(index);
      },
      close (index) {
        WindowManager.closeWindow(index);
      }
    },
    components: {
      'file-explorer': FileExplorer
    }
  };
</script>

<style>
  #desktop .window {
    position: absolute;
    top: 0px;
    left: 0px;
    width: 100%;
    height: 100%;
    box-sizing: border-box;
    padding-bottom: 50px;
  }

  .window * {
    -webkit-user-select: none;
  }

  iframe {
    background-color: white;
    border: none;
    width: 100%;
    height: 100%;
    margin: 0px;
    box-sizing: border-box;
  }

  .window .popup {
    position: fixed;
    top: 0px;
    left: 0px;
    height: 100%;
    width: 100%;
    background-color: rgba(256, 256, 256, 0.5);
  }

  .window .popup .content {
    position: absolute;
    top: 50px;
    left: 50%;
    width: 500px;
    height: 300px;
    margin-left: -250px;
    background-color: red;
  }
</style>
